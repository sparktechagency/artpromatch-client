'use client';

import { useUser } from '@/context/UserContext';
import { updateAuthData } from '@/services/Auth';
import { ConfigProvider, Form, Input } from 'antd';
import { toast } from 'sonner';

interface UserProfileFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  // country: string;
  stringLocation: string;
}

const UserProfile = () => {
  const { user, setIsLoading } = useUser();
  const [form] = Form.useForm<UserProfileFormValues>();

  const handleUpdateData = async (values: UserProfileFormValues) => {
    try {
      const res = await updateAuthData({
        fullName: values.fullName,
        stringLocation: values.stringLocation,
      });

      if (res?.success) {
        toast.success(res?.message);
        setIsLoading(true);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="px-2 md:px-0">
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
        <Form<UserProfileFormValues>
          form={form}
          name="personalInfo"
          initialValues={{
            fullName: user?.fullName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            stringLocation: user?.stringLocation,
          }}
          onFinish={handleUpdateData}
          layout="vertical"
          className="my-5"
        >
          <Form.Item
            name="fullName"
            label={<p className=" text-md">Full Name</p>}
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input
              style={{ padding: '6px' }}
              className=" text-md"
              placeholder="Your Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<p className=" text-md">Email</p>}
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input
              readOnly
              style={{ padding: '6px' }}
              className=" text-md"
              placeholder="Your Email"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label={<p className=" text-md">Contact Number</p>}
            rules={[
              {
                required: true,
                message: 'Please input your phone number with country code!',
              },
              {
                pattern: /^[+]*[0-9]{7,15}$/,
                message: 'Please enter a valid phone number!',
              },
            ]}
          >
            <Input
              readOnly
              style={{ padding: '6px' }}
              className="text-md"
              placeholder="Contact Number"
            />
          </Form.Item>

          <Form.Item
            name="stringLocation"
            label={<p className=" text-md">Address</p>}
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input
              style={{ padding: '6px' }}
              className=" text-md"
              placeholder="Your Address"
            />
          </Form.Item>

          {/* <Form.Item
            name="country"
            label={<p className=" text-md">Country</p>}
            rules={[{ required: true, message: 'Please select your country' }]}
          >
            <Select placeholder="Select Country">
              <Option value="UAE">UAE </Option>
              <Option value="UK">UK </Option>
              <Option value="USA">USA </Option>
            </Select>
          </Form.Item> */}

          <Form.Item className="text-end">
            <button
              type="submit"
              className="px-5 py-2 bg-primary rounded-xl font-bold"
            >
              <span className="text-white">Save Changes</span>
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default UserProfile;
