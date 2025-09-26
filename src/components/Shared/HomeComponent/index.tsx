'use client';

import ClientAfterLogin from '@/components/Shared/HomeComponent/AfterLogin/ClientAfterLogin';
import BeforeLogin from '@/components/Shared/HomeComponent/BeforeLogin';
import { useUser } from '@/context/UserContext';
import { IMeta, IService } from '@/types';

const HomeComponent = ({
  page,
  services = [],
  meta,
}: {
  page: string;
  services: IService[];
  meta: IMeta;
}) => {
  const { user } = useUser();

  const renderContent = () => {
    if (!user)
      return <BeforeLogin page={page} services={services} meta={meta} />;

    switch (user.role) {
      case 'CLIENT':
        return <ClientAfterLogin page={page} services={services} meta={meta} />;

      // case 'ARTIST':
      //   return <ArtistAfterLogin />;

      // case 'BUSINESS':
      //   return <BusinessAfterLogin />;

      default:
        return <BeforeLogin page={page} services={services} meta={meta} />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default HomeComponent;
