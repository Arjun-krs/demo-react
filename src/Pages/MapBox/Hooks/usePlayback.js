import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";

const interpolate = (start, end, t) => [
  start[0] + (end[0] - start[0]) * t,
  start[1] + (end[1] - start[1]) * t,
];

const normalize = (point) => {
  if (!point) return null;
  if (Array.isArray(point)) return point;
  if (typeof point === "object" && "lng" in point && "lat" in point) {
    return [point.lng, point.lat];
  }
  return null;
};

const calculateBearing = (start, end) => {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const angle = Math.atan2(dx, dy) * (180 / Math.PI);
  return (angle + 360) % 360;
};

export const usePlayback = ({
  route = [],
  mapRef,
  markerRef,
  speed = 1000,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const frameRef = useRef(null);

  const haversineDistance = (coord1, coord2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371000; // Earth radius in meters

    const dLat = toRad(coord2[1] - coord1[1]);
    const dLon = toRad(coord2[0] - coord1[0]);

    const lat1 = toRad(coord1[1]);
    const lat2 = toRad(coord2[1]);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    return 2 * R * Math.asin(Math.sqrt(a)); // meters
  };

  // const animate = useCallback(() => {
  //   if (!isPlaying || !route || index >= route.length - 1) return;

  //   const start = normalize(route[index]);
  //   const end = normalize(route[index + 1]);
  //   if (!start || !end) return;

  //   const startTime = performance.now();

  //   const step = (now) => {
  //     const elapsed = now - startTime;
  //     const t = Math.min(elapsed / speed, 1);
  //     const pos = interpolate(start, end, t);

  //     if (pos.some(Number.isNaN)) return;

  //     const bearing = calculateBearing(start, end);

  //     if (markerRef.current) {
  //       markerRef.current.setLngLat(pos);

  //       if (markerRef.current.iconElement) {
  //         markerRef.current.iconElement.style.transform = `rotate(${bearing}deg)`;
  //       }
  //     } else if (mapRef.current) {
  //       markerRef.current = new mapboxgl.Marker()
  //         .setLngLat(pos)
  //         .addTo(mapRef.current);
  //     }

  //     if (mapRef.current && !mapRef.current.getBounds().contains(pos)) {
  //       mapRef.current.flyTo({
  //         center: pos,
  //         essential: true,
  //         zoom: mapRef.current.getZoom(),
  //         speed: 1.2,
  //       });
  //     }

  //     if (t < 1) {
  //       frameRef.current = requestAnimationFrame(step);
  //     } else {
  //       setIndex((i) => i + 1);
  //     }
  //   };

  //   frameRef.current = requestAnimationFrame(step);
  // }, [isPlaying, route, index, speed, mapRef, markerRef]);

  const animate = useCallback(() => {
    if (!isPlaying || !route || index >= route.length - 1) return;

    const start = normalize(route[index]);
    const end = normalize(route[index + 1]);
    if (!start || !end) return;

    const distance = haversineDistance(start, end); // in meters
    const duration = (distance / speed) * 10000; // ms (speed = meters per second)

    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const pos = interpolate(start, end, t);

      if (pos.some(Number.isNaN)) return;

      const bearing = calculateBearing(start, end);

      if (markerRef.current) {
        markerRef.current.setLngLat(pos);
        if (markerRef.current.iconElement) {
          markerRef.current.iconElement.style.transform = `rotate(${bearing}deg)`;
        }
      } else if (mapRef.current) {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat(pos)
          .addTo(mapRef.current);
      }

      if (mapRef.current && !mapRef.current.getBounds().contains(pos)) {
        mapRef.current.flyTo({
          center: pos,
          essential: true,
          zoom: mapRef.current.getZoom(),
          speed: 1.2,
        });
      }

      if (t < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setIndex((i) => i + 1);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [isPlaying, route, index, speed, mapRef, markerRef]);

  useEffect(() => {
    if (isPlaying) animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPlaying, index, animate]);

  // play action
  const play = () => setIsPlaying(true);

  // pause action
  const pause = () => {
    setIsPlaying(false);
    cancelAnimationFrame(frameRef.current);
  };

  // restart action
  const restart = () => {
    setIsPlaying(false);
    setIndex(0);
    const first = normalize(route[0]);
    if (first && markerRef.current) markerRef.current.setLngLat(first);
  };

  // forward action
  const forward = () => setIndex((i) => Math.min(i + 1, route.length - 1));

  // rewind action
  const rewind = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    const point = normalize(route[index]);
    if (!point) return;
    if (markerRef.current) {
      markerRef.current.setLngLat(point);
    } else if (mapRef.current) {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat(point)
        .addTo(mapRef.current);
    }
  }, [index, route, mapRef, markerRef]);

  return { play, pause, restart, forward, rewind, isPlaying, index };
};
