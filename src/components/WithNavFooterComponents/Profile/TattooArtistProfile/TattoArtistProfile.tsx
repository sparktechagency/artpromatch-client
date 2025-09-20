import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMessage } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';

const TattoArtistProfile = () => {
  return (
    <div>
      <div className="bg-[#f3f1f1]">
        <Image
          src={AllImages.profileBg}
          alt="logo"
          height={300}
          width={300}
          className="h-40 md:h-auto w-full "
        />
      </div>
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0 my-5">
          <div className="flex flex-col lg:flex-row justify-start items-center gap-2">
            <Image
              src={AllImages.user}
              alt="logo"
              height={160}
              width={160}
              className="h-40 w-40 md:h-32 md:w-32 xl:h-52 xl:w-52 top-56 md:top-48 lg:top-56 xl:top-64   rounded-full border-2 border-white lg:absolute  absolute"
            />
            <div className="mt-24 md:mt-16 lg:mt-0 lg:ml-36 xl:ml-56">
              <h1 className="text-xl font-bold">Alex Rivera</h1>
              <h4 className="text-sm text-neutral-500">Brooklyn, NY</h4>
            </div>
            <div className="flex justify-center items-center gap-2 bg-green-50 text-black px-4 py-2 rounded-3xl ">
              <h1 className="h-2 w-2 bg-green-600 rounded-full"></h1>
              <h1> Available Now</h1>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
            <Link href="/favourites">
              <button className="px-3 py-1 rounded-xl border">
                <CiHeart className="h-4 w-4 " />
              </button>
            </Link>
            <Link href="/message">
              <button className="px-3 py-1 rounded-xl border flex justify-center items-center gap-2">
                <AiOutlineMessage className="h-4 w-4 " />
                Message
              </button>
            </Link>
            <Link href="/booking-availablity">
              <button className="px-3 py-1 rounded-xl border flex justify-center items-center gap-2 bg-primary text-white">
                <SlCalender className="h-4 w-4 " />
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TattoArtistProfile;
