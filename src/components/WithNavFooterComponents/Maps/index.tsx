'use client';

import { useRef } from 'react';
import { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { LocationType } from '@/app/(withoutNavFooter)/preferred-location/page';

const Maps = ({ location }: { location: LocationType }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!location) return;

    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');
      // init marker:
      const { Marker } = await loader.importLibrary('marker');

      const position = {
        lat: location.latitude,
        lng: location.longitude,
      };

      // map options:
      const mapOptions = {
        center: position,
        zoom: 15,
        mapId: 'MY_NEXTJS_MAPID',
      };

      // setup the map
      const map = new Map(mapRef.current, mapOptions);
      // put up a marker:

      new Marker({
        map: map,
        position: position,
      });
    };
    initMap();
  }, [location]);

  return <div style={{ height: '10px' }} ref={mapRef}></div>;
};

export default Maps;
