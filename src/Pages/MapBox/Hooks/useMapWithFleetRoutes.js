import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { createVehicleMarker, formatTime } from "../Functions";

export const useMapWithFleetRoutes = ({
  selectedVehicle,
  fleetRoutes,
  mapContainerRef,
  mapRef,
  markerRef,
  animationRef,
}) => {
  useEffect(() => {
    if (!selectedVehicle || !fleetRoutes?.length) return;

    if (animationRef.current) clearTimeout(animationRef.current);
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    const startPoint = [fleetRoutes[0].lng, fleetRoutes[0].lat];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: startPoint,
      zoom: 17,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: fleetRoutes.map((p) => [p.lng, p.lat]),
          },
        },
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#000000",
          "line-width": 4,
        },
      });

      const marker = createVehicleMarker(
        selectedVehicle?.VehicleCategory?.Category,
        startPoint
      );
      marker.addTo(map);
      markerRef.current = marker;

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mousemove", "route-line", (e) => {
        if (!e.lngLat) return;
        const coordinates = e.lngLat;
        const vehicleInfo = `
          <div style="font-size:12px; color:#333; line-height:1.4;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="color:#696969; font-size:12px;">Vehicle No:</span>
              <span style="color:#00888A; font-size:14px;">
              ${selectedVehicle?.VehicleNumber || "-"}
              </span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="color:#696969; font-size:12px;">Category:</span>
              <span style="color:#00888A; font-size:14px;">
              ${selectedVehicle?.VehicleCategory?.Category || "N/A"}
              </span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="color:#696969; font-size:12px;">Time:</span>
              <span style="color:#00888A; font-size:14px;">
              ${formatTime(selectedVehicle?.ModifiedOn) || "N/A"}
              </span>
            </div>
            <label style="color:#696969; font-size:12px; display:block;">Coordinates:</label>
            <p style="color:#00888A; font-size:14px; margin:0;">
              Lat: ${coordinates.lat.toFixed(5)}
              Lng: ${coordinates.lng.toFixed(5)}
            </p>
            </div>
          `;

        popup.setLngLat(coordinates).setHTML(vehicleInfo).addTo(map);
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "route-line", () => {
        popup.remove();
        map.getCanvas().style.cursor = "";
      });
    });

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
      if (markerRef.current) markerRef.current.remove();
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          console.warn("Error removing map:", e);
        }
        mapRef.current = null;
      }
    };
  }, [selectedVehicle, fleetRoutes]);
};
