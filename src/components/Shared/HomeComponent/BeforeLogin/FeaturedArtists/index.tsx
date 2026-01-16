import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { IArtist, IService } from '@/types';
import Image from 'next/image';
import { SiGoogletasks } from 'react-icons/si';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { formatCount } from '@/lib/formatCount';
import { Carousel } from 'antd';

const FeaturedArtists = ({
  artists = [],
  title,
}: {
  artists: IArtist[];
  title: string;
}) => {
  return (
    <div className="container mx-auto md:my-20">
      <div className="flex justify-between items-center">
        <h1>
          <div className="text-2xl font-bold">{title}</div>
        </h1>
        {/* <div className="flex justify-center items-center gap-5">
          <IoIosArrowBack className="h-8 w-8 border rounded-full" />
          <IoIosArrowForward className="h-8 w-8 border rounded-full" />
        </div> */}

        {/* <div className="flex justify-center items-center gap-5">
          <button className="h-8 w-8 border rounded-full flex items-center justify-center disabled:opacity-40">
            <IoIosArrowBack />
          </button>
          <button className="h-8 w-8 border rounded-full flex items-center justify-center disabled:opacity-40">
            <IoIosArrowForward />
          </button>
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {artists?.slice(0, 4)?.map(artist => (
          <div
            key={artist?._id}
            className="border rounded-xl border-gray-300/50 p-2"
          >
            <Link href="/sign-in">
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
            </Link>
            <div className="flex justify-between items-center my-3">
              <div className="flex justify-center items-center gap-2">
                <Link href="/sign-in">
                  <Image
                    src={getCleanImageUrl(artist?.auth?.image)}
                    alt="image"
                    height={50}
                    width={50}
                    className="rounded-full w-12 h-12"
                  />
                </Link>
                <div>
                  <h1 className="text-xl font-semibold">
                    {artist?.auth?.fullName}
                  </h1>
                  <p className="text-xs text-neutral-500">
                    {artist?.stringLocation}
                  </p>
                </div>
              </div>
              {/* <p className="text-secondary">3.2 miles away</p> */}
            </div>
            <div className="flex justify-between items-center gap-2 mb-5">
              <div className="flex gap-5">
                {/* <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                  Facial
                </button>
                <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                  Oral
                </button>
                <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                  Genital
                </button> */}
              </div>
              {/* <button className="text-secondary">+5</button> */}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <SiGoogletasks />
                <span>{formatCount(artist?.totalCompletedService)} Done</span>
              </div>

              {artist?.avgRating > 0 && (
                <div className="flex gap-1 text-amber-600">
                  <FaStar />
                  {artist?.avgRating.toFixed(1)} ({artist?.totalReviewCount})
                </div>
              )}

              <div className="text-primary font-bold">
                {/* <FaDollarSign /> */}${artist?.hourlyRate ?? 0}/hr
                {/* <IoIosArrowForward /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArtists;
