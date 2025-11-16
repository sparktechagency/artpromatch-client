import HomeComponent from '@/components/Shared/HomeComponent';
import { getBookingsWithReviewThatHaveReviewForClientHomePage } from '@/services/Booking';
import { getAllNormalServices } from '@/services/Service';

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  const { data: services, meta } = await getAllNormalServices(
    query.page,
    '12',
    query
  );

  const { data: bookings } =
    await getBookingsWithReviewThatHaveReviewForClientHomePage();

  return (
    <div>
      <HomeComponent services={services} meta={meta} bookings={bookings} />
    </div>
  );
};

export default Homepage;
