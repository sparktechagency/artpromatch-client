import Pagination from '../../Pagination';
import ClientAfterLoginHeader from './AfterLoginHeader';
import Services from './AfterLoginHeader/Services';
import { IMeta, IService } from '@/types';

const ClientAfterLogin = ({
  data,
  meta,
}: {
  data: {
    sortedServices: IService[];
    favoriteTattoos: string[];
  };
  meta: IMeta;
}) => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <ClientAfterLoginHeader />
      <Services data={data} />
      <Pagination meta={meta} />
    </div>
  );
};

export default ClientAfterLogin;
