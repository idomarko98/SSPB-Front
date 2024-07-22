import React, { useEffect, useState } from "react";
import MapView, { Details, Marker, Region } from "react-native-maps";
import { StyleSheet, View, Image } from "react-native";
import { useGetCloseBarriers } from "./UseGetCloseBarriers";
import { getBarriers } from "./GetBarriers";
import { AxiosError } from "axios";

interface MapProps {
  initialGeoLocation: GeoLocation;
}

export default function MapComponent({ initialGeoLocation }: MapProps) {
  const initialLatDelate = 0.0015;
  const initialLongDelate = 0.0015;
  const radiusInMeters = 1000;

  const [currentLatitude, setCurrentLatitude] = useState<number>(
    initialGeoLocation.latitude
  );
  const [currentLongtiude, setCurrentLongtiude] = useState<number>(
    initialGeoLocation.longitude
  );
  const [barriers, setBarriers] = useState<Barrier[]>([]);
  const [barriersBasicInfo, setBarriersBasicInfo] = useGetCloseBarriers(
    { latitude: currentLatitude, longitude: currentLongtiude },
    radiusInMeters
  );

  useEffect(() => {
    if (barriersBasicInfo.length > 0) {
      const barrierIds = barriersBasicInfo.map(
        (barrierBasicInfo: BarrierBasicInfo) => barrierBasicInfo.id
      );

      getBarriers(barrierIds)
        .then((response) => {
          setBarriers(response.data);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    }
  }, [barriersBasicInfo]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialGeoLocation.latitude,
          longitude: initialGeoLocation.longitude,
          latitudeDelta: initialLatDelate,
          longitudeDelta: initialLongDelate,
        }}
        onRegionChangeComplete={(region: Region, details: Details) => {
          setCurrentLatitude(region.latitude);
          setCurrentLongtiude(region.longitude);
          console.log("changed");
        }}
      >
        {barriersBasicInfo &&
          barriersBasicInfo.length != 0 &&
          barriers.map((barrier: Barrier) => {
            const parkingPin = require("../../assets/images/parking_pin.png");
            const unavailableParkingPin = require("../../assets/images/unavailable_parking_pin.png");

            return (
              <Marker
                key={barrier.id}
                coordinate={{
                  latitude: barrier.location.latitude,
                  longitude: barrier.location.longitude,
                }}
              >
                <Image
                  source={
                    barrier.isAvailableToPark
                      ? parkingPin
                      : unavailableParkingPin
                  }
                  style={{ height: 35, width: 35 }}
                />
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
