import Review from '@/components/WithNavFooterComponents/Bookings/Review';

const ReviewPage = async ({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) => {
  const { bookingId } = await params;

  return (
    <div>
      <Review bookingId={bookingId} />
    </div>
  );
};

export default ReviewPage;
