import HomeComponent from '@/components/Shared/HomeComponent';
import { getAllServices } from '@/services/Service';

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  const { data: services, meta } = await getAllServices(
    query.page,
    '12',
    query
  );

  return (
    <div>
      <HomeComponent services={services} meta={meta} />
    </div>
  );
};

export default Homepage;
