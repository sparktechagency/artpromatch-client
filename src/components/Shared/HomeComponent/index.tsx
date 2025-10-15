'use client';

import ClientAfterLogin from '@/components/Shared/HomeComponent/AfterLogin/ClientAfterLogin';
import BeforeLogin from '@/components/Shared/HomeComponent/BeforeLogin';
import { useUser } from '@/context/UserContext';
import { IBooking, IMeta, IService } from '@/types';

const HomeComponent = ({
  services = [],
  meta,
  bookings = [],
}: {
  services: IService[];
  meta: IMeta;
  bookings: IBooking[];
}) => {
  const { user } = useUser();

  const renderContent = () => {
    if (!user) return <BeforeLogin services={services} bookings={bookings} />;

    switch (user.role) {
      case 'CLIENT':
        return <ClientAfterLogin services={services} meta={meta} />;

      // case 'ARTIST':
      //   return <ArtistAfterLogin />;

      // case 'BUSINESS':
      //   return <BusinessAfterLogin />;

      default:
        return <BeforeLogin services={services} bookings={bookings} />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default HomeComponent;
