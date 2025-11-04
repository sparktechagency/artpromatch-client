import { AllImages } from '@/assets/images/AllImages';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { IBooking } from '@/types';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

const Testimonials = ({ bookings = [] }: { bookings: IBooking[] }) => {
  return (
    <div className="container mx-auto py-20 md:py-32">
      <h1 className="text-3xl font-bold text-center pb-5 md:pb-8">
        What Clients and Artists Say About Steady Hands
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:mr-20 mb-5">
        {bookings?.map((booking, index) => {
          const rating = Math.round(Number(booking?.rating) || 0);
          return (
            <div
              key={index}
              className="border border-gray-300/50 p-5 rounded-lg shadow-sm bg-white"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < rating ? 'text-amber-600' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-slate-700 mb-4 line-clamp-4">
                {booking?.review || 'No review provided.'}
              </p>

              <div className="flex justify-start items-center gap-3">
                <Image
                  src={getCleanImageUrl(booking?.client?.auth?.image)}
                  alt={booking?.client?.auth?.fullName || 'Client'}
                  height={50}
                  width={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {booking?.client?.auth?.fullName || 'Anonymous'}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {booking?.client?.stringLocation || 'Unknown location'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
