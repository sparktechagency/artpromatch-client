'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import { useRouter } from 'next/navigation';
import { Flex, Input } from 'antd';
import { sendSignupOtpAgain, verifySignUpByOTP } from '@/services/AuthService';
import { toast } from 'sonner';

const AccountVerification: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      router.push('/sign-up');
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const onChange = (value: string) => {
    setOtp(value);
  };

  const handleSubmit = async () => {
    if (!otp) {
      toast.warning('Please enter the OTP.');
      return;
    }

    try {
      const res = await verifySignUpByOTP(userEmail!, otp);

      if (res.success) {
        toast.success(res.message);
        router.push('/user-type-selection');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await sendSignupOtpAgain(userEmail!);

      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  if (!userEmail) return null; // ✅ prevent UI flash before redirect

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="mx-4 md:mx-0 w-auto md:w-[600px]">
        <div className="py-10 px-5 md:px-14">
          <div className="flex flex-col justify-center items-center">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <h1 className="text-3xl text-center font-bold py-5">
              Account Verification
            </h1>
            <p className="text-center">
              To verify your account, please enter the verification code you
              received on your phone.
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Flex gap="middle" align="flex-start" vertical>
              <Input.OTP
                value={otp}
                onChange={onChange}
                formatter={str => str.toUpperCase()}
              />
            </Flex>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-3 rounded-xl w-full mt-10"
          >
            Send
          </button>

          <p className="text-center mt-5">
            Didn&apos;t get the code?{' '}
            <span
              onClick={handleResendOtp}
              className="text-primary cursor-pointer"
            >
              Send Again
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
