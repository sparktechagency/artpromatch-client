import Pagination from '@/components/Shared/Pagination';
import PaymentHistory from '@/components/WithNavFooterComponents/Profile/UserProfile/PaymentHistory';
import { getAllPaymentsForClientAndArtist } from '@/services/Payment';

const PaymentPage = async () => {
  const { data: payments, meta: paymentMeta } =
    await getAllPaymentsForClientAndArtist();

  return (
    <div>
      <PaymentHistory payments={payments} />
      <Pagination meta={paymentMeta} />
    </div>
  );
};

export default PaymentPage;
