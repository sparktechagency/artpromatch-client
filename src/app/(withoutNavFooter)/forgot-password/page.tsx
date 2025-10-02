'use client';

import { AllImages } from '@/assets/images/AllImages';
import { forgotPassword } from '@/services/Auth';
import { Form, Input, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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
  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
      <div className="pt-32 pb-16">
        <div className="">
          <div className="w-[450px]">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleForgotPassword}
              layout="vertical"
              className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
            >
              <div className="mb-4 flex flex-col justify-center items-center text-center">
                <Image src={AllImages.logo} width={50} height={50} alt="logo" />
                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                  Forgot Password
                </h2>
                <Typography.Text className=" text-center text-base ">
                  To reset your password, please enter the email address.
                  You&apos;ll get the link on your email.
                </Typography.Text>
              </div>

              <Form.Item
                name="email"
                label={<p className=" text-md">Enter your email</p>}
              >
                <Input
                  required
                  type="email"
                  style={{ padding: '6px' }}
                  className=" text-md"
                  placeholder="slota812@gmail.com"
                />
              </Form.Item>

              <Form.Item className="text-center">
                <button
                  disabled={isLoading}
                  className="w-full bg-primary text-center py-2 rounded-lg mt-5"
                  type="submit"
                >
                  <span className="text-lg text-white">
                    {isLoading ? 'Running...' : 'Continue'}
                  </span>
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
