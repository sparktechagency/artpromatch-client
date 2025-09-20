import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';

const Mapview = () => {
  return (
    <div>
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

export default Mapview;
