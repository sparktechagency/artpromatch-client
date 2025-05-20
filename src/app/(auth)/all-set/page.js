/* eslint-disable react/no-unescaped-entities */
"use client";

import { AllImages } from "@/assets/images/AllImages";
import { useCreateProfileMutation } from "@/redux/features/auth/authApi";
import { Form, message, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AllSet = () => {
  const router = useRouter();
  //   const role = localStorage.getItem("role");
  //   const favoriteTattoos = localStorage.getItem("favoriteTattoos");
  //   const location = localStorage.getItem("location");
  //   const radius = localStorage.getItem("radius");
  //   const lookingFor = localStorage.getItem("lookingFor");
  //   const latitude = localStorage.getItem("latitude");
  //   const longitude = localStorage.getItem("longitude");
  //   const notificationPreferences = localStorage.getItem(
  //     "notificationPreferences"
  //   );

  const favoriteTattoos = JSON.parse(
    localStorage.getItem("favoriteTattoos") || "[]"
  );
  const location = {
    longitude: localStorage.getItem("longitude"),
    latitude: localStorage.getItem("latitude"),
  };
  const radius = parseInt(localStorage.getItem("radius") || "0", 10);
  const lookingFor = localStorage.getItem("lookingFor");
  const notificationPreferences = localStorage.getItem(
    "notificationPreferences"
  );
  const role = localStorage.getItem("role");

  const data = {
    role: role,
    favoriteTattoos: favoriteTattoos,
    location: {
      type: "Point",
      coordinates: [77.1025, 28.7041],
    },
    radius: radius,
    lookingFor: lookingFor,
    notificationPreferences: notificationPreferences,
  };
  // console.log("data", data);

  const [createProfile, { isLoading }] = useCreateProfileMutation();

  console.log(
    role,
    favoriteTattoos,
    location.longitude,
    location.latitude,
    radius,
    lookingFor,
    notificationPreferences
  );

  const handleAllSet = () => {
    createProfile(data)
      .unwrap()
      .then((res) => {
        console.log("res", res);
        message.success("Profile created successfully!");
        router.push("/");
      })
      .catch((err) => console.log(err));
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
                  We’re ready to show you personalized recommendations based on
                  your preferences.
                </Typography.Text>
              </div>

              {
                <button
                type="button"
                  onClick={handleAllSet}
                  className="w-full bg-primary text-white py-3 rounded-lg mt-5"
                >
                  {isLoading ? "Loading..." : "Continue"}
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
