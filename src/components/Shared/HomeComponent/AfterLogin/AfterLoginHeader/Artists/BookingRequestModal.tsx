'use client';

import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { requestAServiceBooking } from '@/services/Service';
import { IArtist } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { toast } from 'sonner';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

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
    <div className="bg-white p-6 rounded-xl shadow max-w-lg w-full mx-auto">
      <div className="max-h-[65vh] overflow-y-auto pr-1 pb-24">
        {/* <PaymentElement /> */}
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card'],
          }}
        />
      </div>
      <div className="mt-4 sticky bottom-0 bg-white pt-4 z-10">
        <button
          type="button"
          onClick={handleConfirmPayment}
          className="w-full bg-primary py-3 rounded-lg cursor-pointer"
        >
          <span className="text-white">Pay Now</span>
        </button>
      </div>
    </div>
  );
};

const defaultImg =
  'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png';

const BookingRequestModal = ({
  open,
  artist,
  onClose,
}: {
  open: boolean;
  artist: IArtist | null;
  onClose: () => void;
}) => {
  const router = useRouter();

  const [bookingType, setBookingType] = useState<
    'hourly' | 'day' | 'consultation' | null
  >(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const availableBookingTypes = useMemo(() => {
    const types: Array<'hourly' | 'day' | 'consultation'> = ['hourly'];

    if (artist?.dayRate != null) {
      types.push('day');
    }

    if (artist?.consultationFee != null) {
      types.push('consultation');
    }

    return types;
  }, [artist]);

  const images = useMemo(() => {
    const merged = [
      ...(artist?.flashImages ?? []),
      ...(artist?.portfolioImages ?? []),
    ]
      .map(s => (typeof s === 'string' ? s.trim() : ''))
      .filter(Boolean);

    const unique = Array.from(new Set(merged));

    return unique.length > 0 ? unique : [artist?.auth?.image || defaultImg];
  }, [artist]);

  useEffect(() => {
    if (!open) return;

    const first = images[0] || '';
    setSelectedImage(first);
    setSelectedImageIndex(0);
    setBookingType(availableBookingTypes[0] ?? null);

    setShowPaymentForm(false);
    setClientSecret('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const idx = Math.max(0, images.indexOf(selectedImage));
    setSelectedImageIndex(idx);
  }, [images, open, selectedImage]);

  const prevImage = () => {
    if (images.length <= 1) return;
    const nextIndex =
      selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(images[nextIndex] || '');
  };

  const nextImage = () => {
    if (images.length <= 1) return;
    const nextIndex =
      selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(images[nextIndex] || '');
  };

  const handleRequestBooking = async () => {
    if (!artist?._id) return;

    if (!bookingType || !availableBookingTypes.includes(bookingType)) {
      toast.warning('Please select a booking type');
      return;
    }

    if (!selectedImage) {
      toast.warning('Please select an image');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        artistId: artist._id,
        image: selectedImage,
        bookingType,
      };

      const res = await requestAServiceBooking(payload);

      if (res?.success) {
        toast.success(res?.message);

        if (res?.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
          setShowPaymentForm(true);
        } else {
          onClose();
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      centered
      width={900}
      destroyOnHidden
    >
      {showPaymentForm && clientSecret ? (
        <div className="p-5">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              onSuccess={() => {
                toast.success('Payment successful!');
                onClose();
                setShowPaymentForm(false);
                setClientSecret('');
                router.push('/booking/success');
              }}
              onError={error => {
                toast.error(error?.message || 'Payment failed');
              }}
            />
          </Elements>
        </div>
      ) : (
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Request a Booking</h2>
              <p className="text-sm text-slate-500">
                Choose booking type and select an image
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden bg-slate-100 relative">
              <Image
                src={getCleanImageUrl(selectedImage)}
                alt="booking image"
                width={1200}
                height={800}
                className="w-full h-[420px] object-cover"
              />

              {images.length > 1 && (
                <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex items-center gap-3 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow">
                  <button
                    type="button"
                    onClick={prevImage}
                    className="h-9 w-9 flex items-center justify-center rounded-full border bg-white hover:bg-slate-50 cursor-pointer"
                    aria-label="Previous"
                  >
                    <FaChevronLeft />
                  </button>

                  <div className="text-sm font-medium tabular-nums">
                    {String(selectedImageIndex + 1).padStart(2, '0')}
                  </div>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="h-9 w-9 flex items-center justify-center rounded-full border bg-white hover:bg-slate-50 cursor-pointer"
                    aria-label="Next"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">
                Booking Type
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableBookingTypes.map(t => {
                  const selected = bookingType === t;
                  const title =
                    t === 'hourly'
                      ? 'Hourly'
                      : t === 'day'
                      ? 'Day'
                      : 'Consultation';
                  const price =
                    t === 'hourly'
                      ? artist?.hourlyRate
                      : t === 'day'
                      ? artist?.dayRate
                      : artist?.consultationFee;
                  const suffix =
                    t === 'hourly' ? '/hr' : t === 'day' ? '/day' : '';

                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBookingType(t)}
                      className={`w-full text-left rounded-2xl border p-4 transition cursor-pointer ${
                        selected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {title}
                          </div>
                          <div className="mt-1 text-sm text-slate-600">
                            {typeof price === 'number'
                              ? `$${price}${suffix}`
                              : 'N/A'}
                          </div>
                        </div>

                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                            selected
                              ? 'bg-primary border-primary text-white'
                              : 'bg-white border-slate-200 text-transparent'
                          }`}
                          aria-hidden
                        >
                          <FaCheck className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  Selected Image
                </div>
                <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={getCleanImageUrl(selectedImage)}
                    alt="selected"
                    width={1200}
                    height={800}
                    className="w-full h-[160px] object-cover"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleRequestBooking}
                className="w-full mt-6! text-white! py-3 rounded-xl bg-primary font-semibold hover:bg-primary/90 transition disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Request Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookingRequestModal;
