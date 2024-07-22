import { getDatabase, ref } from "@firebase/database";
import { GeoFire } from "geofire";
import { useEffect, useState } from "react";

const BARRIERS_LOCATION_REF = "BarriersLocations";

export function useGetCloseBarriers(
  currentLocation: GeoLocation,
  radiusInKm: number
): [BarrierBasicInfo[], (updatedBasicInfo: BarrierBasicInfo[]) => void] {
  const [barriers, setBarriers] = useState<BarrierBasicInfo[]>([]);

  function addBarrier(barrierId: string, location: [number, number]) {
    const newBarrier = {
      id: barrierId,
      location: { latitude: location[0], longitude: location[1] },
    };

    const updatedBarriers = [...barriers, newBarrier];
    setBarriers(updatedBarriers);
  }

  function removeBarrier(barrierId: string, location: [number, number]) {
    const indexToRemove = barriers.indexOf({
      id: barrierId,
      location: { latitude: location[0], longitude: location[1] },
    });

    setBarriers((barriers) =>
      barriers.filter((barrier, index) => index !== indexToRemove)
    );
  }

  useEffect(() => {
    const firebaseRef = ref(getDatabase(), BARRIERS_LOCATION_REF);
    const geoFireInstance: GeoFire = new GeoFire(firebaseRef);

    const geoQuery = geoFireInstance.query({
      center: [currentLocation.latitude, currentLocation.longitude],
      radius: radiusInKm,
    });

    geoQuery.on(
      "key_entered",
      function (key: string, location: [number, number]) {
        console.log("Entered");

        addBarrier(key, location);
      }
    );

    geoQuery.on(
      "key_exited",
      function (key: string, location: [number, number]) {
        removeBarrier(key, location);
      }
    );

    geoQuery.on(
      "key_moved",
      function (key: string, location: [number, number]) {
        removeBarrier(key, location);
        addBarrier(key, location);
      }
    );

    geoQuery.on("ready", function (key: string, location: [number, number]) {
      console.log("wow");
      console.log(currentLocation, "this is the current location");
      console.log(radiusInKm, "this is the current radius");
    });
  }, [currentLocation, radiusInKm]);

  // geoFireInstance.set("barrier1", [32.3354366, 34.8616168]);
  return [barriers, setBarriers];
}
