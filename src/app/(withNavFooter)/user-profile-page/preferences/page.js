"use client";
import { DatePicker, Radio, Select } from "antd";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
const PreferecnePage = () => {
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
      <h1 className="text-xl font-bold">General Preferences</h1>
      <div className="mb-4 border-0 border-b border-neutral-200 pb-4">
        <h1 className="text-textSecondary">Default Home View</h1>
        <Radio value={1}>Grid View</Radio>
        <Radio value={1}>Map View</Radio>
        <Radio value={1}>Both</Radio>
      </div>
      <div className="mb-4 border-0 border-b border-neutral-200 pb-4">
        <h1 className="text-textSecondary">Preferred Artist Type</h1>
        <Radio value={1}>Tattoo Artist</Radio>
        <Radio value={1}>Piercers</Radio>
        <Radio value={1}>Both</Radio>
      </div>
      <div className="border-0 border-b border-neutral-200 flex justify-between items-center mb-4">
        <div>
          <h1 className="">Language</h1>
          <p className="text-textSecondary">Set your preferred app language.</p>
        </div>
        <div className="border rounded-2xl">
          <Select defaultValue="English">
            <Select.Option value="English">English</Select.Option>
            <Select.Option value="Spanish">Spanish</Select.Option>
          </Select>
        </div>
      </div>
      <div className="border-0 border-b border-neutral-200 flex justify-between items-center mb-4">
        <div>
          <h1 className="">Date Format</h1>
          <p className="text-textSecondary">Choose how dates are displayed.</p>
        </div>
        <div className="border rounded-2xl">
          <DatePicker />
        </div>
      </div>
      <div className=" flex justify-end items-end">
        <button className="bg-primary text-white py-3 px-6 rounded-lg clear-start">
          Save
        </button>
      </div>
    </div>
  );
};

export default PreferecnePage;
