'use client';

import { Input } from 'antd';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  sendForgotPasswordOtpAgain,
  verifyOtpForForgotPassword,
} from '@/services/Auth';

const OtpPage = () => {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // handleChange
  const handleChange = (value: string) => {
    setOtp(value);
  };

  // handleOtpSubmit
  const handleOtpSubmit = async () => {
    if (!otp || otp.length < 6) {
      toast.error('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);

    try {
      const res = await verifyOtpForForgotPassword(otp);

      if (res?.success) {
        toast.success(res?.message);
        router.push('/new-password');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // handleSendOtpAgain
  const handleSendOtpAgain = async () => {
    try {
      const res = await sendForgotPasswordOtpAgain();

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="mx-4 md:mx-0 w-auto md:w-[600px]">
        <div className="py-10 px-5 md:px-14 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col justify-center items-center">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <h1 className="text-3xl text-center font-bold py-5">
              OTP Verification
            </h1>
            <p className="text-center text-gray-600">
              Please enter the verification code sent to your email.
            </p>
          </div>

          <div className="flex justify-center pt-5">
            <Input.OTP
              value={otp}
              onChange={handleChange}
              className="w-full max-w-sm"
              length={6}
            />
          </div>

          <button
            disabled={isLoading}
            onClick={handleOtpSubmit}
            className="bg-primary text-white py-3 rounded-xl w-full mt-10 hover:bg-blue-700 transition"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="text-center mt-5">
            <span>Didn&apos;t get the code? </span>
            <button
              onClick={handleSendOtpAgain}
              className="text-primary underline hover:text-blue-600 transition"
            >
              Send Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
