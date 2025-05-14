/* eslint-disable react/no-unescaped-entities */
"use client";

import { AllImages } from "@/assets/images/AllImages";
import { useUserTypeSelectionMutation } from "@/redux/features/auth/authApi";
import { Form, Typography, Radio } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

const userRoles = [
  {
    value: 1,
    label: "Client",
    description:
      "Discover and book talented artists and piercers near you or worldwide. Save your favorites, explore guest spots, and manage appointments.",
  },
  {
    value: 2,
    label: "Artist",
    description:
      "Showcase your portfolio, attract clients, and manage bookings. Whether you're a tattoo artist or piercer, we’ve got you covered.",
  },
  {
    value: 3,
    label: "Business Owner",
    description:
      "Promote your business, feature talented artists, and organize events. Perfect for tattoo studios, piercing studios, or related businesses.",
  },
];

const UserTypeSelection = () => {
  const [value, setValue] = useState(1);
  const [userTypeSelection] = useUserTypeSelectionMutation();
  const router = useRouter();
   const selectedRole = userRoles.find((role) => role.value === value);
  const onFinish = async () => {
   
    try {
      console.log("Selected role:", selectedRole);

      router.push(
        `/preference-selection?role=${encodeURIComponent(selectedRole?.label)}`
      );
    } catch (error) {
      console.error("Error selecting user type:", error);
    }
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
            // onFinish={onFinish}
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
                onChange={(e) => setValue(e.target.value)}
                value={value}
              >
                {userRoles.map((role) => (
                  <Radio
                    key={role.value}
                    value={role.value}
                    className="!w-full"
                  >
                    <div
                      className={`border rounded-lg p-6 mb-5 ${
                        value === role.value
                          ? "border-primary shadow-md"
                          : "hover:border-primary"
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

            <Link
              href={{
                pathname: "/preference-selection",
                query: { role: selectedRole?.label },
              }}
            >
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg mt-5"
              >
                Continue
              </button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
