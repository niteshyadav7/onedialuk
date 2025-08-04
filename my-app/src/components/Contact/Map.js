import React, { useRef, useEffect } from "react";

const Map = ({
  center = { lat: 28.6139, lng: 77.209 }, // Default: New Delhi
  zoom = 5,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (window.google) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }
  }, [center, zoom]);

  return <div ref={ref} className="w-full h-[400px] rounded-lg shadow-md" />;
};

export default Map;
