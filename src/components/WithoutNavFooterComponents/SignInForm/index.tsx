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
        setIsLoading(true);
        toast.success(res?.message);
        router.push(redirectPath || '/');
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
    <div className="container mx-auto my-10 md:my-40">
      <div className="flex justify-center items-center">
        <div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleSignInUser}
            layout="vertical"
            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                Sign In
              </h2>
              <div className="text-center text-base">
                Sign in if you already have an account.
              </div>
            </div>

            <Form.Item
              name="email"
              label={<p className=" text-md">Enter your email</p>}
              style={{}}
            >
              <Input
                required
                style={{ padding: '6px' }}
                className=" text-md"
                placeholder="slota812@gmail.com"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<p className=" text-md">Enter your Password</p>}
            >
              <Input.Password
                required
                style={{ padding: '6px' }}
                className=" text-md"
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox required className="text-md hover: text-md">
                    Accept terms of services
                  </Checkbox>
                </Form.Item>
                <p className=" text-primary">
                  <Link href="/forgot-password">Forgot Password</Link>
                </p>
              </div>
            </Form.Item>

            <Form.Item className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary w-full px-6 py-2 rounded-md"
              >
                <span className="text-white">Continue</span>
              </button>
            </Form.Item>
          </Form>
          <p className="text-center my-6 text-sm"> Or Sign in With</p>
          {/* <GooleLogin /> */}
          <div className="text-center">
            <div
              onClick={() => googleLogin()}
              className="border w-full px-6 py-2 rounded-md text-primary flex justify-center items-center gap-5"
            >
              <Image src={AllImages.google} width={20} height={20} alt="logo" />
              Login with Google
            </div>
          </div>

          <div className="text-center text-sm my-5">
            Don&apos;t have an Account?
            <Link href="/sign-up" className="text-blue-600 font-medium pl-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
