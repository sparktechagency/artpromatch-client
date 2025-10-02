'use client';

import { Form, Radio, Select } from 'antd';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { toast } from 'sonner';

interface PreferenceFormValues {
  defaultHomeView: 'grid' | 'map' | 'both';
  preferredArtistType: 'Tattoo Artist' | 'Piercer' | 'Both';
  language: 'english' | 'spanish';
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
}

const PreferecnePage = () => {
  const onFinish = async (values: PreferenceFormValues) => {
    const UpdatedSelectedArt = JSON.parse(
      localStorage.getItem('UpdatedSelectedArt') || '[]'
    );
    const selectedPerasing = JSON.parse(
      localStorage.getItem('selectedPerasing') || '[]'
    );

    // const data = {
    //   favoriteTattooStyles: UpdatedSelectedArt,
    //   favoritePiercings: selectedPerasing,
    //   defaultHomeView: values.defaultHomeView,
    //   preferredArtistType: values.preferredArtistType,
    //   language: values.language,
    //   dateFormat: values.dateFormat,
    // };

    // console.log("data:", data);

    try {
      // const res = await updatePreference(data).unwrap();
      // console.log('res', res);
      // toast.success(res?.message);
    } catch (error: any) {
      // RTK Query এর error type সাধারণত unknown, তাই any দিয়ে access করা হলো
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="p-5">
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">
            Select Your Favorite Tattoo Styles
          </h1>
          <p className="text-secondary">
            Choose the tattoo styles you love the most.
          </p>
        </div>
        <Link href="/profile/preferences/select-style">
          <IoIosArrowForward className="bg-slate-50 rounded-full h-8 w-8" />
        </Link>
      </div>
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Select Your Favorite Piercings</h1>
          <p className="text-secondary">Pick the ones that match your vibe.</p>
        </div>
        <Link href="/profile/preferences/piercing">
          <IoIosArrowForward className="bg-slate-50 rounded-full h-8 w-8" />
        </Link>
      </div>

      <Form name="preference" layout="vertical" onFinish={onFinish}>
        <h1 className="text-xl font-bold mb-4">General Preferences</h1>

        <Form.Item
          name="defaultHomeView"
          label={<h1 className="text-secondary">Default Home View</h1>}
        >
          <Radio.Group>
            <Radio value="grid">Grid View</Radio>
            <Radio value="map">Map View</Radio>
            <Radio value="both">Both</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="preferredArtistType"
          label={<h1 className="text-secondary">Preferred Artist Type</h1>}
        >
          <Radio.Group>
            <Radio value="Tattoo Artist">Tattoo Artist</Radio>
            <Radio value="Piercer">Piercer</Radio>
            <Radio value="Both">Both</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="language"
          label={
            <div>
              <h1 className="">Language</h1>
              <p className="text-secondary">Set your preferred app language.</p>
            </div>
          }
        >
          <Select placeholder="Select language">
            <Select.Option value="english">English</Select.Option>
            <Select.Option value="spanish">Spanish</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dateFormat"
          label={
            <div>
              <h1 className="">Date Format</h1>
              <p className="text-secondary">Choose how dates are displayed.</p>
            </div>
          }
        >
          <Select placeholder="Select date format">
            <Select.Option value="DD/MM/YYYY">DD/MM/YYYY</Select.Option>
            <Select.Option value="MM/DD/YYYY">MM/DD/YYYY</Select.Option>
            <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end items-end">
            <button
              type="submit"
              className="bg-primary text-white py-3 px-6 rounded-lg clear-start"
            >
              Save
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PreferecnePage;
