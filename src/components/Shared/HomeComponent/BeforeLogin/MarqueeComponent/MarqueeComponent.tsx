import { AllImages } from '@/assets/images/AllImages';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeComponent = ({ allImages = [] }: { allImages: string[] }) => {
  return (
    <div>
      <Marquee className="">
        <div className="flex justify-between items-center gap-4 pr-4">
          {allImages?.map((image, index) => (
            <Image
              key={index}
              src={getCleanImageUrl(image)}
              width={300}
              height={300}
              alt={`Image-${index + 1}`}
              className="w-90 h-60 object-cover rounded-xl"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;
