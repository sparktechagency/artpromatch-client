"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Drawer, Button, Upload, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import { FaTrash, FaUpload } from "react-icons/fa6";
import { AllImages } from "@/assets/images/AllImages";

const UserDashboardLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Password Management",
      path: "/user-profile-page/change-password-page",
    },
    { name: "Preferences", path: "/user-profile-page/preferences" },
    { name: "Notifications", path: "/user-profile-page/notifications" },
    { name: "Payment History", path: "/user-profile-page/payment-history" },
    { name: "Privacy & Security", path: "/user-profile-page/privacy-security" },
    { name: "Linked Accounts", path: "/user-profile-page/linked-accounts" },
  ];

  const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const handleDelete = () => {
    message.success("Removed Successfully");
  };
  return (
    <div className="container mx-auto mt-20 px-2 md:px-0">
      <div className="my-5 w-full flex flex-col md:flex-row">
        <Button
          className="md:hidden mb-4"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
        >
          Menu
        </Button>

        <div className="hidden md:block md:w-[30%]">
          <h1 className="text-xl font-bold mb-2">Profile Information</h1>
          {menuItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <p
                className={`mb-3 cursor-pointer ${
                  activeTab === item.name
                    ? "text-black font-bold"
                    : "text-textSecondary text-xl font-semibold"
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.name}
              </p>
            </Link>
          ))}
          <Link href="/user-profile-page/delete-account">
            <p className="mb-3 text-red-500 text-xl cursor-pointer">
              Delete Account
            </p>
          </Link>
        </div>

        <Drawer
          title="Profile Information"
          placement="right"
          closable
          onClose={() => setOpen(false)}
          open={open}
        >
          {menuItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <p
                className={`mb-3 cursor-pointer ${
                  activeTab === item.name
                    ? "text-black font-bold"
                    : "text-textSecondary text-xl font-semibold"
                }`}
                onClick={() => {
                  setActiveTab(item.name);
                  setOpen(false);
                }}
              >
                {item.name}
              </p>
            </Link>
          ))}
          <Link href="/user-profile-page/delete-account">
            <p className="mb-3 text-red-500 text-xl cursor-pointer">
              Delete Account
            </p>
          </Link>
        </Drawer>

        <div className="md:w-[70%] w-full">
          <div className=" flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0">
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                src={AllImages.user}
                height={100}
                width={100}
                alt="user"
              />
              <div className="">
                <h1 className="text-xl font-bold">Alex Rivera</h1>
                <p className="text-neutral-400">
                  Update your profile information
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2  mb-5 md:mb-0">
              <Upload {...props}>
              <button className="flex items-center gap-2 px-10 py-2 rounded-xl border hover:border-primary hover:text-primary">
                <FaUpload /> Uplaod
              </button>
              </Upload>
              <button className="flex items-center gap-2 px-10 py-2 rounded-xl border hover:border-primary hover:text-primary">
                <FaTrash onClick={handleDelete} /> Remove
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
