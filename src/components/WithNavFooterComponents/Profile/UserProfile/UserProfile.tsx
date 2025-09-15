'use client';

import { useUpdatePersonalInfoMutation } from '@/redux/features/profileApi/profileApi';
import { ConfigProvider, Form, Input, Select } from 'antd';
import React from 'react';

interface UserProfileFormValues {
  fullName: string;
  email: string;
  contactNumber: string;
  country: string;
}

const UserProfile: React.FC = () => {
  const [updatePersonalInfo] = useUpdatePersonalInfoMutation();

  const onFinish = (values: UserProfileFormValues) => {
    console.log('Received values of form:', values);
    // Call your mutation here
    // updatePersonalInfo(values);
  };

  const { Option } = Select;

  return (
    <div className="px-2 md:px-0">
      <ConfigProvider
        theme={{
          components: {
            Form: { borderRadius: 0 },
            Input: { borderRadius: 5 },
          },
        }}
      >
        <Form<UserProfileFormValues>
          name="userProfile"
          initialValues={{}}
          onFinish={onFinish}
          layout="vertical"
          className="my-5"
        >
          <Form.Item
            name="fullName"
            label={<p className="text-md">Full Name</p>}
            rules={[
              { required: true, message: 'Please input your Full Name!' },
            ]}
          >
            <Input placeholder="Your Name" required className="text-md" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<p className="text-md">Email</p>}
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input placeholder="Your Email" required className="text-md" />
          </Form.Item>

          <Form.Item
            name="contactNumber"
            label={<p className="text-md">Contact Number</p>}
            rules={[
              { required: true, message: 'Please input your Contact Number!' },
            ]}
          >
            <Input
              placeholder="Contact Number"
              required
              type="tel"
              className="text-md"
            />
          </Form.Item>

          <Form.Item
            name="country"
            label={<p className="text-md">Country</p>}
            rules={[{ required: true, message: 'Please select your country!' }]}
          >
            <Select placeholder="Select Country">
              <Option value="UK">UK</Option>
              <Option value="USA">USA</Option>
              <Option value="UAE">UAE</Option>
            </Select>
          </Form.Item>

          <Form.Item className="text-end">
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-xl font-bold"
            >
              Save Changes
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default UserProfile;
