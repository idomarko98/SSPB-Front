import React, { useEffect, useState } from "react";
import MapComponent from "@/components/map/MapComponent";
import GetLocation from "react-native-get-location";

export function HomeScreenPage() {
  const [currentLocation, setCurrentLocation] = useState<GeoLocation>();

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then((location) => {
        setCurrentLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  if (currentLocation) {
    return <MapComponent initialGeoLocation={currentLocation} />;
  } else {
    return <></>;
  }
}
