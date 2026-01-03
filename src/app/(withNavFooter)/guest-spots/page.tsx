import { getAllGuestServicesFromDB } from '@/services/Service';
import Pagination from '@/components/Shared/Pagination';
import Services from '@/components/Shared/HomeComponent/AfterLogin/AfterLoginHeader/Services';

const GuestSpotsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    artistType?: string;
    tattooCategory?: string;
    searchTerm?: string;
  }>;
}) => {
  const query = await searchParams;

  const { data, meta } = await getAllGuestServicesFromDB(
    query.page,
    '12',
    query
  );

  return (
    <div className="container mx-auto px-2 md:px-0">
      <Services data={data} />
      <Pagination meta={meta} />
    </div>
  );
};

export default GuestSpotsPage;
