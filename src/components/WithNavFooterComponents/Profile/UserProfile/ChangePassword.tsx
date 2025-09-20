'use client';

import { useUser } from '@/context/UserContext';
import { changePassword } from '@/services/Auth';
import { ConfigProvider, Form, Input } from 'antd';
import { toast } from 'sonner';

interface ChangePasswordFormValues {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const { user, setIsLoading } = useUser();

  const [form] = Form.useForm<ChangePasswordFormValues>();

  const handleChangePassword = async (values: ChangePasswordFormValues) => {
    const userInfo = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
    };

    try {
      const res = await changePassword(userInfo);

      if (res?.success) {
        toast.success(res?.message);
        setIsLoading(true);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <ConfigProvider
        theme={{
          components: {
            Form: {
              borderRadius: 0,
            },
            Input: {
              borderRadius: 5,
            },
          },
        }}
      >
        <Form<ChangePasswordFormValues>
          form={form}
          name="changePassword"
          initialValues={{
            email: user?.email,
          }}
          onFinish={handleChangePassword}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input readOnly placeholder="Your Email" className="p-2" />
          </Form.Item>

          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              { required: true, message: 'Please input your old password!' },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Old Password"
              className="p-2"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please input your new password!' },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="New Password"
              className="p-2"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Confirm Password"
              className="p-2"
            />
          </Form.Item>

          <Form.Item className="text-end">
            <button
              type="submit"
              className="px-5 py-2 bg-primary rounded-xl font-bold"
            >
              <span className="text-white"> Update</span>
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ChangePassword;
