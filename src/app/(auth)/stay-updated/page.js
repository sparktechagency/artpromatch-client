"use client";

import { AllImages } from "@/assets/images/AllImages";
import { Form, Radio, Steps, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const StayUpdated = () => {
  const [current, setCurrent] = useState(0);
  const [selectedType, setSelectedType] = useState([]);

  const onChange = (value) => {
    console.log("Step Changed to:", value);
    setCurrent(value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    console.log("Selected Type:",selectedType);
    JSON.stringify(localStorage.setItem("notificationPreferences", selectedType));
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-[450px]">
          <Form
            name="select-user-type"
            initialValues={{ remember: true }}
            layout="vertical"
          >
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

            <Radio.Group
              onChange={handleTypeChange}
              value={selectedType}
              className="flex flex-col gap-4"
            >
              <Radio value="app">
                <div className="border hover:border-primary rounded-lg p-6 md:w-96">
                  <h1 className="text-xl font-bold">In-App Notifications</h1>
                  <p>Receive updates when browsing & in app.</p>
                </div>
              </Radio>
              <Radio value="email">
                <div className="border hover:border-primary rounded-lg p-6 md:w-96">
                  <h1 className="text-xl font-bold">Email Alerts</h1>
                  <p>Get notifications sent to your email.</p>
                </div>
              </Radio>
              <Radio value="sms">
                <div className="border hover:border-primary rounded-lg p-6 md:w-96">
                  <h1 className="text-xl font-bold">Text Messages</h1>
                  <p>Stay updated via SMS.</p>
                </div>
              </Radio>
            </Radio.Group>

            <Link
              href="/all-set"
            >
              <button className="w-full bg-primary text-white py-3 rounded-lg mt-5">
                Continue
              </button>
            </Link>
            <button className="w-full mt-5">Skip</button>
          </Form>

          <Steps
            current={current}
            onChange={onChange}
            direction="horizontal"
            size="small"
            items={[
              { title: "", status: "finish" },
              { title: "", status: current >= 1 ? "finish" : "wait" },
              { title: "", status: current >= 2 ? "finish" : "wait" },
              { title: "", status: current >= 3 ? "finish" : "wait" },
            ]}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
