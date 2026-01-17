'use client';

import { Carousel, Input, Modal, Select } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { SiGoogletasks } from 'react-icons/si';
import ServiceDetailsModal from './ServiceDetailsModal';
import Mapview from './Mapview';
import BookingRequestModal from './BookingRequestModal';
import { IArtist, IService } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { toast } from 'sonner';
import { updateClientRadius } from '@/services/Service';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatCount } from '@/lib/formatCount';

type ViewMode = 'list' | 'map';
const ALL = 'All';
const ARTIST_TYPES = ['Tattoo Artist', 'Piercer', 'Both'];

const Artists = ({
  data,
}: {
  data: {
    sortedArtists: IArtist[];
    favoriteList: string[];
    availableExpertise: string[];
  };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const artists = data?.sortedArtists ?? [];
  const favoriteList = data?.favoriteList ?? [];
  const availableExpertise = data?.availableExpertise
    ? [ALL, ...data?.availableExpertise]
    : [];

  // UI state
  const [artistType, setArtistType] = useState<string[]>([]);
  const [tattooCategoriesSelected, setTattooCategoriesSelected] = useState<
    string[]
  >([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [view, setView] = useState<ViewMode>('list');
  const [selectedArtist, setSelectedArtist] = useState<IArtist | null>(null);
  const [isShowServiceModalOpen, setIsShowServiceModalOpen] =
    useState<boolean>(false);
  const [isRadiusModalOpen, setIsRadiusModalOpen] = useState<boolean>(false);
  const [radius, setRadius] = useState<string>('');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingArtist, setBookingArtist] = useState<IArtist | null>(null);

  const openBookingModal = (artist: IArtist) => {
    setBookingArtist(artist);
    setIsBookingModalOpen(true);
  };

  useEffect(() => {
    const urlArtistType = searchParams.get('artistType');
    const urlTattooCategory = searchParams.get('tattooCategory');

    // artist type:
    // - if missing => keep your default logic (or preferredArtistType if you have it)
    // - if 'All' => set ALL
    // - else => set value
    if (!urlArtistType || urlArtistType === ALL) {
      setArtistType([]);
    } else {
      setArtistType(
        urlArtistType
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
      );
    }

    // tattoo category:
    // - if missing => default favorites
    // - if 'All' => no filter
    // - else => parse list
    if (urlTattooCategory == null) {
      setTattooCategoriesSelected(favoriteList ?? []);
    } else if (urlTattooCategory === 'All') {
      setTattooCategoriesSelected([]);
    } else {
      setTattooCategoriesSelected(
        urlTattooCategory
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dedup artists for Map view
  const uniqueArtists = useMemo(() => {
    const map = new Map<string, NonNullable<IService['artist']>>();
    artists?.forEach(artist => artist?._id && map.set(artist._id, artist));
    return Array.from(map.values());
  }, [artists]);

  // Apply both filters consistently
  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const byType =
        artistType.length === 0
          ? true
          : artistType.includes(artist?.type || '');

      const byCategory =
        tattooCategoriesSelected.length === 0
          ? true
          : (artist?.expertise || []).some(exp =>
              tattooCategoriesSelected.includes(exp),
            );

      return byType && byCategory;
    });
  }, [artists, artistType, tattooCategoriesSelected]);

  const openShowServiceModal = (id: string) => {
    setSelectedArtist(artists?.find(artist => artist._id === id) || null);
    setIsShowServiceModalOpen(true);
  };

  const handleRadiusUpdate = async () => {
    const km = Number(radius);
    if (!km || km <= 0) {
      toast.warning('Please enter a valid radius');
      return;
    }
    try {
      const res = await updateClientRadius(km);
      res?.success ? toast.success(res.message) : toast.error(res?.message);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsRadiusModalOpen(false);
    }
  };

  // helper function
  const updateQuery = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    // ✅ Explicit "All" kept in URL so it doesn't fallback to favorites next time
    if (values.length === 0) {
      if (key === 'tattooCategory') {
        params.set(key, 'All');
      } else {
        params.delete(key);
      }
    } else {
      params.set(key, values.join(','));
    }

    const next = `?${params.toString()}`;
    const current = `?${searchParams.toString()}`;

    if (next === current) return;

    // ✅ defer navigation out of render phase
    queueMicrotask(() => {
      router.push(next, { scroll: false });
    });
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-slate-50 py-10">
      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col md:flex-row gap-4 justify-between items-center">
          {mounted ? (
            <Select
              mode="multiple"
              allowClear
              value={artistType}
              placeholder="Artist type"
              style={{ minWidth: 180 }}
              popupMatchSelectWidth={false}
              listHeight={200}
              onChange={(values: string[]) => {
                setArtistType(values);
                updateQuery('artistType', values);
              }}
              options={ARTIST_TYPES.map(t => ({
                label: t,
                value: t,
              }))}
              className="w-fit"
            />
          ) : (
            <div
              className="w-fit rounded-md bg-slate-100"
              style={{ minWidth: 180, height: 32 }}
            />
          )}

          <div className="flex flex-wrap gap-2">
            {availableExpertise?.map(cat => (
              <div
                key={cat}
                onClick={() => {
                  if (cat === ALL) {
                    setTattooCategoriesSelected([]);
                    updateQuery('tattooCategory', []);
                    return;
                  }

                  setTattooCategoriesSelected(prev => {
                    const updated = prev.includes(cat)
                      ? prev.filter(c => c !== cat)
                      : [...prev, cat];

                    updateQuery('tattooCategory', updated);
                    return updated;
                  });
                }}
                className={`px-4 py-2 rounded-full text-sm transition cursor-pointer ${
                  tattooCategoriesSelected.includes(cat)
                    ? 'bg-primary text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* View toggle */}
        <div className="flex justify-between items-center my-8">
          <p className="text-sm text-slate-600">
            {tattooCategoriesSelected.length > 0
              ? tattooCategoriesSelected.join(', ')
              : 'All'}{' '}
            ({filteredArtists?.length})
          </p>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['list', 'map'] as ViewMode[]).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-5 py-2 rounded-lg text-sm transition cursor-pointer
                  ${
                    view === v
                      ? 'bg-white shadow text-primary'
                      : 'text-slate-500'
                  }`}
              >
                {v === 'list' ? 'List' : 'Map'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {view === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArtists?.map(artist => {
              const km = `${((artist?.distance ?? 0) / 1000).toFixed(2)} km`;
              const rating =
                artist?.avgRating && artist.avgRating > 0
                  ? artist.avgRating.toFixed(1)
                  : null;

              return (
                <div
                  key={artist._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border overflow-hidden flex flex-col"
                >
                  <div
                    onClick={() => openShowServiceModal(artist._id)}
                    className="cursor-pointer"
                  >
                    <Carousel autoplay>
                      {(artist?.flashImages?.length
                        ? artist.flashImages
                        : [undefined]
                      ).map((img, i) => (
                        <div key={`${artist._id}-flash-${i}`}>
                          <Image
                            src={getCleanImageUrl(img)}
                            alt="Service thumbnail"
                            height={300}
                            width={500}
                            className="w-full h-60 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>

                  {/* <div
                    onClick={() => openShowServiceModal(artist._id)}
                    className="w-full h-56 bg-slate-100 flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src={getCleanImageUrl(artist?.thumbnail)}
                      alt="service"
                      width={1000}
                      height={1000}
                      quality={90}
                      className="w-full h-full object-contain"
                    />
                  </div> */}

                  <div className="p-4 flex flex-col h-full">
                    <Link
                      href={`/artist/${artist?._id}`}
                      className="flex items-center gap-2 mt-2"
                    >
                      <Image
                        src={getCleanImageUrl(artist?.auth?.image)}
                        alt={artist?.auth?.fullName || 'artist'}
                        width={40}
                        height={40}
                        className="rounded-full h-10 w-10 object-cover"
                      />
                      <div className="flex flex-col items-start justify-center gap-1">
                        <span className="text-sm font-medium text-primary">
                          {artist?.auth?.fullName}
                        </span>
                        <span className="truncate text-xs text-slate-500">
                          {artist?.stringLocation}
                        </span>
                      </div>
                    </Link>

                    <div className="flex justify-between items-center mt-4 text-sm text-slate-600">
                      <span>{km}</span>
                      {rating && (
                        <span className="flex items-center gap-1 text-amber-600">
                          <FaStar className="text-xs" />
                          {rating}
                        </span>
                      )}
                      <span className="font-semibold text-primary">
                        ${artist?.hourlyRate}/hr
                      </span>
                    </div>

                    {artist?.expertise?.length > 0 && (
                      <div className="flex flex-wrap gap-2 my-4">
                        {artist.expertise.slice(0, 3).map((exp, i) => (
                          <span
                            key={`${exp}-${i}`}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {exp}
                          </span>
                        ))}

                        {artist.expertise.length > 3 && (
                          <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-500">
                            +{artist.expertise.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div
                      onClick={() => openBookingModal(artist)}
                      className="mt-auto py-2 rounded-xl bg-primary text-white text-center font-semibold hover:bg-primary/90 transition cursor-pointer"
                    >
                      Book Now
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-3">
                      <SiGoogletasks />
                      {formatCount(artist?.totalCompletedService)} completed
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Mapview artists={uniqueArtists} />
        )}

        {/* Radius button */}
        <div className="flex justify-center mt-12">
          <div
            onClick={() => setIsRadiusModalOpen(true)}
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 cursor-pointer"
          >
            Update Radius
          </div>
        </div>

        {/* Modals */}
        <Modal
          open={isShowServiceModalOpen}
          footer={null}
          onCancel={() => setIsShowServiceModalOpen(false)}
          centered
          width={800}
          destroyOnHidden
        >
          {selectedArtist && (
            <ServiceDetailsModal
              selectedArtist={selectedArtist}
              onBookNow={artist => {
                setIsShowServiceModalOpen(false);
                openBookingModal(artist);
              }}
              // onClose={() => setIsShowServiceModalOpen(false)}
            />
          )}
        </Modal>

        <Modal
          open={isRadiusModalOpen}
          footer={null}
          onCancel={() => setIsRadiusModalOpen(false)}
          centered
          width={500}
          destroyOnHidden
        >
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Update Radius (km)</h2>

            <form
              onSubmit={e => {
                e.preventDefault();
                handleRadiusUpdate();
              }}
            >
              <Input
                type="number"
                min={1}
                value={radius}
                onChange={e => setRadius(e.target.value)}
              />

              <button
                type="submit"
                className="w-full mt-4! py-2 rounded-lg bg-primary text-white! cursor-pointer"
              >
                Save
              </button>
            </form>
          </div>
        </Modal>

        <BookingRequestModal
          open={isBookingModalOpen}
          artist={bookingArtist}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Artists;

// 'use client';

// import { Input, Modal, Select } from 'antd';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useMemo, useState } from 'react';
// import { FaStar } from 'react-icons/fa6';
// import { SiGoogletasks } from 'react-icons/si';
// import ServiceDetailsModal from './ServiceDetailsModal';
// import Mapview from './Mapview';
// import { IService } from '@/types';
// import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
// import { toast } from 'sonner';
// import { updateClientRadius } from '@/services/Service';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { formatCount } from '@/lib/formatCount';

// type ViewMode = 'list' | 'map';
// const ALL = 'All';
// const ARTIST_TYPES = ['Tattoo Artist', 'Piercer', 'Both'];

// const Services = ({
//   data,
// }: {
//   data: {
//     sortedServices?: IService[];
//     favoriteTattoos?: string[];
//     availableExpertise?: string[];
//   };
// }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const services = data?.sortedServices ?? [];
//   const favoriteTattoos = data?.favoriteTattoos ?? [];
//   const availableExpertise = data?.availableExpertise
//     ? [ALL, ...data?.availableExpertise]
//     : [];

//   // UI state
//   const [artistType, setArtistType] = useState<string[]>([]);
//   const [tattooCategoriesSelected, setTattooCategoriesSelected] = useState<
//     string[]
//   >([]);

//   const [view, setView] = useState<ViewMode>('list');
//   const [selectedService, setSelectedService] = useState<IService | null>(null);
//   const [isShowServiceModalOpen, setIsShowServiceModalOpen] =
//     useState<boolean>(false);
//   const [isRadiusModalOpen, setIsRadiusModalOpen] = useState<boolean>(false);
//   const [radius, setRadius] = useState<string>('');

//   useEffect(() => {
//     const urlArtistType = searchParams.get('artistType');
//     const urlTattooCategory = searchParams.get('tattooCategory');

//     // artist type:
//     // - if missing => keep your default logic (or preferredArtistType if you have it)
//     // - if 'All' => set ALL
//     // - else => set value
//     if (!urlArtistType || urlArtistType === ALL) {
//       setArtistType([]);
//     } else {
//       setArtistType(
//         urlArtistType
//           .split(',')
//           .map(s => s.trim())
//           .filter(Boolean)
//       );
//     }

//     // tattoo category:
//     // - if missing => default favorites
//     // - if 'All' => no filter
//     // - else => parse list
//     if (urlTattooCategory == null) {
//       setTattooCategoriesSelected(favoriteTattoos ?? []);
//     } else if (urlTattooCategory === 'All') {
//       setTattooCategoriesSelected([]);
//     } else {
//       setTattooCategoriesSelected(
//         urlTattooCategory
//           .split(',')
//           .map(s => s.trim())
//           .filter(Boolean)
//       );
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Dedup artists for Map view
//   const uniqueArtists = useMemo(() => {
//     const map = new Map<string, NonNullable<IService['artist']>>();
//     services?.forEach(s => s?.artist?._id && map.set(s.artist._id, s.artist));
//     return Array.from(map.values());
//   }, [services]);

//   // Apply both filters consistently
//   const filteredServices = useMemo(() => {
//     return services.filter(s => {
//       const byType =
//         artistType.length === 0
//           ? true
//           : artistType.includes(s?.artist?.type || '');

//       const byCategory =
//         tattooCategoriesSelected.length === 0
//           ? true
//           : (s?.artist?.expertise || []).some(exp =>
//               tattooCategoriesSelected.includes(exp)
//             );

//       return byType && byCategory;
//     });
//   }, [services, artistType, tattooCategoriesSelected]);

//   const openShowServiceModal = (id: string) => {
//     setSelectedService(services?.find(s => s._id === id) || null);
//     setIsShowServiceModalOpen(true);
//   };

//   const handleRadiusUpdate = async () => {
//     const km = Number(radius);
//     if (!km || km <= 0) {
//       toast.warning('Please enter a valid radius');
//       return;
//     }
//     try {
//       const res = await updateClientRadius(km);
//       res?.success ? toast.success(res.message) : toast.error(res?.message);
//     } catch {
//       toast.error('Something went wrong');
//     } finally {
//       setIsRadiusModalOpen(false);
//     }
//   };

//   // helper function
//   const updateQuery = (key: string, values: string[]) => {
//     const params = new URLSearchParams(searchParams.toString());

//     // ✅ Explicit "All" kept in URL so it doesn't fallback to favorites next time
//     if (values.length === 0) {
//       params.set(key, 'All');
//     } else {
//       params.set(key, values.join(','));
//     }

//     const next = `?${params.toString()}`;
//     const current = `?${searchParams.toString()}`;

//     if (next === current) return;

//     // ✅ defer navigation out of render phase
//     queueMicrotask(() => {
//       router.push(next, { scroll: false });
//     });
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="bg-slate-50 py-10">
//       <div className="container mx-auto px-4">
//         {/* Filters */}
//         <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col md:flex-row gap-4 justify-between items-center">
//           <Select
//             mode="multiple"
//             allowClear
//             value={artistType.length ? artistType : [ALL]}
//             placeholder="Artist type"
//             style={{ minWidth: 180 }}
//             popupMatchSelectWidth={false}
//             listHeight={200}
//             onChange={(values: string[]) => {
//               if (values.includes(ALL)) {
//                 const withoutAll = values.filter(v => v !== ALL);
//                 if (withoutAll.length === 0) {
//                   setArtistType([]);
//                   updateQuery('artistType', []);
//                 } else {
//                   setArtistType(withoutAll);
//                   updateQuery('artistType', withoutAll);
//                 }
//                 return;
//               }

//               setArtistType(values);
//               updateQuery('artistType', values);
//             }}
//             options={[
//               { label: ALL, value: ALL },
//               ...ARTIST_TYPES.map(t => ({
//                 label: t,
//                 value: t,
//               })),
//             ]}
//             className="w-fit"
//           />

//           <div className="flex flex-wrap gap-2">
//             {availableExpertise?.map(cat => (
//               <div
//                 key={cat}
//                 onClick={() => {
//                   if (cat === ALL) {
//                     setTattooCategoriesSelected([]);
//                     updateQuery('tattooCategory', []);
//                     return;
//                   }

//                   setTattooCategoriesSelected(prev => {
//                     const updated = prev.includes(cat)
//                       ? prev.filter(c => c !== cat)
//                       : [...prev, cat];

//                     updateQuery('tattooCategory', updated);
//                     return updated;
//                   });
//                 }}
//                 className={`px-4 py-2 rounded-full text-sm transition cursor-pointer ${
//                   tattooCategoriesSelected.includes(cat)
//                     ? 'bg-primary text-white shadow'
//                     : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                 }`}
//               >
//                 {cat}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* View toggle */}
//         <div className="flex justify-between items-center my-8">
//           <p className="text-sm text-slate-600">
//             {tattooCategoriesSelected.length > 0
//               ? tattooCategoriesSelected.join(', ')
//               : 'All'}{' '}
//             ({filteredServices?.length})
//           </p>

//           <div className="flex bg-slate-100 p-1 rounded-xl">
//             {(['list', 'map'] as ViewMode[]).map(v => (
//               <button
//                 key={v}
//                 onClick={() => setView(v)}
//                 className={`px-5 py-2 rounded-lg text-sm transition cursor-pointer
//                   ${
//                     view === v
//                       ? 'bg-white shadow text-primary'
//                       : 'text-slate-500'
//                   }`}
//               >
//                 {v === 'list' ? 'List' : 'Map'}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         {view === 'list' ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filteredServices?.map(service => {
//               const km = `${((service?.artist?.distance ?? 0) / 1000).toFixed(
//                 2
//               )} km`;
//               const rating =
//                 service?.avgRating && service.avgRating > 0
//                   ? service.avgRating.toFixed(1)
//                   : null;

//               return (
//                 <div
//                   key={service._id}
//                   className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition border overflow-hidden flex flex-col"
//                 >
//                   {/* <Image
//                     onClick={() => openShowServiceModal(service._id)}
//                     src={getCleanImageUrl(service?.thumbnail)}
//                     alt={service?.title || 'Service thumbnail'}
//                     height={300}
//                     width={500}
//                     className="cursor-pointer w-full h-60 object-cover rounded-lg"
//                   /> */}

//                   <div
//                     onClick={() => openShowServiceModal(service._id)}
//                     className="w-full h-56 bg-slate-100 flex items-center justify-center cursor-pointer"
//                   >
//                     <Image
//                       src={getCleanImageUrl(service?.thumbnail)}
//                       alt="service"
//                       width={1000}
//                       height={1000}
//                       quality={90}
//                       className="w-full h-full object-contain"
//                     />
//                   </div>

//                   <div className="p-4 flex flex-col h-full">
//                     <h3 className="text-lg font-semibold">{service?.title}</h3>

//                     <Link
//                       href={`/artist/${service?.artist?._id}`}
//                       className="flex items-center gap-2 mt-2"
//                     >
//                       <Image
//                         src={getCleanImageUrl(service?.artist?.auth?.image)}
//                         alt="artist"
//                         width={40}
//                         height={40}
//                         className="rounded-full h-10 w-10 object-cover"
//                       />
//                       <span className="text-sm font-medium text-primary">
//                         {service?.artist?.auth?.fullName}
//                       </span>
//                     </Link>

//                     <div className="flex justify-between items-center mt-4 text-sm text-slate-600">
//                       <span>{km}</span>
//                       {rating && (
//                         <span className="flex items-center gap-1 text-amber-600">
//                           <FaStar className="text-xs" />
//                           {rating}
//                         </span>
//                       )}
//                       <span className="font-semibold text-primary">
//                         ${service?.price}/hr
//                       </span>
//                     </div>

//                     {service?.bodyLocation && (
//                       <div className="mt-4">
//                         <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-slate-200 text-slate-700 font-medium capitalize">
//                           Placement: {service.bodyLocation}
//                         </span>
//                       </div>
//                     )}

//                     {service?.artist?.expertise?.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mt-4">
//                         {service.artist.expertise.map((exp, i) => (
//                           <span
//                             key={i}
//                             className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
//                           >
//                             {exp}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     <Link
//                       href={`/booking-availablity/${service?._id}`}
//                       className="mt-auto"
//                     >
//                       <div className="mt-5 py-2 rounded-xl bg-primary text-white text-center font-semibold hover:bg-primary/90 transition">
//                         Book Now
//                       </div>
//                     </Link>

//                     <div className="flex items-center gap-1 text-xs text-slate-500 mt-3">
//                       <SiGoogletasks />
//                       {formatCount(service?.totalCompletedOrder)} completed
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <Mapview artists={uniqueArtists} />
//         )}

//         {/* Radius button */}
//         <div className="flex justify-center mt-12">
//           <div
//             onClick={() => setIsRadiusModalOpen(true)}
//             className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 cursor-pointer"
//           >
//             Update Radius
//           </div>
//         </div>

//         {/* Modals */}
//         <Modal
//           open={isShowServiceModalOpen}
//           footer={null}
//           onCancel={() => setIsShowServiceModalOpen(false)}
//           centered
//           width={800}
//           destroyOnHidden
//         >
//           <ServiceDetailsModal selectedService={selectedService} />
//         </Modal>

//         <Modal
//           open={isRadiusModalOpen}
//           footer={null}
//           onCancel={() => setIsRadiusModalOpen(false)}
//           centered
//           width={500}
//           destroyOnHidden
//         >
//           <div className="p-5">
//             <h2 className="text-xl font-semibold mb-4">Update Radius (km)</h2>

//             <form
//               onSubmit={e => {
//                 e.preventDefault();
//                 handleRadiusUpdate();
//               }}
//             >
//               <Input
//                 type="number"
//                 min={1}
//                 value={radius}
//                 onChange={e => setRadius(e.target.value)}
//               />

//               <button
//                 type="submit"
//                 className="w-full mt-4! py-2 rounded-lg bg-primary text-white! cursor-pointer"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Services;
