import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';
import MarqueeComponent from './MarqueeComponent/MarqueeComponent';
import FeaturedArtists from './FeaturedArtists';
import NearYou from './NearYou/NearYou';
import WantATattoo from './WantATattoo';
import Testimonials from './Testimonials';
import SteadyHands from './SteadyHands';
import Link from 'next/link';
import { IArtist, IBooking } from '@/types';

const BeforeLogin = ({
  artists = [],
  bookings = [],
}: {
  artists: IArtist[];
  bookings: IBooking[];
}) => {
  const allImages: string[] = artists?.flatMap(artist => [
    ...(artist.flashImages ?? []),
    ...(artist.portfolioImages ?? []),
  ]);

  const tattooArtists = artists?.filter(
    artist => artist?.type === 'Tattoo Artist' || artist?.type === 'Both'
  );

  const pierceArtists = artists?.filter(
    artist => artist?.type === 'Piercer' || artist?.type === 'Both'
  );

  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="mb-4 flex flex-col justify-center items-center text-center pt-16 bg-[#fafafa] border rounded-lg border-gray-300/50">
        <Image src={AllImages.logo} width={80} height={80} alt="logo" />
        <h1>
          <div className="text-center md:text-5xl font-bold mt-6 mb-2">
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
          <Link href="/guest-spots">
            <div className="bg-primary py-3 px-6 rounded-lg">
              <div className="flex justify-center text-white items-center gap-2">
                Explore Guest Spot <IoIosArrowForward />
              </div>
            </div>
          </Link>
        </div>
        <MarqueeComponent allImages={allImages} />
      </div>

      {tattooArtists?.length > 0 && (
        <FeaturedArtists
          artists={tattooArtists}
          title="Featured Tattoo Artists"
        />
      )}

      {pierceArtists?.length > 0 && (
        <FeaturedArtists
          artists={pierceArtists}
          title="Featured Piercing Artists"
        />
      )}

      <NearYou />

      {tattooArtists?.length > 0 && (
        <WantATattoo title="Want a Tattoo Now?" artists={tattooArtists} />
      )}

      {pierceArtists?.length > 0 && (
        <WantATattoo title="Want a Piercing Now?" artists={pierceArtists} />
      )}

      {bookings.length > 0 && <Testimonials bookings={bookings} />}

      <SteadyHands />
    </div>
  );
};

export default BeforeLogin;
