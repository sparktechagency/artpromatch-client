'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Typography, Radio } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const userRoles = [
  {
    // value: 1,
    label: 'CLIENT',
    description:
      'Discover and book talented artists and piercers near you or worldwide. Save your favorites, explore guest spots, and manage appointments.',
  },
  {
    // value: 2,
    label: 'ARTIST',
    description:
      "Showcase your portfolio, attract clients, and manage bookings. Whether you're a tattoo artist or piercer, we&apos;ve got you covered.",
  },
  {
    // value: 3,
    label: 'BUSINESS',
    description:
      'Promote your business, feature talented artists, and organize events. Perfect for tattoo studios, piercing studios, or related businesses.',
  },
];

const UserTypeSelection = () => {
  const [label, setLabel] = useState<string>('CLIENT');
  const router = useRouter();
  const selectedRole = userRoles.find(role => role.label === label);

  const handleNext = () => {
    if (selectedRole) {
      localStorage.setItem('role', selectedRole.label);
      router.push(`/preference-selection?role=${selectedRole.label}`);
    }
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-[450px]">
          <Form
            name="select-user-type"
            layout="vertical"
            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                How will you use Steady Hands?
              </h2>
              <Typography.Text className="text-center text-base">
                Choose the role that fits you best. You can always expand your
                role later.
              </Typography.Text>
            </div>

            <div className="flex flex-col gap-4">
              <Radio.Group
                onChange={e => setLabel(e.target.value)}
                value={label}
              >
                {userRoles.map(role => (
                  <Radio key={role.label} value={role.label} className="w-full">
                    <div
                      className={`border rounded-lg p-6 mb-5 ${
                        label === role.label
                          ? 'border-blue-500 shadow-md'
                          : 'hover:border-blue-500'
                      }`}
                    >
                      <h1 className="text-xl font-bold">{role.label}</h1>
                      <p className="text-sm text-gray-600">
                        {role.description}
                      </p>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-primary py-2 rounded-lg mt-5"
            >
              <div className="text-lg text-white">Continue</div>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
