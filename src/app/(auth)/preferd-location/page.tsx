'use client';

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, Form, Input, Slider, Steps, Typography } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Maps from '@/components/WithNavFooterComponents/Maps/Maps';
import { toast } from 'sonner';

interface LocationType {
  lat: number;
  lng: number;
}

const PreferedLocation: React.FC = () => {
  const [value, setValue] = useState<number>(8);
  const [current, setCurrent] = useState<number>(0);
  const [location, setLocation] = useState<LocationType | null>(null);
  const router = useRouter();

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        const data = { type: 'Point', coordinates: [latitude, longitude] };

        setLocation({ lat: latitude, lng: longitude });
        localStorage.setItem('location', JSON.stringify(data));
        localStorage.setItem('radius', value.toString());
      },
      err => {
        toast.warning(
          'Failed to get your location. Please allow location access!'
        );
        console.error('Geolocation error:', err.message);
      }
    );
  };

  const handleContinue = () => {
    router.push('/prefered-service');
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-[450px]">
          <Form
            name="select-user-type"
            initialValues={{ remember: true }}
            layout="vertical"
            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                Where do you want to find artists or studios?
              </h2>
              <Typography.Text className="text-center text-base">
                We&apos;ll prioritize results in these areas.
              </Typography.Text>
            </div>

            <Form.Item name="address">
              <Input
                required
                style={{ padding: '6px' }}
                className="text-md"
                placeholder="Enter your address"
              />
            </Form.Item>

            <Form.Item name="location">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="flex justify-center items-center gap-2 text-primary border border-primary w-full py-2 rounded-xl"
              >
                <FaLocationArrow />
                {location ? (
                  <p className="text-sm">
                    {location.lat}, {location.lng}
                  </p>
                ) : (
                  <p className="text-sm">Use my current location</p>
                )}
                {location && <Maps location={location} />}
              </button>

              {/* <Maps location={location} /> */}
            </Form.Item>

            <Form.Item className="text-center">
              <button
                type="button"
                onClick={handleContinue}
                className="bg-primary w-full px-6 py-2 rounded-md text-white"
              >
                Continue
              </button>
              <button className="mt-5" type="button">
                Skip
              </button>
            </Form.Item>

            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    handleColor: '#6b4f38',
                    trackBg: '#6b4f38',
                    railBg: '#e5e7eb',
                    handleSize: 14,
                  },
                },
              }}
            >
              <div className="mt-4">
                <p className="text-gray-700 font-medium">Show results within</p>
                <Slider
                  value={value}
                  min={5}
                  max={100}
                  onChange={val => setValue(val)}
                  tooltip={{ open: false }}
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>5 miles</span>
                  <span>100 Miles</span>
                </div>
                <p className="text-gray-600 text-sm mt-1 text-center">
                  Selected range: {value} miles
                </p>
              </div>
            </ConfigProvider>
          </Form>

          <div className="mt-5">
            <Steps
              current={current}
              onChange={onChange}
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
    </div>
  );
};

export default PreferedLocation;
