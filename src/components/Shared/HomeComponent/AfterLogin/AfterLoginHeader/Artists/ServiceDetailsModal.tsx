'use client';

import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { IArtist } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
// import { CiHeart } from 'react-icons/ci';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface ServiceDetailsModalProps {
  selectedArtist: IArtist | null;
  onBookNow?: (artist: IArtist) => void;
  // onClose?: () => void;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  selectedArtist,
  onBookNow,
  // onClose,
}) => {
  const images = useMemo(() => {
    const merged = [
      ...(selectedArtist?.flashImages ?? [
        'https://res.cloudinary.com/dweesppci/image/upload/v1768712240/1768712240691-KHALED-SIDDIQUE.png',
      ]),
      // ...(selectedArtist?.portfolioImages ?? []),
    ]
      .map(image => (typeof image === 'string' ? image.trim() : ''))
      .filter(Boolean);

    const unique = Array.from(new Set(merged));

    return unique.length > 0
      ? unique
      : [
          selectedArtist?.auth?.image ||
            'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png',
        ];
  }, [selectedArtist]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedArtist]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative bg-white">
      <div className="flex items-start justify-between gap-4 px-4 pt-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/artist/${selectedArtist?._id}`} className="shrink-0">
            <Image
              src={getCleanImageUrl(
                selectedArtist?.auth?.image ||
                  'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png'
              )}
              alt="Profile"
              width={44}
              height={44}
              className="rounded-full h-11 w-11 object-cover"
            />
          </Link>

          <div className="min-w-0">
            <h1 className="font-semibold leading-tight truncate">
              {selectedArtist?.auth?.fullName}
            </h1>
            <p className="text-sm text-slate-500 truncate">
              {selectedArtist?.stringLocation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* <button
            type="button"
            className="h-10 w-10 flex items-center justify-center rounded-lg border bg-white hover:bg-primary/70 text-black border-gray-400/40"
          >
            <CiHeart className="text-xl" />
          </button> */}

          <Link href={`/message?receiverId=${selectedArtist?.auth?._id}`}>
            <div className="h-10 px-4 flex items-center justify-center gap-2 rounded-lg border bg-white hover:bg-primary/70 font-medium text-black hover:text-white border-gray-400/40">
              <AiOutlineMessage className="text-lg" />
              Message
            </div>
          </Link>

          <div
            onClick={() => selectedArtist && onBookNow?.(selectedArtist)}
            className="h-10 px-4 flex items-center justify-center gap-2 rounded-lg bg-primary text-white hover:bg-primary/70 font-medium cursor-pointer"
          >
            Book Now
          </div>

          {/* <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-lg border bg-white hover:bg-slate-50"
            aria-label="Close"
          >
            <IoClose className="text-xl" />
          </button> */}
        </div>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="relative rounded-2xl overflow-hidden bg-slate-100">
          <Image
            src={getCleanImageUrl(images[currentIndex])}
            alt="Service Image"
            width={1200}
            height={800}
            className="w-full h-[420px] object-cover"
            priority
          />

          {images.length > 1 && (
            <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex items-center gap-3 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow">
              <button
                type="button"
                onClick={prevSlide}
                className="h-9 w-9 flex items-center justify-center rounded-full border bg-white hover:bg-slate-50"
                aria-label="Previous"
              >
                <FaChevronLeft />
              </button>

              <div className="text-sm font-medium tabular-nums">
                {String(currentIndex + 1).padStart(2, '0')}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                className="h-9 w-9 flex items-center justify-center rounded-full border bg-white hover:bg-slate-50"
                aria-label="Next"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;
