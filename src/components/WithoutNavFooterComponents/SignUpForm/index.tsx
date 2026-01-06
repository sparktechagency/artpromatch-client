'use client';

import { AllImages } from '@/assets/images/AllImages';
import { signUpUser, socialSignIn } from '@/services/Auth';
import { Form, Input, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google';
import { getFcmToken } from '@/lib/firebase-messaging';
import { useUser } from '@/context/UserContext';

const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();
  const { setIsLoading } = useUser();

  useEffect(() => setIsClient(true), []);

  type SignUpFormValues = {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  };

  // handleSignUpUser
  const handleSignUpUser = async (values: SignUpFormValues) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);

    let fcmToken: string | null = null;

    // Try to get notification permission & token
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        fcmToken = await getFcmToken();
      } else {
        console.warn('User denied notification permission');
      }
    } catch (err) {
      console.error('Error while requesting notification permission:', err);
    }

    const userInfo = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      fcmToken: fcmToken || 'no_fcm_token',
    };

    try {
      const res = await signUpUser(userInfo);

      if (res?.success) {
        toast.success(res?.message);
        if (res.data.userEmail) {
          localStorage.setItem('userEmail', res.data.userEmail);
        }
        router.push('/account-verification');
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error(err);
    }
  };

  // googleLogin
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: { access_token: string }) => {
      try {
        // Bring Google user info
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL}`,
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const userData = await response.json();

        let fcmToken: string | null = null;

        // Try to get notification permission & token
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            await navigator.serviceWorker.register('/firebase-messaging-sw.js');

            fcmToken = await getFcmToken();
          } else {
            console.warn('User denied notification permission');
          }
        } catch (err) {
          console.error('Error while requesting notification permission:', err);
        }

        const payload = {
          email: userData.email,
          fcmToken: fcmToken || 'no_fcm_token',
          image: userData.picture,
          fullName: userData.name,
          phoneNumber: '+14155556666', // fallback
          address: '123 Main St, Springfield, IL',
        };

        const res = await socialSignIn(payload);

        if (res?.success) {
          toast.success(res?.message);
          setIsLoading(true);
          router.push('/');
        } else {
          toast.error(res?.message || 'Google login failed');
        }
      } catch (error) {
        console.error(error);
        toast.error('Google login failed');
      }
    },
    onError: () => toast.error('Google Login Failed'),
  });

  const passwordRules = [
    { required: true, message: 'Please enter your password' },
    { min: 8, message: 'Password must be at least 8 characters long' },
    { max: 20, message: 'Password cannot exceed 20 characters' },
    {
      validator: (_: any, value: string) => {
        if (!value) return Promise.resolve();
        if (!/[A-Z]/.test(value))
          return Promise.reject(
            'Password must contain at least one uppercase letter'
          );
        if (!/[a-z]/.test(value))
          return Promise.reject(
            'Password must contain at least one lowercase letter'
          );
        if (!/[0-9]/.test(value))
          return Promise.reject('Password must contain at least one number');
        if (!/[@$!%*?&#]/.test(value))
          return Promise.reject(
            'Password must contain at least one special character'
          );
        return Promise.resolve();
      },
    },
  ];

  if (!isClient) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="">
          <div className="mb-8 flex flex-col items-center text-center space-y-4">
            <Image src={AllImages.logo} width={60} height={60} alt="logo" />
            <div>
              <h2 className="text-2xl font-semibold text-[#4c3636]">
                Create Account
              </h2>
              <Typography.Text className="block text-sm text-[#7a6a6a] mt-2">
                Register for Your Account Instantly!
              </Typography.Text>
            </div>
          </div>

          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={handleSignUpUser}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="fullName"
              label={
                <p className="text-sm font-medium text-gray-500">
                  Enter your full name.
                </p>
              }
              rules={[
                { required: true, message: 'Please input your full name!' },
                { type: 'string', message: 'Please enter a valid full name!' },
              ]}
            >
              <Input
                required
                className="h-11 rounded-xl border-[#d7c6c3] text-sm"
                placeholder="Olivia Reiss"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                <p className="text-sm font-medium text-gray-500">
                  Enter your email to get started.
                </p>
              }
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                className="h-11 rounded-xl border-[#d7c6c3] text-sm"
                placeholder="slota812@gmail.com"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label={
                <p className="text-sm font-medium text-gray-500">
                  Enter your phone number
                </p>
              }
              rules={[
                { required: true, message: 'Please input your phone number!' },
                {
                  pattern: /^[+]*[0-9]{7,15}$/,
                  message:
                    'Please enter a valid phone number with country code!',
                },
              ]}
            >
              <Input
                className="h-11 rounded-xl border-[#d7c6c3] text-sm"
                placeholder="+12 3456789"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <p className="text-sm font-medium text-gray-500">
                  Choose a password with at least 8 characters.
                </p>
              }
              rules={passwordRules}
            >
              <Input.Password
                className="h-11 rounded-xl border-[#d7c6c3] text-sm"
                placeholder="***********"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={
                <p className="text-sm font-medium text-gray-500">
                  Confirm password
                </p>
              }
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                className="h-11 rounded-xl border-[#d7c6c3] text-sm"
                placeholder="***********"
              />
            </Form.Item>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#7b5859] py-3 text-base font-semibold text-white transition hover:bg-[#6a4a4b] disabled:opacity-60"
            >
              Create Account
            </button>
          </Form>

          <div className="mt-8 flex items-center gap-4 text-sm text-[#a38f8f]">
            <span className="h-px flex-1 bg-[#f0e5e3]" />
            or sign up with
            <span className="h-px flex-1 bg-[#f0e5e3]" />
          </div>

          <button
            type="button"
            onClick={() => googleLogin()}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#c8b4b2] py-3 text-sm font-medium text-[#403131] transition hover:bg-[#fdf5f3]"
          >
            <Image src={AllImages.google} width={20} height={20} alt="Google" />
            Sign Up with Google
          </button>

          <div className="mt-6 text-center text-sm text-[#6d5b5b]">
            Already have an account?
            <Link href="/sign-in" className="pl-2 font-semibold text-[#947676]">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
