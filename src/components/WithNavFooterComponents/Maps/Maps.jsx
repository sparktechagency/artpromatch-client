"use client";
import { useRef } from "react";
import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
const Maps = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      // init marker:
      const { Marker } = await loader.importLibrary("marker");

      const position = {
        lat: 43.642696,
        lng: -79.3871189,
      };

      // map options:
      const mapOptions = {
        center: position,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };
      // setup the map
      const map = new Map(mapRef.current, mapOptions);
      // put up a marker:

      const marker = new Marker({
        map: map,
        position: position,
      });
    };
    initMap();
  }, []);

  return (
    <div style={{ height: "600px" }} ref={mapRef}>
      <h1>Google maps</h1>
    </div>
  );
};

export default Maps;
