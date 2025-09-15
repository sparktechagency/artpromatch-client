import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import React from 'react';

const SteadyHands = () => {
  return (
    <div className="container mx-auto my-20">
      <div className="md:mt-20 bg-[#f5f5f5] rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="">
          <h1 className="text-xl font-bold">Steady Hands: In your pocket.</h1>
          <p className="my-3">
            Explore, book, and manage your appointments on the go with the
            Steady Hands mobile app.
          </p>
          <div className="flex flex-col md:flex-row justify-start items-start gap-5">
            <div className="w-full bg-black rounded-xl px-4 py-2 flex justify-center items-center gap-2 cursor-pointer">
              <Image src={AllImages.apple} alt="Apple" height={30} width={30} />
              <div className="flex flex-col text-white">
                <p className="text-xs">Download on the</p>
                <h1 className="text-lg font-bold">App Store</h1>
              </div>
            </div>

            <div className="w-full bg-black rounded-xl px-4 py-2 flex justify-center items-center gap-2 cursor-pointer">
              <Image
                src={AllImages.playStore}
                alt="Google"
                height={30}
                width={30}
              />
              <div className="flex flex-col text-white">
                <p className="text-xs">Get it on</p>
                <h1 className="text-lg font-bold">Google Play</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image src={AllImages.image10} alt="Apple" height={700} width={700} />
          <div className="absolute -bottom-32 md:-bottom-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={AllImages.phone} alt="Phone" height={300} width={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteadyHands;
