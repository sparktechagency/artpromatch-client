import Pagination from '@/components/Shared/Pagination';
import Bookings from '@/components/WithNavFooterComponents/Bookings';
import { getSingleClientBookings } from '@/services/Booking';

const BookingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  const { data: bookings, meta } = await getSingleClientBookings(
    query.page,
    '20',
    query
  );

  return (
    <div>
      <Bookings bookings={bookings} />
      <Pagination meta={meta} />
    </div>
  );
};

export default BookingsPage;
