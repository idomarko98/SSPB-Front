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
  const INITIAL_LAT_DELTA = 0.0015;
  const INITIAL_LONG_DELTA = 0.0015;
  const RADIUS_IN_KM = 3;
  const PIN_SIZE = 35;

  const [currentLatitude, setCurrentLatitude] = useState<number>(
    initialGeoLocation.latitude
  );
  const [currentLongtiude, setCurrentLongtiude] = useState<number>(
    initialGeoLocation.longitude
  );
  const [barriers, setBarriers] = useState<Barrier[]>([]);
  const [barriersBasicInfo, setBarriersBasicInfo] = useGetCloseBarriers(
    { latitude: currentLatitude, longitude: currentLongtiude },
    RADIUS_IN_KM
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
          latitudeDelta: INITIAL_LAT_DELTA,
          longitudeDelta: INITIAL_LONG_DELTA,
        }}
        onRegionChangeComplete={(region: Region, details: Details) => {
          setCurrentLatitude(region.latitude);
          setCurrentLongtiude(region.longitude);
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
                  style={{ height: PIN_SIZE, width: PIN_SIZE }}
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
