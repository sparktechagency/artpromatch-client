import Pagination from '../../Pagination';
import ClientAfterLoginHeader from './AfterLoginHeader';
import Artists from './AfterLoginHeader/Artists';
import { IArtist, IMeta } from '@/types';

const ClientAfterLogin = ({
  data,
  meta,
}: {
  data: {
    sortedArtists: IArtist[];
    favoriteList: string[];
    availableExpertise: string[];
  };
  meta: IMeta;
}) => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <ClientAfterLoginHeader />
      <Artists data={data} />
      <Pagination meta={meta} />
    </div>
  );
};

export default ClientAfterLogin;
