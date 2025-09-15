import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

const Testimonials = () => {
  return (
    <div className="container mx-auto md:mt-20">
      <h1 className="text-3xl font-bold text-center mb-3">
        What Clients and Artists Say About Steady Hands
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:mr-20 mb-5">
        <div className="border border-gray-300/50 p-3 rounded-lg">
          <div>
            <div className="flex gap-2 mb-3">
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
            </div>
            <p>
              Lorem ipsum dolor sit amet. Et liberotione neque recusandae
              voluptas. 
            </p>
            <div className="flex justify-start items-center gap-2">
              <Image
                src={AllImages.image5}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              ></Image>
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300/50 p-3 rounded-lg">
          <div>
            <div className="flex gap-2 mb-3">
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
            </div>
            <p>
              Lorem ipsum dolor sit amet. Et liberotione neque recusandae
              voluptas. 
            </p>
            <div className="flex justify-start items-center gap-2">
              <Image
                src={AllImages.image5}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              ></Image>
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300/50 p-3 rounded-lg">
          <div>
            <div className="flex gap-2 mb-3">
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
            </div>
            <p>
              Lorem ipsum dolor sit amet. Et liberotione neque recusandae
              voluptas. 
            </p>
            <div className="flex justify-start items-center gap-2">
              <Image
                src={AllImages.image5}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              ></Image>
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:ml-20">
        <div className="border border-gray-300/50 p-3 rounded-lg">
          <div>
            <div className="flex gap-2 mb-3">
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
            </div>
            <p>
              Lorem ipsum dolor sit amet. Et liberotione neque recusandae
              voluptas. 
            </p>
            <div className="flex justify-start items-center gap-2">
              <Image
                src={AllImages.image5}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              ></Image>
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300/50 p-3 rounded-lg">
          <div>
            <div className="flex gap-2 mb-3">
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
            </div>
            <p>
              Lorem ipsum dolor sit amet. Et liberotione neque recusandae
              voluptas. 
            </p>
            <div className="flex justify-start items-center gap-2">
              <Image
                src={AllImages.image5}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              ></Image>
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300/50 p-3 rounded-lg">
          <div>
            <div className="flex gap-2 mb-3">
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
              <FaStar className=""></FaStar>
            </div>
            <p>
              Lorem ipsum dolor sit amet. Et liberotione neque recusandae
              voluptas. 
            </p>
            <div className="flex justify-start items-center gap-2">
              <Image
                src={AllImages.image5}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              ></Image>
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
