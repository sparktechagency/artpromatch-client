'use client';

import { useEffect, useState } from 'react';
import { AllImages } from '@/assets/images/AllImages';
import { Form, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createProfile } from '@/services/Auth';

interface ProfileData {
  role: string;
  stringLocation: string;
  mainLocation: {
    coordinates: [number, number];
  };
  radius: number;
  favoriteTattoos: string[];
  lookingFor: string[];
  notificationPreferences: string[];
}

const AllSetPage = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const role = localStorage.getItem('role');
    if (!role) {
      toast.error('Please select all profile section!');
      router.push('/user-type-selection');
      return;
    }

    const savedLocation = localStorage.getItem('location');
    if (!savedLocation) {
      toast.error('Please select all profile section!');
      router.push('/user-type-selection');
      return;
    }
    const location = JSON.parse(savedLocation);

    const stringLocation = localStorage.getItem('stringLocation');
    if (!stringLocation) {
      toast.error('Please select all profile section!');
      router.push('/user-type-selection');
      return;
    }

    if (role === 'CLIENT') {
      const savedRadius = localStorage.getItem('radius');
      if (!savedRadius) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }
      const radius = parseInt(savedRadius);

      const savedLookingFor = localStorage.getItem('lookingFor');
      if (!savedLookingFor) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }
      const lookingFor: string[] = JSON.parse(savedLookingFor);

      const savedFavoriteTattoos = localStorage.getItem('favoriteTattoos');
      if (!savedFavoriteTattoos) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }
      const favoriteTattoos: string[] = JSON.parse(savedFavoriteTattoos);

      const savedNotificationPreferences = localStorage.getItem(
        'notificationPreferences'
      );
      if (!savedNotificationPreferences) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }
      const notificationPreferences: string[] = JSON.parse(
        savedNotificationPreferences
      );

      const artistProfileData: ProfileData = {
        role,
        stringLocation,
        mainLocation: {
          coordinates: [location.longitude, location.latitude],
        },
        radius,
        favoriteTattoos,
        lookingFor,
        notificationPreferences,
      };

      setProfileData(artistProfileData);
    }
  }, []);

  const handleAllSetCreateProfile = async () => {
    if (!profileData) {
      toast.error('Please select all profile section!');
      router.push('/user-type-selection');
      return;
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify(profileData));

    try {
      const res = await createProfile(formData);

      if (res?.success) {
        toast.success(res?.message);
        localStorage.clear();
        router.push('/');
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to create profile. Please try again.');
    }
  };

  if (!profileData) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-0 h-screen w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-full">
          <Form
            name="all-set"
            layout="vertical"
            className="w-full bg-white px-4"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                You&apos;re All Set!
              </h2>
              <Typography.Text className="text-center text-base">
                We&apos;re ready to show you personalized recommendations based
                on your preferences.
              </Typography.Text>
            </div>

            <div
              onClick={handleAllSetCreateProfile}
              className="w-full bg-primary text-lg text-white text-center py-2 rounded-lg mt-5"
            >
              {/* {isLoading ? 'Loading...' : 'Continue'} */} Continue
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AllSetPage;
