'use client';

import { initSocket } from '@/utils/socket';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { AllImages } from '@/assets/images/AllImages';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMessage } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';

type TattooArtistProfileProps = {
  name: string;
  location: string;
  image: string;
  artistAuthId: string;
};

const useArtistOnlineStatus = (artistId?: string) => {
  const { user } = useUser();
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (!artistId || !user?.id) {
      setIsOnline(null);
      return;
    }

    const socket = initSocket(user.id);
    let isMounted = true;
    const fallbackTimeout = setTimeout(() => {
      if (!isMounted) return;
      setIsOnline(prev => (prev === null ? false : prev));
    }, 2000);

    const handleUserStatus = (payload: {
      userId?: string;
      online?: boolean;
    }) => {
      if (!isMounted || payload.userId !== artistId) return;
      if (typeof payload.online === 'boolean') {
        setIsOnline(payload.online);
      }
    };

    socket.on('user-status', handleUserStatus);
    socket.emit('get-user-status', artistId);

    return () => {
      isMounted = false;
      socket.off('user-status', handleUserStatus);
      clearTimeout(fallbackTimeout);
    };
  }, [artistId, user?.id]);

  return isOnline;
};

const TattoArtistProfile = ({
  name,
  location,
  image,
  artistAuthId,
}: TattooArtistProfileProps) => {
  const isOnline = useArtistOnlineStatus(artistAuthId);
  const availabilityLabel =
    isOnline === null
      ? 'Checking availability...'
      : isOnline
      ? 'Available now'
      : 'Currently offline';
  const badgeColor =
    isOnline === null
      ? 'bg-gray-100 text-gray-600'
      : isOnline
      ? 'bg-green-50 text-green-900'
      : 'bg-zinc-50 text-zinc-400';
  const dotColor = isOnline === true ? 'bg-green-600' : 'bg-zinc-400';
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
              src={getCleanImageUrl(image)}
              alt="logo"
              height={160}
              width={160}
              className="h-40 w-40 md:h-32 md:w-32 xl:h-52 xl:w-52 top-56 md:top-48 lg:top-56 xl:top-64   rounded-full border-2 border-white lg:absolute  absolute"
            />
            <div className="mt-24 md:mt-16 lg:mt-0 lg:ml-36 xl:ml-56">
              <h1 className="text-xl font-bold">{name}</h1>
              <h4 className="text-sm text-neutral-500">{location}</h4>
            </div>
            <div
              className={`flex justify-center items-center gap-2 px-4 py-2 rounded-3xl ${badgeColor}`}
            >
              <span
                className={`h-2 w-2 ${dotColor} rounded-full inline-block`}
              />
              <span className="text-sm font-semibold">{availabilityLabel}</span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
            {/* <Link href="/favourites">
              <button className="px-3 py-1 rounded-xl border">
                <CiHeart className="h-4 w-4 " />
              </button>
            </Link> */}
            <Link href={`/message?receiverId=${artistAuthId}`}>
              <button className="px-3 py-1 rounded-xl border flex justify-center items-center gap-2">
                <AiOutlineMessage className="h-4 w-4 " />
                Message
              </button>
            </Link>
            {/* <Link href="/booking-availablity">
              <button className="px-3 py-1 rounded-xl border flex justify-center items-center gap-2 bg-primary text-white">
                <SlCalender className="h-4 w-4 " />
                Book Now
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TattoArtistProfile;
