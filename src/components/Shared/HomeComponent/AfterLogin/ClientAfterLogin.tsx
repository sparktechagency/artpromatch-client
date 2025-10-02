import Pagination from '../../Pagination';
import ClientAfterLoginHeader from './AfterLoginHeader';
import Services from './AfterLoginHeader/Services';
import { IMeta, IService } from '@/types';

const ClientAfterLogin = ({
  page,
  services = [],
  meta,
}: {
  page: string;
  services: IService[];
  meta: IMeta;
}) => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <ClientAfterLoginHeader />
      <Services services={services} />
      <Pagination meta={meta} />
    </div>
  );
};

export default ClientAfterLogin;
