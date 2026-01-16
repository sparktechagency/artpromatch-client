'use client';

import ClientAfterLogin from '@/components/Shared/HomeComponent/AfterLogin/ClientAfterLogin';
import BeforeLogin from '@/components/Shared/HomeComponent/BeforeLogin';
import { useUser } from '@/context/UserContext';
import { IArtist, IBooking, IMeta } from '@/types';

const HomeComponent = ({
  data,
  meta,
  bookings = [],
}: {
  data: {
    sortedArtists: IArtist[];
    favoriteList: string[];
    availableExpertise: string[];
  };
  meta: IMeta;
  bookings: IBooking[];
}) => {
  const { user } = useUser();

  const renderContent = () => {
    if (!user)
      return <BeforeLogin artists={data?.sortedArtists} bookings={bookings} />;

    switch (user.role) {
      case 'CLIENT':
        return <ClientAfterLogin data={data} meta={meta} />;

      // case 'ARTIST':
      //   return <ArtistAfterLogin />;

      // case 'BUSINESS':
      //   return <BusinessAfterLogin />;

      default:
        return (
          <BeforeLogin artists={data?.sortedArtists} bookings={bookings} />
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default HomeComponent;
