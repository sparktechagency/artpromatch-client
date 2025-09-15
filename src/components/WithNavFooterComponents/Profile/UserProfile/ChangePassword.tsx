import { ConfigProvider, Form, Input } from 'antd';
import React from 'react';

interface ChangePasswordValues {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const onFinish = (values: ChangePasswordValues) => {
    console.log(values);
  };

  return (
    <div>
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
        <Form
          name="change-password"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Email */}
          <Form.Item
            name="email"
            label={<p className="text-md">Email</p>}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              style={{ padding: '6px' }}
              className="text-md"
              placeholder="Your Email"
              type="email"
            />
          </Form.Item>

          {/* Old Password */}
          <Form.Item
            name="oldPassword"
            label={<p className="text-md">Old Password</p>}
            rules={[
              { required: true, message: 'Please input your old password!' },
            ]}
          >
            <Input
              required
              style={{ padding: '6px' }}
              className="text-md"
              type="password"
              placeholder="Old Password"
            />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            name="newPassword"
            label={<p className="text-md">New Password</p>}
            rules={[
              { required: true, message: 'Please input your new password!' },
            ]}
          >
            <Input
              required
              style={{ padding: '6px' }}
              className="text-md"
              type="password"
              placeholder="New Password"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label={<p className="text-md">Confirm Password</p>}
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
            <Input
              required
              style={{ padding: '6px' }}
              className="text-md"
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item className="text-end">
            <button
              className="px-5 py-2 bg-primary text-white rounded-xl font-bold "
              type="submit"
            >
              Update
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ChangePassword;
