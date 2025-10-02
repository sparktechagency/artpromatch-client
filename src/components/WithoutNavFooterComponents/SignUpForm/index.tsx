'use client';

import { AllImages } from '@/assets/images/AllImages';
import { signUpUser, socialSignIn } from '@/services/Auth';
import { Form, Input, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google';
import { getFcmToken } from '@/lib/firebase-messaging';
import { useUser } from '@/context/UserContext';

const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setIsLoading } = useUser();

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

  return (
    <div className="container mx-auto my-10 md:my-40">
      <div className="flex justify-center items-center">
        <div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 550 }}
            onFinish={handleSignUpUser}
            layout="vertical"
            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
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
              <Input required placeholder="Olivia Reiss" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Enter your Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="slota812@gmail.com" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Enter your Phone Number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                {
                  pattern: /^[+]*[0-9]{7,15}$/,
                  message: 'Please enter a valid phone number!',
                },
              ]}
            >
              <Input placeholder="+14155556666" />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <p className="text-md">
                  Choose a password with at least 8 characters.
                </p>
              }
              rules={passwordRules}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
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
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>

            <Form.Item className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary w-full px-6 py-2 rounded-md"
              >
                <span className="text-white">Create Account</span>
              </button>
            </Form.Item>
          </Form>
          <p className="text-center my-6 text-sm"> Or Sign up with</p>
          {/* <SocialLogin /> */}
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
            Already have an Account?
            <Link href="/sign-in" className="text-blue-600 font-medium pl-2">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
