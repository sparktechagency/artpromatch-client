import { IArtist } from './artist';
import { IClient } from './client';
import { IService } from './service';

export interface IBooking {
  _id: string;
  artist: IArtist;
  client: IClient;
  service: IService;

  preferredDate?: {
    startDate: Date;
    endDate: Date;
  };

  demoImage: string;
  clientInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  artistInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  sessions: IBookingSession[];
  scheduledDurationInMin: number;
  // Booking-level status
  status: TBookingStatus;

  serviceName: string;
  price: number;
  bodyPart: string;

  // Payment (global, not per session)
  payment: IPayment;
  checkoutSessionId?: string;

  artistEarning: number;
  paymentStatus: TPaymentStatus;

  stripeFee: number;
  platFormFee: number;
  // If booking cancelled (by artist usually)
  cancelledAt?: Date | null;
  cancelBy?: 'ARTIST' | 'CLIENT';
  // Review and rating
  review?: string;
  rating?: number;

  isInGuestSpot: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IBookingSession {
  _id?: string;
  sessionNumber: number;
  startTime: string;
  endTime: string;
  startTimeInMin?: number;
  endTimeInMin?: number;
  date: Date;
  status: TSessionStatus;
}

type TBookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'ready_for_completion'
  | 'completed'
  | 'cancelled';

type TSessionStatus = 'pending' | 'scheduled' | 'rescheduled' | 'completed';

interface IPaymentClient {
  chargeId?: string;
  paymentIntentId?: string;
  refundId?: string;
}

interface IPaymentArtist {
  transferId?: string;
  transactionId?: string;
  payoutId?: string;
}

interface IPayment {
  client: IPaymentClient;
  artist: IPaymentArtist;
}

type TPaymentStatus =
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'succeeded'
  | 'refunded'
  | 'failed';
