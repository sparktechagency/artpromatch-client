export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  stringLocation: string;
  image: string;
  role: 'CLIENT' | 'ARTIST' | 'BUSINESS' | 'ADMIN' | 'SUPER_ADMIN';
  isProfile: boolean;
  isActive: boolean;
  iat?: number;
  exp?: number;
};

export type TAuth = {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  // fcmToken?: string | null;
  image: string;
  // otp: string;
  // otpExpiry: Date;
  role: 'CLIENT' | 'ARTIST' | 'BUSINESS' | 'ADMIN' | 'SUPER_ADMIN';
  isSocialLogin: boolean;
  isVerifiedByOTP: boolean;
  isProfile: boolean;
  isActive: boolean;
  isDeleted: boolean;
  isDeactivated: boolean;
  deactivationReason: string;
  deactivatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
