"use client";
import { useUpdatePreferenceMutation } from "@/redux/features/profileApi/profileApi";
import { DatePicker, Form, message, Radio, Select } from "antd";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
const PreferecnePage = () => {
  const [updatePreference] = useUpdatePreferenceMutation();

  const UpdatedSelectedArt = JSON.parse(
    localStorage.getItem("UpdatedSelectedArt")
  );
  const selectedPerasing = JSON.parse(localStorage.getItem("selectedPerasing"));

  const onFinish = async (values) => {
    const data = {
      favoriteTattooStyles: UpdatedSelectedArt,
      favoritePiercings: selectedPerasing,
      defaultHomeView: values.defaultHomeView,
      preferredArtistType: values.preferredArtistType,
      language: values.language,
      dateFormat: values.dateFormat,
    };

    try {
      const res = await updatePreference(data).unwrap();
      console.log("res", res);
      message.success(res?.message);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  return (
    <div className="p-5">
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">
            Select Your Favorite Tattoo Styles
          </h1>
          <p className="text-textSecondary">
            Choose the tattoo styles you love the most.
          </p>
        </div>
        <Link href="/user-profile-page/preferences/select-style">
          <IoIosArrowForward className="bg-slate-50 rounded-full h-8 w-8" />
        </Link>
      </div>
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Select Your Favorite Piercings</h1>
          <p className="text-textSecondary">
            Pick the ones that match your vibe.
          </p>
        </div>
        <Link href="/user-profile-page/preferences/piercing">
          <IoIosArrowForward className="bg-slate-50 rounded-full h-8 w-8" />
        </Link>
      </div>

      <Form name="preference" layout="vertical" onFinish={onFinish}>
        <h1 className="text-xl font-bold mb-4">General Preferences</h1>

        <Form.Item
          name="defaultHomeView"
          label={<h1 className="text-textSecondary">Default Home View</h1>}
        >
          <Radio.Group>
            <Radio value="grid">Grid View</Radio>
            <Radio value="map">Map View</Radio>
            <Radio value="both">Both</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="preferredArtistType"
          label={<h1 className="text-textSecondary">Preferred Artist Type</h1>}
        >
          <Radio.Group>
            <Radio value="tattoo">Tattoo Artist</Radio>
            <Radio value="piercers">Piercers</Radio>
            <Radio value="both">Both</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="language"
          label={
            <div>
              <h1 className="">Language</h1>
              <p className="text-textSecondary">
                Set your preferred app language.
              </p>
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
              <p className="text-textSecondary">
                Choose how dates are displayed.
              </p>
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
