'use client';

import React from 'react';
import { AllImages } from '@/assets/images/AllImages';
// import { useCreateProfileMutation } from '@/redux/features/auth/authApi';
import { Form, message, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AllSet: React.FC = () => {
  const router = useRouter();

  // Retrieve and parse localStorage data
  const favoriteTattoos: string[] = JSON.parse(
    localStorage.getItem('favoriteTattoos') || '[]'
  );

  const location = {
    latitude: parseFloat(localStorage.getItem('latitude') || '0'),
    longitude: parseFloat(localStorage.getItem('longitude') || '0'),
  };

  const radius = parseInt(localStorage.getItem('radius') || '0', 10);

  const lookingFor: string[] = JSON.parse(
    localStorage.getItem('lookingFor') || '[]'
  );

  const notificationPreferences: string[] = JSON.parse(
    localStorage.getItem('notificationPreferences') || '[]'
  );

  const role = localStorage.getItem('role') || 'user';

  const profileData = {
    role,
    favoriteTattoos,
    location: {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
    },
    radius,
    lookingFor,
    notificationPreferences,
  };

  // const [createProfile, { isLoading }] = useCreateProfileMutation();
  const token = localStorage.getItem('token');

  const handleAllSet = async () => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(profileData));

      // const res = await createProfile(formData).unwrap();
      message.success('Profile created successfully!');
      router.push('/sign-in');
    } catch (err) {
      console.error(err);
      message.error('Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
      <div className="pt-32 pb-16">
        <div className="">
          <div className="w-[450px]">
            <Form
              name="select-user-type"
              initialValues={{ remember: true }}
              layout="vertical"
              className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
            >
              <div className="mb-4 flex flex-col justify-center items-center text-center">
                <Image
                  src={AllImages.logo}
                  width={50}
                  height={50}
                  alt="logo"
                ></Image>
                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                  You're All Set!
                </h2>
                <Typography.Text className=" text-center text-base ">
                  We&apos;re ready to show you personalized recommendations
                  based on your preferences.
                </Typography.Text>
              </div>

              {
                <button
                  type="button"
                  onClick={handleAllSet}
                  className="w-full bg-primary text-white py-3 rounded-lg mt-5"
                >
                  {/* {isLoading ? 'Loading...' : 'Continue'} */} continue
                </button>
              }
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSet;
