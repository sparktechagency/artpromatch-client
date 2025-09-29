'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Checkbox, Form, Steps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const StayUpdated = () => {
  const router = useRouter();
  const [current, setCurrent] = useState<number>(3);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('notificationPreferences');
    if (saved) {
      try {
        setSelectedType(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing lookingFor', e);
      }
    }
  }, []);

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
