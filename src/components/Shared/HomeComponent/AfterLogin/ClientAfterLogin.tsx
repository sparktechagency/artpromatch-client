import ClientAfterLoginHeader from './AfterLoginHeader';
import FilteredTatto from './AfterLoginHeader/FilteredTatto';
import { IMeta, IService } from '@/types';

const ClientAfterLogin = ({
  page,
  services,
  meta,
}: {
  page: string;
  services: IService[];
  meta: IMeta;
}) => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <ClientAfterLoginHeader />
      <FilteredTatto page={page} services={services} meta={meta} />
    </div>
  );
};

export default ClientAfterLogin;
