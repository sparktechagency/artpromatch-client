import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NearYou = () => {
  return (
    <div className="container mx-auto p-5 bg-primary rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-evenly items-center">
        <div className=" items-center">
          <h1 className="text-xl font-semibold text-white">
            Guest Artists Visiting <br /> Near You
          </h1>
          <p className="text-white py-5">
            Don&apos;t miss out on limited-time opportunities to book guest
            <br /> artists in your city.
          </p>
          <Link href="/guest-spots">
            <div className="px-4 py-2 rounded-lg text-white bg-black w-fit">
              Explore Now
            </div>
          </Link>
        </div>
        <div className=" flex items-center justify-center">
          <Image
            src={AllImages.logoOfset}
            alt="logo"
            height={200}
            width={200}
          />
        </div>
        <div className=" flex items-center justify-center">
          <Image src={AllImages.image9} alt="logo" height={300} width={300} />
        </div>
      </div>
    </div>
  );
};

export default NearYou;
