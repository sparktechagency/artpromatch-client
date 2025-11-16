import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { IService } from '@/types';
import Image from 'next/image';
import { SiGoogletasks } from 'react-icons/si';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { formatCount } from '@/lib/formatCount';

const FeaturedArtists = ({
  services = [],
  title,
}: {
  services: IService[];
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
        {services?.slice(0, 4)?.map(service => (
          <div
            key={service?._id}
            className="border rounded-xl border-gray-300/50 p-2"
          >
            <Link href="/sign-in">
              <Image
                src={getCleanImageUrl(service?.thumbnail)}
                alt="image"
                height={300}
                width={500}
                className="w-90 h-60 object-cover rounded-xl"
              />
            </Link>
            <div className="flex justify-between items-center my-3">
              <div className="flex justify-center items-center gap-2">
                <Link href="/sign-in">
                  <Image
                    src={getCleanImageUrl(service?.artist?.auth?.image)}
                    alt="image"
                    height={50}
                    width={50}
                    className="rounded-full w-12 h-12"
                  />
                </Link>
                <div>
                  <h1 className="text-xl font-semibold">
                    {service?.artist?.auth?.fullName}
                  </h1>
                  <p className="text-xs text-neutral-500">
                    {service?.artist?.stringLocation}
                  </p>
                </div>
              </div>
              {/* <p className="text-secondary">3.2 miles away</p> */}
            </div>
            <div className="flex justify-between items-center gap-2 mb-5">
              <div className="flex gap-5">
                <div className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold capitalize">
                  {service?.bodyLocation}
                </div>
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
                <span>{formatCount(service?.totalCompletedOrder)} Done</span>
              </div>

              {service?.avgRating > 0 && (
                <div className="flex gap-1 text-amber-600">
                  <FaStar />
                  {service?.avgRating.toFixed(1)} ({service?.totalReviewCount})
                </div>
              )}

              <div className="text-primary font-bold">
                {/* <FaDollarSign /> */}${service?.price ?? 0}/hr
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
