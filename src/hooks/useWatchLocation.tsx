import { useEffect, useState, useCallback } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export function useWatchLocation() {
  const [location, setLocation] = useState<Location>(() => {
    const storedCoords = localStorage.getItem("coords");
    return storedCoords
      ? JSON.parse(storedCoords)
      : { latitude: 0, longitude: 0 };
  });

  const configGeolocation = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const [error, setError] = useState<string>("");

  const handlePositionUpdate = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude, speed } = position.coords;
      const valueSpeed = !speed ? 0 : speed;
      const newLocation = { latitude, longitude, valueSpeed };
      if (
        newLocation.latitude !== location.latitude ||
        newLocation.longitude !== location.longitude
      ) {
        setLocation(newLocation);
        localStorage.setItem("coords", JSON.stringify(newLocation));
      }
    },
    [location]
  );

  const handleError = useCallback((error: GeolocationPositionError) => {
    if (location.latitude === 0 && location.longitude === 0) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Ups😢... Su navegador no soporta ubicación en tiempo real");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      handlePositionUpdate,
      handleError,
      configGeolocation
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [handlePositionUpdate, handleError]);

  return { location, error };
}
