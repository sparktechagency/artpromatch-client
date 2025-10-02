import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';

const GuestSpots = () => {
  return (
    <div className="px-2 md:px-0">
      <Image
        src={AllImages.map}
        alt="map"
        height={800}
        width={1280}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default GuestSpots;
