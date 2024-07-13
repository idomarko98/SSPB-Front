import { getDatabase, ref } from "@firebase/database";
import { GeoFire } from "geofire";
import { useState } from "react";

const BARRIERS_LOCATION_REF = "BarriersLocations";

export function useGetCloseBarriers(
  currentLocation: GeoLocation,
  radiusInKm: number
): [BarrierBasicInfo[], (updatedBasicInfo: BarrierBasicInfo[]) => void] {
  const [barriers, setBarriers] = useState<BarrierBasicInfo[]>([]);

  function addBarrier(barrierId: string, location: [number, number]) {
    barriers.push({
      id: barrierId,
      location: { latitude: location[0], longitude: location[1] },
    });
  }

  function removeBarrier(barrierId: string, location: [number, number]) {
    const index = barriers.indexOf({
      id: barrierId,
      location: { latitude: location[0], longitude: location[1] },
    });
    if (index > -1) {
      barriers.splice(index, 1);
    }
  }

  const firebaseRef = ref(getDatabase(), BARRIERS_LOCATION_REF);
  const geoFireInstance: GeoFire = new GeoFire(firebaseRef);

  const geoQuery = geoFireInstance.query({
    center: [currentLocation.latitude, currentLocation.longitude],
    radius: radiusInKm,
  });

  geoQuery.on(
    "key_entered",
    function (key: string, location: [number, number]) {
      addBarrier(key, location);
    }
  );

  geoQuery.on("key_exited", function (key: string, location: [number, number]) {
    removeBarrier(key, location);
  });

  geoQuery.on("key_moved", function (key: string, location: [number, number]) {
    removeBarrier(key, location);
    addBarrier(key, location);
  });

  geoQuery.on("ready", function (key: string, location: [number, number]) {
    // console.log("wow");
  });

  return [barriers, setBarriers];
}
