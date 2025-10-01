'use client';

import { AllImages } from '@/assets/images/AllImages';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form, Steps, Typography, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const StayUpdated = () => {
  const [form] = Form.useForm();
  const [idCardFrontFile, setIdCardFrontFile] = useState<UploadFile[]>([]);
  const [idCardBackFile, setIdCardBackFile] = useState<UploadFile[]>([]);
  const [selfieWithIdFile, setSelfieWithIdFile] = useState<UploadFile[]>([]);

  const [role, setRole] = useState<string>('');
  const [current, setCurrent] = useState<number>(3);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedRole = localStorage.getItem('role');
    if (!savedRole) {
      try {
        router.push('/user-type-selection');
        return;
      } catch (error) {
        console.error('Error parsing role', error);
      }
    } else {
      setRole(savedRole);
    }

    const savedNotificationPreferences = localStorage.getItem(
      'notificationPreferences'
    );

    if (savedNotificationPreferences) {
      try {
        setSelectedType(JSON.parse(savedNotificationPreferences));
      } catch (e) {
        console.error('Error parsing notificationPreferences', e);
      }
    }
  }, []);

  // handleTypeChange
  const handleTypeChange = (type: string) => {
    setSelectedType(prev => {
      const updated = prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type];

      // save immediately
      localStorage.setItem('notificationPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  // beforeUpload
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      toast.error('You can only upload image files!');
    }

    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isLt5M) {
      toast.error('Image must be smaller than 5MB!');
    }

    return isImage && isLt5M;
  };

  const handleCreateProfile = async (values: any) => {
    if (idCardFrontFile.length === 0) {
      toast.error('Please upload your ID Card Front image!');
      return;
    }
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-full">
          <Form layout="vertical">
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                How would you like to stay updated?
              </h2>
              <Typography.Text className="text-center text-base">
                Choose how we notify you about artists, guest spots, and
                bookings.
              </Typography.Text>
            </div>

            {role === 'CLIENT' ? (
              <div className="flex flex-col gap-4">
                {['app', 'email', 'sms'].map(type => (
                  <Checkbox
                    key={type}
                    checked={selectedType.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  >
                    <label className="flex w-full cursor-pointer">
                      <div className="border hover:border-primary rounded-lg p-6 md:w-96">
                        <h1 className="text-xl font-bold">
                          {type === 'app'
                            ? 'In-App Notifications'
                            : type === 'email'
                            ? 'Email Alerts'
                            : 'Text Messages'}
                        </h1>
                        <p>
                          {type === 'app'
                            ? 'Receive updates when browsing & in app.'
                            : type === 'email'
                            ? 'Get notifications sent to your email.'
                            : 'Stay updated via SMS.'}
                        </p>
                      </div>
                    </label>
                  </Checkbox>
                ))}
              </div>
            ) : role === 'ARTIST' ? (
              <Form
                className="flex justify-center items-center gap-3"
                form={form}
                layout="vertical"
                onFinish={handleCreateProfile}
              >
                {/* ID Card Front Image Upload */}
                <Form.Item
                  label={
                    <span className="font-medium">ID Card Front Image</span>
                  }
                  required
                  className="border border-dotted rounded-xl p-4"
                >
                  <Upload
                    listType="picture-card"
                    fileList={idCardFrontFile}
                    onChange={({ fileList }) => {
                      setIdCardFrontFile(fileList);
                    }}
                    beforeUpload={beforeUpload}
                    maxCount={1}
                    onRemove={() => setIdCardFrontFile([])}
                  >
                    {idCardFrontFile.length === 0 && (
                      <div>
                        <PlusOutlined />
                        <div className="mt-2 text-sm">
                          Upload ID Card Front Image
                        </div>
                      </div>
                    )}
                  </Upload>
                  <p className="text-gray-500 text-sm">
                    Main image that represents your service (5MB max)
                  </p>
                </Form.Item>

                {/* ID Card Back Image Upload */}
                <Form.Item
                  label={
                    <span className="font-medium">ID Card Back Image</span>
                  }
                  required
                  className="border border-dotted rounded-xl p-4"
                >
                  <Upload
                    listType="picture-card"
                    fileList={idCardBackFile}
                    onChange={({ fileList }) => {
                      setIdCardBackFile(fileList);
                    }}
                    beforeUpload={beforeUpload}
                    maxCount={1}
                    onRemove={() => setIdCardBackFile([])}
                  >
                    {idCardBackFile.length === 0 && (
                      <div>
                        <PlusOutlined />
                        <div className="mt-2 text-sm">
                          Upload ID Card Back Image
                        </div>
                      </div>
                    )}
                  </Upload>
                  <p className="text-gray-500 text-sm">
                    Main image that represents your service (5MB max)
                  </p>
                </Form.Item>

                {/* Selfie With ID Image Upload */}
                <Form.Item
                  label={
                    <span className="font-medium">Selfie With ID Image</span>
                  }
                  required
                  className="border border-dotted rounded-xl p-4 flex justify-center items-center"
                >
                  <Upload
                    listType="picture-card"
                    fileList={selfieWithIdFile}
                    onChange={({ fileList }) => {
                      setSelfieWithIdFile(fileList);
                    }}
                    beforeUpload={beforeUpload}
                    maxCount={1}
                    onRemove={() => setSelfieWithIdFile([])}
                  >
                    {selfieWithIdFile.length === 0 && (
                      <div>
                        <PlusOutlined />
                        <div className="mt-2 text-sm">
                          Upload Selfie With ID Image
                        </div>
                      </div>
                    )}
                  </Upload>
                  <p className="text-gray-500 text-sm">
                    Main image that represents your service (5MB max)
                  </p>
                </Form.Item>
              </Form>
            ) : null}

            <Link href="/all-set">
              <div className="w-full bg-primary text-lg text-white text-center py-2 rounded-lg mt-5 mb-10">
                Continue
              </div>
            </Link>
          </Form>

          <Steps
            current={current}
            direction="horizontal"
            size="small"
            items={[
              { title: '', status: 'finish' },
              { title: '', status: current >= 1 ? 'finish' : 'wait' },
              { title: '', status: current >= 2 ? 'finish' : 'wait' },
              { title: '', status: current >= 3 ? 'finish' : 'wait' },
            ]}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
