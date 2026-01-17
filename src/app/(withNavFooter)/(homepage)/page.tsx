import HomeComponent from '@/components/Shared/HomeComponent';
import { getBookingsWithReviewThatHaveReviewForClientHomePage } from '@/services/Booking';
import { getAllNormalArtists } from '@/services/Service';

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  // const { data: services, meta } = await getAllNormalServices(
  //   query.page,
  //   '12',
  //   query
  // );

  // const { data: bookings } =
  //   await getBookingsWithReviewThatHaveReviewForClientHomePage();

  const [{ data, meta }, { data: bookings }] = await Promise.all([
    getAllNormalArtists(query.page, '12', query),
    getBookingsWithReviewThatHaveReviewForClientHomePage(),
  ]);

  return (
    <div>
      <HomeComponent data={data} meta={meta} bookings={bookings} />
    </div>
  );
};

export default Homepage;
