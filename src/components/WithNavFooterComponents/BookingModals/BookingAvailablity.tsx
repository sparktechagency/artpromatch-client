'use client';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import {
  FaCalendarCheck,
  FaTimes,
  FaCheckCircle,
  FaInfoCircle,
} from 'react-icons/fa';
import { toast } from 'sonner';
import { requestAServiceBooking } from '@/services/Service';
import { useRouter } from 'next/navigation';

const localizer = momentLocalizer(moment);

// Create a payment form component that uses useStripe and useElements
const CheckoutForm = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: any) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      onError(error);
    } else if (
      paymentIntent?.status === 'requires_capture' ||
      paymentIntent?.status === 'succeeded'
    ) {
      onSuccess();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <PaymentElement />
      <div className="mt-4">
        <button
          onClick={handleConfirmPayment}
          className="w-full bg-primary py-3 rounded-lg"
        >
          <span className="text-white">Pay Now</span>
        </button>
      </div>
    </div>
  );
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

const BookingAvailability = ({ serviceId }: { serviceId: string }) => {
  const router = useRouter();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [radius, setRadius] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [bookingSuccess, setBookingSuccess] = useState(false);

  // Configuration
  const MAX_BOOKING_DAYS = 30; // Maximum days in the future users can book

  // Minimum selectable date: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // Maximum selectable date
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(tomorrow.getDate() + MAX_BOOKING_DAYS - 1);
  maxSelectableDate.setHours(23, 59, 59, 999);

  // Handle date selection with validation
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(end);
    endDate.setHours(0, 0, 0, 0);
    // Subtract 1 ms to fix off-by-one issue
    endDate.setTime(endDate.getTime() - 1);

    // Prevent selecting today or past dates
    if (startDate < tomorrow) {
      toast.warning('Please select dates starting from tomorrow!');
      return;
    }

    // Check if selection is within allowed radius
    if (endDate > maxSelectableDate) {
      toast.warning(
        `Bookings are only available up to ${moment(maxSelectableDate).format(
          'MMMM D, YYYY'
        )}`
      );
      return;
    }

    setRadius({ start: startDate, end: endDate });
  };

  // Clear selection
  const clearSelection = () => {
    setRadius({ start: null, end: null });
  };

  // Custom slot prop getter to disable past dates
  const slotPropGetter = (date: Date) => {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    const isBeforeTomorrow = currentDate < tomorrow;
    const isBeyondMax = currentDate > maxSelectableDate;

    if (isBeforeTomorrow || isBeyondMax) {
      return {
        className: 'rbc-disabled-slot',
        style: {
          backgroundColor: '#f3f4f6',
          cursor: 'not-allowed',
          color: '#9ca3af',
        },
      };
    }

    return {};
  };

  // handleSubmit
  const handleSubmit = async () => {
    if (!radius.start || !radius.end) {
      toast.warning('Please select a date range first!');
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      serviceId,
      preferredStartDate: radius.start.toISOString(),
      preferredEndDate: radius.end.toISOString(),
    };

    try {
      const res = await requestAServiceBooking(bookingData);

      if (res?.success) {
        // setBookingSuccess(true);
        // setTimeout(() => setBookingSuccess(false), 3000);
        // router.push(res?.data?.checkoutUrl);

        toast.success(res?.message);
        if (res?.data?.clientSecret) {
          setClientSecret(res?.data?.clientSecret);
          setShowPaymentForm(true);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.warning('Error creating booking!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom event styles
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '##816a6b',
        color: 'white',
        borderRadius: '6px',
        border: 'none',
        padding: '2px 5px',
        fontSize: '12px',
        fontWeight: '500',
      },
    };
  };

  // Custom day style for selected range
  const dayPropGetter = (date: Date) => {
    if (!radius.start || !radius.end) return {};

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    const startDate = new Date(radius.start);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(radius.end);
    endDate.setHours(0, 0, 0, 0);

    const isSelected = currentDate >= startDate && currentDate <= endDate;

    return {
      style: {
        backgroundColor: isSelected ? '#EFF6FF' : 'white',
        border: isSelected ? '2px solid #3B82F6' : '1px solid #e5e7eb',
        borderRadius: '6px',
      },
    };
  };

  // Wrap the component with Stripe Elements provider if showing payment form
  const content = (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <FaCalendarCheck className="text-primary text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Availability
        </h2>
        <p className="text-gray-600">
          Select your preferred dates for the service
        </p>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 inline-flex items-center">
          <FaInfoCircle className="text-primary mr-2" />
          <span className="text-sm text-primary">
            You can book up to {MAX_BOOKING_DAYS} days in advance
          </span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 500,
            background: 'white',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          views={['month']}
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          slotPropGetter={slotPropGetter}
          popup
        />
      </div>

      {radius.start && radius.end && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center">
              <FaCheckCircle className="mr-2 text-primary" />
              Selected Dates
            </h3>
            <div
              onClick={clearSelection}
              className="text-black hover:text-red-800 hover:scale-105 transition-colors flex items-center text-sm"
            >
              <FaTimes className="mr-1" />
              Clear
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">Start Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {moment(radius.start).format('MMMM D, YYYY')}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">End Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {moment(radius.end).format('MMMM D, YYYY')}
              </p>
            </div>
          </div>

          <div className="mb-4 bg-white p-3 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-600 mb-1">Duration</p>
            <p className="text-lg font-semibold text-gray-800">
              {moment(radius.end).diff(moment(radius.start), 'days') + 1} days
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-blue-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-white flex justify-center items-center">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </div>
            </button>

            {/* {bookingSuccess && (
              <div className="flex-1 bg-green-100 border border-green-200 text-green-800 py-3 px-6 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="mr-2 text-green-600" />
                Booking Confirmed, pay now!
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );

  if (showPaymentForm && clientSecret) {
    return (
      <div className="flex justify-center items-center gap-10 h-screen">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            onSuccess={() => {
              toast.success('Payment successful!');
              router.push('/booking/success');
            }}
            onError={error => {
              console.log({ error });
              toast.error(error.message || 'Payment failed');
            }}
          />
        </Elements>
      </div>
    );
  }

  return content;
};

export default BookingAvailability;
