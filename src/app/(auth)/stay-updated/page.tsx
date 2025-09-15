'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Checkbox, Form, Steps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const StayUpdated = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('notificationPreferences') || '[]'
    );
    setSelectedType(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'notificationPreferences',
      JSON.stringify(selectedType)
    );
  }, [selectedType]);

  const handleTypeChange = (type: string) => {
    setSelectedType(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-[450px]">
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

            <Link href="/all-set">
              <button className="w-full bg-primary text-white py-3 rounded-lg mt-5">
                Continue
              </button>
            </Link>

            <button
              className="w-full mt-5"
              onClick={() => router.push('/all-set')}
            >
              Skip
            </button>
          </Form>

          <Steps
            current={current}
            onChange={setCurrent}
            direction="horizontal"
            size="small"
            items={[{ title: '' }, { title: '' }, { title: '' }, { title: '' }]}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
