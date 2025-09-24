import { confirmPaymentForClient } from '@/services/Booking';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BiCheck } from 'react-icons/bi';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { session_id } = await searchParams;

  if (!session_id) redirect('/');

  const res = await confirmPaymentForClient(session_id as string);

  if (!res.success) redirect('/');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {res?.success && (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-3 rounded-full mb-5">
              <BiCheck className="size-40 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {res?.message}
            </h1>
            <p className="text-gray-600 mb-6 text-center">
              Thank you for your purchase! Your payment has been processed
              successfully.
            </p>

            <Link
              href="/"
              className="py-2 px-6 rounded-2xl bg-primary text-white"
            >
              <div>Continue</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
