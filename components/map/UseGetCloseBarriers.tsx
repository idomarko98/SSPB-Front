import { getDatabase, ref } from "@firebase/database";
import { GeoFire } from "geofire";
import { useState } from "react";

const BARRIERS_LOCATION_REF = "BarriersLocations";

export function useGetCloseBarriers(
  currentLocation: GeoLocation,
  radiusInKm: number
): [BarrierBasicInfo[], (updatedBasicInfo: BarrierBasicInfo[]) => void] {
  const [barriers, setBarriers] = useState<BarrierBasicInfo[]>([]);

  const firebaseRef = ref(getDatabase(), BARRIERS_LOCATION_REF);
  const geoFireInstance: GeoFire = new GeoFire(firebaseRef);

  const geoQuery = geoFireInstance.query({
    center: [currentLocation.latitude, currentLocation.longitude],
    radius: radiusInKm,
  });

  geoQuery.on(
    "key_entered",
    function (key: string, location: [number, number]) {
      barriers.push({
        id: key,
        location: { latitude: location[0], longitude: location[1] },
      });
    }
  );

  var onKeyExitedRegistration = geoQuery.on(
    "key_exited",
    function (key: any, location: any) {}
  );

  geoQuery.on("ready", function (key: any, location: any) {
    // console.log("wow");
  });

  return [barriers, setBarriers];
}
