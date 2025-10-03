import { useState, useEffect } from 'react';
import { IArtist } from '@/types';
import dynamic from 'next/dynamic';
import ProfileMarker from './ProfileMarker';

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);

const Mapview = ({ artists }: { artists: IArtist[] }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default center (first artist's location or fallback)
  const defaultCenter: [number, number] =
    artists?.length > 0
      ? [
          artists[0]?.currentLocation?.coordinates[1],
          artists[0]?.currentLocation?.coordinates[0],
        ]
      : [40.7128, -74.006]; // Default to New York

  console.log({ artists });

  if (!mounted) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: '100%', width: '100%', minHeight: '500px' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {artists?.map(artist => (
          <ProfileMarker key={artist._id} artist={artist} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapview;
