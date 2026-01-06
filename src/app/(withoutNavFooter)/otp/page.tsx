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
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="rounded-[32px] bg-white px-8 py-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <Image src={AllImages.logo} width={60} height={60} alt="logo" />
            <div>
              <h1 className="text-3xl font-semibold text-[#4c3636]">
                OTP Verification
              </h1>
              <p className="text-sm text-[#7a6a6a] mt-2">
                To reset you account, please enter the verification code you
                received on your mail.
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col gap-8">
            <div className="flex justify-center">
              <Input.OTP
                value={otp}
                onChange={handleChange}
                length={6}
                size="large"
                className="otp-input-large"
              />
            </div>

            <button
              disabled={isLoading}
              onClick={handleOtpSubmit}
              className="w-full rounded-2xl bg-[#7b5859] py-3 text-base font-semibold text-white transition hover:bg-[#6a4a4b] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>

          <div className="text-center mt-5 text-sm text-[#6d5b5b]">
            <span>Didn&apos;t get the code? </span>
            <button
              onClick={handleSendOtpAgain}
              className="text-[#947676] font-semibold hover:text-[#7b5859] transition cursor-pointer"
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
