"use client";

import { SearchOutlined } from "@ant-design/icons";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { Modal } from "antd";
import Link from "next/link";
import Image from "next/image";
import { AllImages } from "@/assets/images/AllImages";

const LeftsideBar = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = () => {
    setSearchTerm(email);
    refetch();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center gap-2 border-0 border-b mb-5 pb-5">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        <div>
          <BiEdit onClick={showModal} className="text-3xl" />
        </div>
      </div>

      <div className=" ">
        <p className="text-textSecondary">Unread(1)</p>
        {isLoading && (
          <p className=" text-center px-2 py-2 shadow-md shadow-neutral-400 mb-5">
            Loading users...
          </p>
        )}
        <Link
          href=""
          // to={{
          //     pathname: `/chat/${user?._id}`,
          //     state: { receiver_id: user?._id, img: user?.img, name: user?.name }
          // }}
          // to={`/chat/${user?._id}`}
          // state={{ receiver_id: user?._id, img: user?.img, name: user?.name }}

          // key={user._id}
          className={`   flex justify-between items-center text-textColor mb-5 px-5 py-1  `}
        >
          <div className="flex justify-start items-center gap-2">
            <Image
              className="w-10 h-12 rounded-full"
              src={AllImages.user}
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold text-textSecondary">
                Luci Santos
              </h3>
              <p className="text-textSecondary">Goodbye</p>
              {/* <p className={`${user?.is_read ? "text-textColor" : "text-black font-semibold"}`}>{user.lastMessage}</p> */}
            </div>
          </div>
          <div>
            <p className="text-textSecondary">1 day</p>
            {/* <p>{getTimeDifference(user?.lastMessageTime)}</p> */}
          </div>
        </Link>
        <Link
          href=""
          // to={{
          //     pathname: `/chat/${user?._id}`,
          //     state: { receiver_id: user?._id, img: user?.img, name: user?.name }
          // }}
          // to={`/chat/${user?._id}`}
          // state={{ receiver_id: user?._id, img: user?.img, name: user?.name }}

          // key={user._id}
          className={`   flex justify-between items-center text-textColor mb-5 px-5 py-1  `}
        >
          <div className="flex justify-start items-center gap-2">
            <Image
              className="w-10 h-12 rounded-full"
              src={AllImages.user}
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold text-textSecondary">
                Luci Santos
              </h3>
              <p className="text-textSecondary">Goodbye</p>
              {/* <p className={`${user?.is_read ? "text-textColor" : "text-black font-semibold"}`}>{user.lastMessage}</p> */}
            </div>
          </div>
          <div>
            <p className="text-textSecondary">1 day</p>
            {/* <p>{getTimeDifference(user?.lastMessageTime)}</p> */}
          </div>
        </Link>
        <Link
          href=""
          // to={{
          //     pathname: `/chat/${user?._id}`,
          //     state: { receiver_id: user?._id, img: user?.img, name: user?.name }
          // }}
          // to={`/chat/${user?._id}`}
          // state={{ receiver_id: user?._id, img: user?.img, name: user?.name }}

          // key={user._id}
          className={`   flex justify-between items-center text-textColor mb-5 px-5 py-1  `}
        >
          <div className="flex justify-start items-center gap-2">
            <Image
              className="w-10 h-12 rounded-full"
              src={AllImages.user}
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold text-textSecondary">
                Luci Santos
              </h3>
              <p className="text-textSecondary">Goodbye</p>
              {/* <p className={`${user?.is_read ? "text-textColor" : "text-black font-semibold"}`}>{user.lastMessage}</p> */}
            </div>
          </div>
          <div>
            <p className="text-textSecondary">1 day</p>
            {/* <p>{getTimeDifference(user?.lastMessageTime)}</p> */}
          </div>
        </Link>
        <Link
          href=""
          // to={{
          //     pathname: `/chat/${user?._id}`,
          //     state: { receiver_id: user?._id, img: user?.img, name: user?.name }
          // }}
          // to={`/chat/${user?._id}`}
          // state={{ receiver_id: user?._id, img: user?.img, name: user?.name }}

          // key={user._id}
          className={`   flex justify-between items-center text-textColor mb-5 px-5 py-1  `}
        >
          <div className="flex justify-start items-center gap-2">
            <Image
              className="w-10 h-12 rounded-full"
              src={AllImages.user}
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold text-textSecondary">
                Luci Santos
              </h3>
              <p className="text-textSecondary">Goodbye</p>
              {/* <p className={`${user?.is_read ? "text-textColor" : "text-black font-semibold"}`}>{user.lastMessage}</p> */}
            </div>
          </div>
          <div>
            <p className="text-textSecondary">1 day</p>
            {/* <p>{getTimeDifference(user?.lastMessageTime)}</p> */}
          </div>
        </Link>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        title="New Message"
      >
        <div className="flex flex-col gap-2 mt-10">
          <input
            type="text"
            placeholder="Search users"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={handleSearch}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Link
          href=""
          className={`   flex justify-between items-center text-textColor mb-5 px-5 py-1  `}
        >
          <div className="flex justify-start items-center gap-2">
            <Image
              className="w-10 h-12 rounded-full"
              src={AllImages.user}
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold text-textSecondary">
                Luci Santos
              </h3>
              <p className="text-textSecondary">Goodbye</p>
            </div>
          </div>
          <div>
            <p className="text-textSecondary">1 day</p>
          </div>
        </Link>
        <Link
          href=""
          className={`   flex justify-between items-center text-textColor mb-5 px-5 py-1  `}
        >
          <div className="flex justify-start items-center gap-2">
            <Image
              className="w-10 h-12 rounded-full"
              src={AllImages.user}
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold text-textSecondary">
                Luci Santos
              </h3>
              <p className="text-textSecondary">Goodbye</p>
            </div>
          </div>
          <div>
            <p className="text-textSecondary">1 day</p>
          </div>
        </Link>
        <Link
          href=""
          className={`   flex justify-between items-center text-textColor mb-5 px-5 py-1  `}
        >
          <div className="flex justify-start items-center gap-2">
            <Image
              className="w-10 h-12 rounded-full"
              src={AllImages.user}
              alt=""
            />
            <div>
              <h3 className="text-xl font-semibold text-textSecondary">
                Luci Santos
              </h3>
              <p className="text-textSecondary">Goodbye</p>
            </div>
          </div>
          <div>
            <p className="text-textSecondary">1 day</p>
          </div>
        </Link>
      </Modal>
    </div>
  );
};

export default LeftsideBar;
