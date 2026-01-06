'use client';

import { AllImages } from '@/assets/images/AllImages';
import { forgotPassword } from '@/services/Auth';
import { Form, Input, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => setIsClient(true), []);

  const handleForgotPassword = async (value: any) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(value.email);

      if (res?.success) {
        toast.success(res?.message);
        router.push('/otp');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="rounded-[32px] bg-white px-8 py-10">
          <div className="mb-6 flex flex-col items-center text-center space-y-4">
            <Image src={AllImages.logo} width={60} height={60} alt="logo" />
            <div>
              <h2 className="text-2xl font-semibold text-[#4c3636]">
                Forgot Password
              </h2>
              <Typography.Text className="block text-sm text-[#7a6a6a] mt-2">
                To reset your password, please enter the email address. <br />
                You&apos;ll get the link on your email.
              </Typography.Text>
            </div>
          </div>

          <Form
            name="forgot-password"
            initialValues={{ remember: true }}
            onFinish={handleForgotPassword}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="email"
              label={<p className="text-sm font-medium text-gray-500">Email</p>}
            >
              <Input
                required
                type="email"
                className="h-11 rounded-xl border-[#d7c6c3] text-sm"
                placeholder="Enter your email address"
              />
            </Form.Item>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-primary py-3 text-base font-semibold text-white transition hover:bg-[#6a4a4b] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
