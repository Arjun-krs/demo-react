import { useCallback } from "react";
import mapboxgl from "mapbox-gl";
import * as toGeoJSON from "@tmcw/togeojson";

export function useKmlLoader(mapRef) {
  const loadKml = useCallback(
    async (
      kmlPath,
      layerId = "kml-layer",
      { onFeatureClick, onFeatureHover } = {}
    ) => {
      const map = mapRef.current;
      if (!map) return;

      try {
        const response = await fetch(kmlPath);
        const kmlText = await response.text();
        const parser = new DOMParser();
        const kmlDom = parser.parseFromString(kmlText, "text/xml");
        const geojson = toGeoJSON.kml(kmlDom);

        geojson.features = geojson.features.filter(
          (f) =>
            f.geometry &&
            Array.isArray(f.geometry.coordinates) &&
            f.geometry.coordinates.length > 0
        );

        geojson.features.forEach((f) => {
          if (f.properties && "indoor" in f.properties) {
            delete f.properties.indoor;
          }
        });

        const sourceId = layerId + "-source";
        const fillLayerId = layerId + "-fill";
        const lineLayerId = layerId + "-line";

        if (map.getSource(sourceId)) {
          map.getSource(sourceId).setData(geojson);
        } else {
          map.addSource(sourceId, { type: "geojson", data: geojson });

          // Fill layer
          map.addLayer({
            id: fillLayerId,
            type: "fill",
            source: sourceId,
            filter: ["==", "$type", "Polygon"],
            paint: { "fill-color": "#B0DADB", "fill-opacity": 0.4 },
          });

          // Line layer
          map.addLayer({
            id: lineLayerId,
            type: "line",
            source: sourceId,
            filter: ["==", "$type", "Polygon"],
            paint: { "line-color": "#00888A", "line-width": 2 },
          });
        }

        // Attach click and hover events
        [fillLayerId, lineLayerId].forEach((id) => {
          map.on("click", id, (e) => {
            const feature = e.features?.[0];
            if (feature && onFeatureClick) {
              onFeatureClick(feature.properties, feature.geometry);
            }
          });

          map.on("mousemove", id, (e) => {
            const feature = e.features?.[0];
            if (feature && onFeatureHover) {
              const headName = feature.properties?.Estate;
              const subHeadName = feature.properties?.name;
              onFeatureHover(headName, subHeadName);
            }
            map.getCanvas().style.cursor = "pointer";
          });

          map.on("mouseleave", id, () => {
            if (onFeatureHover) onFeatureHover(null);
            map.getCanvas().style.cursor = "";
          });
        });

        // Fit map to bounds
        const bounds = new mapboxgl.LngLatBounds();
        geojson.features.forEach((feature) => {
          const coords = feature.geometry.coordinates.flat(Infinity);
          for (let i = 0; i < coords.length; i += 2) {
            bounds.extend([coords[i], coords[i + 1]]);
          }
        });
        if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 50 });
      } catch (err) {
        console.error("Failed to load KML:", err);
      }
    },
    [mapRef]
  );

  return { loadKml };
}
