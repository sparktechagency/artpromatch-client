'use client';

import { useState } from 'react';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { IArtist, IService } from '@/types';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { SiGoogletasks } from 'react-icons/si';
import Link from 'next/link';
import { formatCount } from '@/lib/formatCount';
import { Carousel } from 'antd';

const WantATattoo = ({
  artists = [],
  title,
}: {
  artists: IArtist[];
  title?: string;
}) => {
  const itemsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + itemsPerPage < artists.length) {
      setStartIndex(prev => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(prev => prev - itemsPerPage);
    }
  };

  const currentArtists = artists.slice(startIndex, startIndex + itemsPerPage);

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
            disabled={startIndex + itemsPerPage >= artists.length}
            className="h-8 w-8 border rounded-full flex items-center justify-center disabled:opacity-40"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {currentArtists.map(artist => (
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
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-1">
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

export default WantATattoo;
