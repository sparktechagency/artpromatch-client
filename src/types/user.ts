export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  image: string;
  role: 'CLIENT' | 'ARTIST' | 'BUSINESS' | 'ADMIN' | 'SUPER_ADMIN';
  iat?: number;
  exp?: number;
};

export type TUser = {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  // password: string;
  passwordChangedAt?: Date;
  fcmToken?: string | null;
  image: string;
  // otp: string;
  // otpExpiry: Date;
  role: 'CLIENT' | 'ARTIST' | 'BUSINESS' | 'ADMIN' | 'SUPER_ADMIN';
  isSocialLogin: boolean;
  refreshToken?: string | null;
  isProfile: boolean;
  isVerified: boolean;
  isDeactivated: boolean;
  deactivationReason: string;
  deactivatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
