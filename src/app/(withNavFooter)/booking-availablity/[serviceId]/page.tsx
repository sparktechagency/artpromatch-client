import BookingAvailablity from '@/components/WithNavFooterComponents/BookingModals/BookingAvailablity';

const BookingAvailablityPage = async ({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) => {
  const { serviceId } = await params;

  return (
    <div>
      <BookingAvailablity serviceId={serviceId} />
    </div>
  );
};

export default BookingAvailablityPage;
