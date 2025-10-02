'use client';

import { AllImages } from '@/assets/images/AllImages';
import { setNewPassword } from '@/services/Auth';
import { Form, Input, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const NewPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleNewPassword = async (values: any) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await setNewPassword(password);

      if (res?.success) {
        toast.success(res?.message);
        router.push('/sign-in');
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRules = [
    { required: true, message: 'Please enter your new password' },
    { min: 6, message: 'New password must be at least 6 characters long' },
    { max: 20, message: 'New password cannot exceed 20 characters' },
    {
      validator: (_: any, value: string) => {
        if (!value) return Promise.resolve();
        if (!/[A-Z]/.test(value))
          return Promise.reject(
            'New password must contain at least one uppercase letter'
          );
        if (!/[a-z]/.test(value))
          return Promise.reject(
            'New password must contain at least one lowercase letter'
          );
        if (!/[0-9]/.test(value))
          return Promise.reject(
            'New password must contain at least one number'
          );
        if (!/[@$!%*?&#]/.test(value))
          return Promise.reject(
            'New password must contain at least one special character'
          );
        return Promise.resolve();
      },
    },
  ];

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16 w-full max-w-md">
        <Form
          name="new-password"
          onFinish={handleNewPassword}
          layout="vertical"
          className="w-full"
        >
          <div className="mb-6 flex flex-col justify-center items-center text-center">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <h2 className="text-2xl font-bold mt-6 mb-2 text-primary">
              Set New Password
            </h2>
            <Typography.Text className="text-center text-base text-gray-600">
              Enter your new password below to reset your account password.
            </Typography.Text>
          </div>

          <Form.Item name="password" label="New Password" rules={passwordRules}>
            <Input.Password placeholder="Enter new password" />
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

          <Form.Item className="text-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary py-3 rounded-lg text-white text-lg"
            >
              {isLoading ? 'Updating...' : 'Set Password'}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
