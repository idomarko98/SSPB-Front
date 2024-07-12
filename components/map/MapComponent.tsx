import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Image } from "react-native";
import { useGetCloseBarriers } from "./UseGetCloseBarriers";
import { getBarriers } from "./GetBarriers";
import { AxiosError } from "axios";

export default function MapComponent() {
  console.log("bla2");

  const la = 0;
  const lg = 0;
  const initialLatDelate = 0.0015;
  const initialLongDelate = 0.0015;
  const radiusInMeters = 1000;

  const [barriers, setBarriers] = useState<Barrier[]>([]);
  const [barriersBasicInfo, setBarriersBasicInfo] = useGetCloseBarriers(
    { latitude: la, longitude: lg },
    radiusInMeters
  );

  useEffect(() => {
    console.log("blas");

    if (barriersBasicInfo.length > 0) {
      const barrierIds = barriersBasicInfo.map(
        (barrierBasicInfo: BarrierBasicInfo) => barrierBasicInfo.id
      );

      console.log(barrierIds, "ids");

      getBarriers(barrierIds)
        .then((response) => {
          setBarriers(response.data);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    }
  }, [barriersBasicInfo]);

  // console.log(barriersBasicInfo, "Basic info");
  // barriersBasicInfo && console.log(barriersBasicInfo.length, "length");
  // barriersBasicInfo &&
  //   barriersBasicInfo.length > 0 &&
  //   console.log(barriersBasicInfo[0].location.latitude, "lat");
  // barriersBasicInfo &&
  //   barriersBasicInfo.length > 0 &&
  //   console.log(barriersBasicInfo[0].location.longitude, "long");

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: la,
          longitude: lg,
          latitudeDelta: initialLatDelate,
          longitudeDelta: initialLongDelate,
        }}
      >
        {barriersBasicInfo &&
          barriersBasicInfo.length != 0 &&
          barriers.map((barrier: Barrier) => {
            const parkingPin = require("../../assets/images/parking_pin.png");
            const unavailableParkingPin = require("../../assets/images/unavailable_parking_pin.png");
            console.log(barrier.id, "this is a unique id");

            return (
              <Marker
                // icon={require("../../assets/images/parking_pin.png")}
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
