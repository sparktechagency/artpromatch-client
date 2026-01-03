'use client';

import ClientAfterLogin from '@/components/Shared/HomeComponent/AfterLogin/ClientAfterLogin';
import BeforeLogin from '@/components/Shared/HomeComponent/BeforeLogin';
import { useUser } from '@/context/UserContext';
import { IBooking, IMeta, IService } from '@/types';

const HomeComponent = ({
  data,
  meta,
  bookings = [],
}: {
  data: {
    sortedServices: IService[];
    favoriteTattoos: string[];
  };
  meta: IMeta;
  bookings: IBooking[];
}) => {
  const { user } = useUser();

  const renderContent = () => {
    if (!user) return <BeforeLogin services={data?.sortedServices} bookings={bookings} />;

    switch (user.role) {
      case 'CLIENT':
        return <ClientAfterLogin data={data} meta={meta} />;

      // case 'ARTIST':
      //   return <ArtistAfterLogin />;

      // case 'BUSINESS':
      //   return <BusinessAfterLogin />;

      default:
        return (
          <BeforeLogin services={data?.sortedServices} bookings={bookings} />
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default HomeComponent;
