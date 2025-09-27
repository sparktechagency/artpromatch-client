'use client';

import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { IService } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { AiOutlineMessage } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';

interface ServiceDetailsModalProps {
  selectedService: IService | null;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  selectedService,
}) => {
  const images =
    selectedService?.images && selectedService.images.length > 0
      ? selectedService.images
      : [
          selectedService?.thumbnail ||
            'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png',
        ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center pb-3 border-b">
        <div className="flex items-center gap-3">
          <Link href="/profile-page">
            <Image
              src={getCleanImageUrl(
                selectedService?.artist?.auth?.image ||
                  'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png'
              )}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full h-12 w-12"
            />
          </Link>
          <div>
            <h1 className="font-bold">{selectedService?.title}</h1>
            <p className="text-sm text-gray-500">
              {selectedService?.artist?.stringLocation}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/favourites">
            <CiHeart className="h-8 w-8 border border-primary p-1 rounded-lg " />
          </Link>
          <Link href="/message">
            <div className="flex justify-center items-center gap-2 text-primary px-3 py-1 border rounded-lg font-bold">
              <AiOutlineMessage /> Message
            </div>
          </Link>
          <Link href={`/booking-availablity/${selectedService?._id}`}>
            <div className="px-3 py-1 bg-primary text-white rounded-lg">
              Book Now
            </div>
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex justify-center items-center py-4 relative">
        <Image
          src={getCleanImageUrl(images[currentIndex])}
          alt={selectedService?.title || 'Service Image'}
          width={400}
          height={400}
          className="rounded-lg w-full max-h-[400px] object-contain"
        />

        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            <FaChevronLeft className="text-xl" />
          </button>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            <FaChevronRight className="text-xl" />
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                currentIndex === idx ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceDetailsModal;
