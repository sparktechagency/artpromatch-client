'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Checkbox, Form, Steps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const services: string[] = [
  'Tattoos',
  'Custom Designs',
  'Touch-ups',
  'Piercings',
  'Cover-ups',
  'Guest Spots',
];

const PreferdService: React.FC = () => {
  const [current, setCurrent] = useState<number>(2);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Load saved services on mount
  useEffect(() => {
    const saved = localStorage.getItem('lookingFor');
    if (saved) {
      try {
        setSelectedServices(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing lookingFor', e);
      }
    }
  }, []);

  // const handleServiceChange = (newService: string) => {
  //   const updated = selectedServices.includes(newService)
  //     ? selectedServices.filter(service => service !== newService)
  //     : [...selectedServices, newService];

  //   setSelectedServices(updated);
  //   localStorage.setItem('lookingFor', JSON.stringify(updated));
  // };

  const handleServiceChange = (service: string) => {
    setSelectedServices(prev => {
      const updated = prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service];

      // save immediately
      localStorage.setItem('lookingFor', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-[600px]">
          <Form
            name="select-user-type"
            layout="vertical"
            className="mb-10 w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                What services are you looking for?
              </h2>
              <Typography.Text className="text-center text-base">
                Select all that apply.
              </Typography.Text>
            </div>

            {/* Services checkboxes */}
            <div className="flex justify-center items-start gap-20">
              <div className="flex flex-col gap-2">
                {services.slice(0, 3).map(service => (
                  <Checkbox
                    key={service}
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceChange(service)}
                  >
                    {service}
                  </Checkbox>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {services.slice(3).map(service => (
                  <Checkbox
                    key={service}
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceChange(service)}
                  >
                    {service}
                  </Checkbox>
                ))}
              </div>
            </div>

            {/* Continue button */}
            <Link href="/stay-updated">
              <div className="w-full bg-primary text-lg text-white text-center py-2 rounded-lg mt-5 mb-10">
                Get Started
              </div>
            </Link>
          </Form>

          {/* Steps */}
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

export default PreferdService;
