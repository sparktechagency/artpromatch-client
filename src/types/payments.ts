export interface IPayment {
  _id: string;
  artistEarning: number;
  artistInfo: {
    fullName: string;
    email: string;
    phone: string;
  };

  clientInfo: {
    fullName: string;
    email: string;
    phone: string;
  };

  createdAt: Date;

  paymentStatus: string;
  platFormFee: number;
  price: number;
  serviceName: string;
  status: string;
  stripeFee: number;
}
