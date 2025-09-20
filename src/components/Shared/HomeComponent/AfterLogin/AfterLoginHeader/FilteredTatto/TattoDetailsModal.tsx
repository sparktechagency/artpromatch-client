'use client';

import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import Link from 'next/link';
import { IService } from '@/types';

// Reuse Artist type from FilteredTatto or define here


interface TattoDetailsModalProps {
  selectedService: IService;
  // onClose: () => void;
}

const TattoDetailsModal: React.FC<TattoDetailsModalProps> = ({
  selectedService,
}) => {
  const artistsData: IService[] = [
    {
      id: 1,
      name: 'Lora Craft',
      location: 'New York, USA',
      distance: '3.2 miles away',
      price: '400/hr',
      availability: 'Next Week',
      categories: ['Tattoo Artists', 'Neo-Traditional'],
      image: AllImages.image2,
    },
    {
      id: 2,
      name: 'John Doe',
      location: 'Los Angeles, USA',
      distance: '2.8 miles away',
      price: '350/hr',
      availability: 'Next Week',
      categories: ['Tattoo Artists', 'Realism'],
      image: AllImages.image2,
    },
    {
      id: 3,
      name: 'Jane Smith',
      location: 'Miami, USA',
      distance: '5.1 miles away',
      price: '500/hr',
      availability: 'This Weekend',
      categories: ['Tattoo Artists', 'Black & Grey'],
      image: AllImages.image3,
    },
    {
      id: 4,
      name: 'Mike Johnson',
      location: 'Chicago, USA',
      distance: '4.3 miles away',
      price: '450/hr',
      availability: 'Next Month',
      categories: ['Tattoo Artists', 'Watercolor'],
      image: AllImages.image4,
    },
    // ...rest of your mock artists
  ];

  // const [currentService, setCurrentService] = useState<IService>(
  //   selectedService 
  // );

  // const handlePrev = () => {
  //   const currentIndex = artistsData.findIndex(
  //     artist => artist?._id === currentService?._id
  //   );
  //   const prevService =
  //     artistsData[currentIndex - 1] || artistsData[artistsData.length - 1];
  //   setCurrentService(prevService);
  // };

  // const handleNext = () => {
  //   const currentIndex = artistsData.findIndex(
  //     artist => artist._id === currentService?._id
  //   );
  //   const nextArtist = artistsData[currentIndex + 1] || artistsData[0];
  //   setCurrentService(nextArtist);
  // };

  return (
    <div className="relative p-4">
      <div className="flex flex-col md:flex-row justify-between items-center pb-3 border-b">
        <div className="flex items-center gap-3">
          <Link href="/profile-page">
            <Image
              src={AllImages.user}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <div>
            <h1 className="font-bold">{currentArtist.title}</h1>
            <p className="text-sm text-gray-500">{currentArtist.location}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/favourites">
            <CiHeart className="h-8 w-8 border border-primary p-1 rounded-lg " />
          </Link>
          <Link href="/message">
            <button className="flex justify-center items-center gap-2 text-primary px-3 py-1 border rounded-lg font-bold">
              <AiOutlineMessage /> Message
            </button>
          </Link>
          <Link href="/booking-availablity">
            <button className="px-3 py-1 bg-primary text-white rounded-lg">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center py-4 relative">
        <Image
          src={currentArtist.image}
          alt={currentArtist.name}
          width={400}
          height={400}
          className="rounded-lg w-full"
        />
      </div>
      <div className="flex justify-center items-center gap-5 text-center text-gray-500">
        <button onClick={handlePrev} className=" bg-gray-200 p-2 rounded-full">
          <FaChevronLeft />
        </button>
        <p className="pt-3">
          {artistsData.findIndex(artist => artist.id === currentArtist.id) + 1}{' '}
          / {artistsData.length}
        </p>
        <button onClick={handleNext} className=" bg-gray-200 p-2 rounded-full">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TattoDetailsModal;
