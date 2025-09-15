'use client';

import { AllImages } from '@/assets/images/AllImages';
import { registerUser } from '@/services/AuthService';
import { Form, Input, Button, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  type SignUpFormValues = {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
  };

  const onFinish = async (values: SignUpFormValues) => {
    setIsLoading(true);

    const userInfo = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };

    try {
      const res = await registerUser(userInfo);

      if (res.success) {
        toast.success(res?.message);
        if (res.data.userEmail) {
          localStorage.setItem('userEmail', res.data.userEmail);
        }
        router.push('/account-verification');
      } else {
        toast.error(res.message);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked');
  };

  return (
    <div className="container mx-auto my-10 md:my-40">
      <div className="flex justify-center items-center">
        <div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 550 }}
            onFinish={onFinish}
            layout="vertical"
            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image
                src={AllImages.logo}
                width={50}
                height={50}
                alt="logo"
              ></Image>
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                Create Account
              </h2>
              <Typography.Text className=" text-center text-base ">
                Register for Your Account Instantly!
              </Typography.Text>
            </div>

            <Form.Item
              name="fullName"
              label={<p className=" text-md">Enter your Full Name</p>}
            >
              <Input
                required
                style={{ padding: '6px' }}
                className="text-md"
                placeholder="Olivia Reiss"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={<p className=" text-md">Enter your email</p>}
            >
              <Input
                required
                style={{ padding: '6px' }}
                className="text-md"
                placeholder="oliviareiss91@gmail.com"
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label={<p className=" text-md">Enter your Phone Number</p>}
            >
              <Input
                required
                style={{ padding: '6px' }}
                className="text-md"
                placeholder="oliviareiss91@gmail.com"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={
                <p className=" text-md">
                  Choose a password with at least 8 characters.
                </p>
              }
            >
              <Input
                required
                style={{ padding: '6px' }}
                className="text-md"
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <p className=" text-center mb-5">
              Already have an Account?
              <Link href="/sign-in" className=" pl-2">
                Sign In
              </Link>
            </p>
            <Form.Item className="text-center">
              <button
                className="bg-primary w-full px-6 py-2 rounded-md text-white"
                type="submit"
                disabled={isLoading}
              >
                Create Account
              </button>
            </Form.Item>
            <p className="text-center my-6"> Or Sign up with</p>
            <Form.Item className="text-center">
              <Button
                className="border w-full px-6 py-2 rounded-md text-primary flex justify-center items-center gap-5"
                // htmlType="submit"
              >
                <Image
                  src={AllImages.google}
                  width={20}
                  height={20}
                  alt="logo"
                ></Image>
                Login with Google
              </Button>
            </Form.Item>
            {/* <SocialLogin /> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
