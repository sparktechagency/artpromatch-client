import { useState, useEffect } from 'react';
import { IArtist } from '@/types';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
  ssr: false,
});

// // Alternative ProfileMarker component
// const ProfileMarker = ({ artist, index }: { artist: IArtist; index: number }) => {
//   const [icon, setIcon] = useState<any>(null);

//   useEffect(() => {
//     const createProfileIcon = async () => {
//       const L = await import('leaflet');

//       // Create a custom icon with the profile image in a badge
//       const profileIcon = L.divIcon({
//         className: 'custom-profile-badge-marker',
//         html: `
//           <div class="relative">
//             <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M25 60C25 60 50 40.2132 50 25C50 9.7868 38.8071 0 25 0C11.1929 0 0 9.7868 0 25C0 40.2132 25 60 25 60Z" fill="#3B82F6"/>
//               <circle cx="25" cy="20" r="10" fill="white"/>
//               <circle cx="25" cy="20" r="8" fill="url(#profileImage)"/>
//             </svg>
//             <defs>
//               <pattern id="profileImage" patternContentUnits="objectBoundingBox" width="1" height="1">
//                 <image href="${artist.auth.image}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
//               </pattern>
//             </defs>
//           </div>
//         `,
//         iconSize: [50, 60],
//         iconAnchor: [25, 60],
//         popupAnchor: [0, -60],
//       });

//       setIcon(profileIcon);
//     };

//     createProfileIcon();
//   }, [artist.auth.image]);

//   if (!icon) return null;

//   const coordinates = artist.currentLocation.coordinates;
//   const position: [number, number] = [coordinates[1], coordinates[0]];

//   return (
//     <Marker position={position} icon={icon}>
//       <Popup>
//         {/* Popup content remains the same */}
//       </Popup>
//     </Marker>
//   );
// };

// Custom marker with profile image
const ProfileMarker = ({
  artist,
  index,
}: {
  artist: IArtist;
  index: number;
}) => {
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    const createProfileIcon = async () => {
      const L = await import('leaflet');

      // Create a custom icon with the profile image
      const profileIcon = L.divIcon({
        className: 'custom-profile-marker',
        html: `
          <div class="relative">
            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img src="${getCleanImageUrl(artist?.auth?.image)}" alt="${
          artist?.auth?.fullName
        }" class="w-full h-full object-cover" />
            </div>
            <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      setIcon(profileIcon);
    };

    createProfileIcon();
  }, [artist?.auth?.fullName, artist?.auth?.image]);

  if (!icon) return null;

  const coordinates = artist?.currentLocation?.coordinates;
  const position: [number, number] = [coordinates[1], coordinates[0]];

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <div className="p-2 max-w-xs">
          <div className="flex items-center mb-2">
            {artist?.auth?.image && (
              <Image
                src={getCleanImageUrl(artist?.auth?.image)}
                alt={artist?.auth?.fullName}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 mr-3"
              />
            )}
            <div>
              <div className="font-bold text-lg">{artist?.auth?.fullName}</div>
              <div className="text-sm text-gray-600">
                {artist?.auth?.phoneNumber}
              </div>
            </div>
          </div>

          <div className="my-2">
            <div className="font-semibold">Expertise:</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {artist?.expertise?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="font-semibold">Hourly Rate:</div>
              <div>${artist?.hourlyRate}</div>
            </div>
            <div>
              <div className="font-semibold">Rating:</div>
              <div>
                {artist?.avgRating > 0
                  ? artist?.avgRating.toFixed(1)
                  : 'No ratings'}
              </div>
            </div>
            <div>
              <div className="font-semibold">Completed:</div>
              <div>{artist?.totalCompletedService} services</div>
            </div>
            <div>
              <div className="font-semibold">Distance:</div>
              <div>{(artist?.distance! / 1000).toFixed(2)} km</div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

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
        {artists?.map((artist, index) => (
          <ProfileMarker key={artist._id} artist={artist} index={index} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapview;
