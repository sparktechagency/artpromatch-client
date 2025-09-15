import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';
import MarqueeCOmponent from './MarqueeComponent/MarqueeComponent';
import FeaturedTatuArtists from './FeaturedTatoArtists/FeaturedTatuArtists';
import FeaturedPiercingArtist from './FeaturedPiercingArtist/FeaturedPiercingArtist';
import NearYou from './NearYou/NearYou';
import WantATattto from './WantATatto/WantATattto';
import PiercingNow from './PiercingNow/PiercingNow';
import Testimonials from './Testimonials/Testimonials';
import SteadyHands from './StaedyHands/SteadyHands';
import Link from 'next/link';

const BeforeLogin = () => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="mb-4 flex flex-col justify-center items-center text-center pt-16 bg-[#fafafa] border rounded-lg border-gray-300/50">
        <Image src={AllImages.logo} width={50} height={50} alt="logo"></Image>
        <h1>
          <div className="text-center md:text-6xl font-bold mt-6 mb-2 ">
            Your next masterpiece <br /> starts here
          </div>
        </h1>
        <div className="text-base md:text-lg text-center text-primary mt-3 md:mb-10 ">
          Discover tattoo artists, piercers, and studios tailored to <br /> your
          preferences.
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:gap-5 mb-20">
          <Link href="/sign-in">
            <div className="bg-black text-white py-3 px-6 rounded-lg">
              Book Artist Now
            </div>
          </Link>
          <Link href="/sign-in">
            <button className="bg-primary py-3 px-6 rounded-lg">
              <div className="flex justify-center text-white items-center gap-2">
                Explore Guest Spot <IoIosArrowForward />
              </div>
            </button>
          </Link>
        </div>
        <MarqueeCOmponent />
      </div>
      <FeaturedTatuArtists />
      <FeaturedPiercingArtist />
      <NearYou />
      <WantATattto />
      <PiercingNow />
      <Testimonials />
      <SteadyHands />
    </div>
  );
};

export default BeforeLogin;
