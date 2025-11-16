'use client';

import { useState } from 'react';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { IService } from '@/types';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { SiGoogletasks } from 'react-icons/si';
import Link from 'next/link';
import { formatCount } from '@/lib/formatCount';

const WantATattoo = ({
  services = [],
  title,
}: {
  services: IService[];
  title?: string;
}) => {
  const itemsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + itemsPerPage < services.length) {
      setStartIndex(prev => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(prev => prev - itemsPerPage);
    }
  };

  const currentServices = services.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto md:my-20">
      <div className="flex justify-between items-center mb-5">
        <h1>
          <div className="text-2xl font-bold">{title}</div>
        </h1>
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="h-8 w-8 border rounded-full flex items-center justify-center disabled:opacity-40"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= services.length}
            className="h-8 w-8 border rounded-full flex items-center justify-center disabled:opacity-40"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {currentServices.map(service => (
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
            </div>

            <div className="flex justify-between items-center gap-2 mb-5">
              <div className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold capitalize">
                {service?.bodyLocation}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-1">
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

export default WantATattoo;
