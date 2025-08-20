import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { fitToCurrentLocation } from "../Functions";

export const useMapWithCurrentLocation = ({
  fleetRoutes,
  selectedVehicle,
  mapContainerRef,
  mapRef,
  markerRef,
}) => {
  
  useEffect(() => {
    if (fleetRoutes?.length > 0 && !selectedVehicle && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [0, 0],
        zoom: 2,
      });

      mapRef.current.on("load", () => {
        fitToCurrentLocation(mapRef.current, markerRef);
      });
    }

    return () => {
      if (fleetRoutes?.length > 0 && !selectedVehicle && mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [fleetRoutes, selectedVehicle]);
};
