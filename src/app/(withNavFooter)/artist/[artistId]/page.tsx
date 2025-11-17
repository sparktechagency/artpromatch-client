import AvailableFlash from '@/components/WithNavFooterComponents/Profile/AvailableFlash';
import ProfileSideBar from '@/components/WithNavFooterComponents/Profile/ProfileSidebar';
import TattoArtistProfile from '@/components/WithNavFooterComponents/Profile/TattooArtistProfile';
import { getArtistProfileByHisId } from '@/services/Service';

const ArtistProfilePage = async ({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) => {
  const { artistId } = await params;

  const { data: artistData } = await getArtistProfileByHisId(artistId);

  const name = artistData?.auth?.fullName ?? 'Unknown Artist';
  const image = artistData?.auth?.image;
  const description =
    artistData?.description ?? "This artist hasn't added a bio yet.";
  const stringLocation =
    artistData?.stringLocation ?? artistData?.city ?? 'Location unavailable';
  const expertise = artistData?.expertise ?? [];
  const avgRating = artistData?.avgRating ?? 0;
  const totalReviewCount = artistData?.totalReviewCount ?? 0;
  const hourlyRate = artistData?.hourlyRate ?? null;
  const totalCompletedService = artistData?.totalCompletedService ?? 0;
  const type = artistData?.type ?? 'Tattoo Artist';

  const artistAuthId = artistData?.auth?._id;

  return (
    <div className="px-2 md:px-0">
      <TattoArtistProfile
        name={name}
        location={stringLocation}
        image={image}
        artistAuthId={artistAuthId}
      />
      <div className="container mx-auto flex flex-col md:flex-row my-10 gap-6">
        <div className="md:w-[20%]">
          <ProfileSideBar
            artistName={name}
            location={stringLocation}
            hourlyRate={hourlyRate}
            phone={artistData?.auth?.phoneNumber ?? null}
            email={artistData?.auth?.email ?? null}
            activeGuestSpots={artistData?.activeGuestSpots ?? []}
            activeServices={artistData?.activeServices ?? []}
          />
        </div>
        <div className="md:w-[80%] px-5 space-y-6">
          <div className="border-b pb-4 space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            <p className="text-sm text-gray-500 capitalize">
              {type === 'Both' ? 'Tattoo Artist & Piercer' : type}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-2">
              <span className="px-2 py-1 rounded-full bg-gray-100">
                {stringLocation}
              </span>
              {hourlyRate !== null && (
                <span className="px-2 py-1 rounded-full bg-gray-100">
                  ${hourlyRate}/hr
                </span>
              )}
              <span className="px-2 py-1 rounded-full bg-gray-100 flex items-center gap-1">
                <span className="font-semibold">
                  {avgRating.toFixed ? avgRating.toFixed(1) : avgRating}
                </span>
                <span>⭐</span>
                <span className="text-xs text-gray-500">
                  ({totalReviewCount} reviews)
                </span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">About {name}</h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {expertise.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Specialties & Styles</h3>
              <div className="flex flex-wrap gap-2">
                {expertise.map((style: string) => (
                  <span
                    key={style}
                    className="px-3 py-1 rounded-full bg-black text-white text-xs md:text-sm"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div className="p-3 rounded-lg border bg-white">
              <p className="text-xs text-gray-500">Completed Sessions</p>
              <p className="text-lg font-semibold">{totalCompletedService}</p>
            </div>
            <div className="p-3 rounded-lg border bg-white">
              <p className="text-xs text-gray-500">Total Reviews</p>
              <p className="text-lg font-semibold">{totalReviewCount}</p>
            </div>
            <div className="p-3 rounded-lg border bg-white">
              <p className="text-xs text-gray-500">Average Rating</p>
              <p className="text-lg font-semibold">
                {avgRating.toFixed ? avgRating.toFixed(1) : avgRating}
              </p>
            </div>
            {hourlyRate !== null && (
              <div className="p-3 rounded-lg border bg-white">
                <p className="text-xs text-gray-500">Hourly Rate</p>
                <p className="text-lg font-semibold">${hourlyRate}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <AvailableFlash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
