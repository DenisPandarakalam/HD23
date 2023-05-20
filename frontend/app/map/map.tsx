"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";

const containerStyle = {
  width: "700px",
  height: "700px",
};

const center = {
  lat: 38.551977,
  lng: -121.740609,
};

function Map() {
  // client side only
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAlCbYm7I4nUSockriyqenio0GCVjBAGxQ",
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5} onLoad={onLoad} onUnmount={onUnmount}>
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(Map);
