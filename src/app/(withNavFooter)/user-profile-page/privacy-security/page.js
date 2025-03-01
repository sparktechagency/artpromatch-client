"use client";

import { Radio, Switch } from "antd";
import Link from "next/link";
import React from "react";

const PrivacyPage = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="p-5">
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Protect Account</h1>
          <p className="text-textSecondary">Change account Password</p>
        </div>
        <Link href="/user-profile-page/change-password-page">
          <button className="border rounded-xl px-4 py-2 text-secondary">
            Update Password
          </button>
        </Link>
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold"> Two-Factor Authentication</h1>
          <p className="text-textSecondary">
            Add extra security by requiring a verification code when logging in.
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Personalized Content</h1>
          <p className="text-textSecondary">
            Allow the app to suggest artists and guest spots based on your
            activity.
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Location-Based Suggestions</h1>
          <p className="text-textSecondary">
            Use your location to show nearby artists and events.
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>

      <div className=" flex justify-end items-end mt-5">
        <button className="bg-primary text-white py-3 px-6 rounded-lg clear-start">
          Save
        </button>
      </div>
    </div>
  );
};

export default PrivacyPage;
