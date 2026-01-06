'use client';

import { AllImages } from '@/assets/images/AllImages';
import { useUser } from '@/context/UserContext';
import { getFcmToken } from '@/lib/firebase-messaging';
import { signInUser, socialSignIn } from '@/services/Auth';
import { useGoogleLogin } from '@react-oauth/google';
import { Checkbox, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type SignInFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

type SignInWithRedirectPath = {
  redirectPath: string | undefined;
};

const SignInForm: React.FC<SignInWithRedirectPath> = ({ redirectPath }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const router = useRouter();
  const { setIsLoading } = useUser();

  useEffect(() => setIsClient(true), []);

  // handleSignUpUser
  const handleSignInUser = async (values: SignInFormValues) => {
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
      email: values.email,
      password: values.password,
      fcmToken: fcmToken || 'no_fcm_token',
    };

    try {
      const res = await signInUser(userInfo);
      if (res?.success) {
        if (
          res?.message?.toLowerCase().includes('otp') ||
          res?.message?.toLowerCase().includes('verify')
        ) {
          toast.error(res?.message);
          if (res.data.userEmail) {
            localStorage.setItem('userEmail', res.data.userEmail);
          }
          router.push('/account-verification');
        } else {
          setIsLoading(true);
          toast.success(res?.message);
          router.push(redirectPath || '/');
        }
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

  if (!isClient) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="">
          <div className="mb-8 flex flex-col items-center text-center space-y-4">
            <Image src={AllImages.logo} width={60} height={60} alt="logo" />
            <div>
              <h2 className="text-2xl font-semibold text-[#4c3636]">Sign In</h2>
              <p className="text-sm text-black mt-2">
                Sign in if you already have an account.
              </p>
            </div>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleSignInUser}
            layout="vertical"
            className="space-y-3"
          >
            <Form.Item
              name="email"
              label={
                <p className="text-sm font-medium text-gray-500">
                  Enter your email
                </p>
              }
              className="mb-2"
            >
              <Input
                required
                className="h-11 rounded-xl border-[#d7c6c3] text-sm"
                placeholder="slota812@gmail.com"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <p className="text-sm font-medium text-gray-500">
                  Enter your Password
                </p>
              }
              className="mb-2"
            >
              <Input.Password
                required
                className="h-11 rounded-xl border-[#d7c6c3] text-sm"
                placeholder="***********"
              />
            </Form.Item>

            <div className="flex items-center justify-between text-sm">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="mb-0"
                rules={[
                  { required: true, message: 'Please accept the terms first.' },
                ]}
              >
                <Checkbox className=" text-sm text-gray-500">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Link href="/forgot-password">
                <span className="text-sm font-medium text-[#947676]">
                  Forgot Password
                </span>
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#7b5859] py-3 text-base font-semibold text-white transition hover:bg-[#6a4a4b] disabled:opacity-60"
            >
              Continue
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
            Login with Google
          </button>

          <div className="mt-6 text-center text-sm text-[#6d5b5b]">
            Don&apos;t have an Account?
            <Link href="/sign-up" className="pl-2 font-semibold text-[#947676]">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
