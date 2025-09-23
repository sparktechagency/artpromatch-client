'use client';
import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ConfigProvider, Modal } from 'antd';
import BookingModalOne from '@/components/WithNavFooterComponents/BookingModals/BookingModalOne';

const AvailableFlash = () => {
  const data = [
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image,
    },
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image1,
    },
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image2,
    },
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image3,
    },
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image4,
    },
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image5,
    },
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image6,
    },
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image7,
    },
    {
      name: 'Alex Rivera',
      date: '2 days ago',
      image: AllImages.image8,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="">
      <h1 className="text-2xl font-bold">Available Flash</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((item, index) => (
          <div key={index} className="relative group overflow-hidden">
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Image
                src={item.image}
                alt="image"
                height={500}
                width={500}
                className="rounded-sm"
              />

              <button
                onClick={showModal}
                className="cursor-pointer bg-white text-black px-4 py-2 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"
              >
                Book Now
              </button>
            </motion.div>
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold my-6">Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((item, index) => (
          <div key={index} className="relative group overflow-hidden">
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className=" md:relative"
            >
              <Image
                src={item.image}
                alt="image"
                height={500}
                width={500}
                className="rounded-sm"
              />

              <button
                onClick={showModal}
                className=" cursor-pointer bg-white text-black px-4 py-2 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"
              >
                Book Now
              </button>
            </motion.div>
          </div>
        ))}
      </div>

      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: 'rgb(47,84,235)',
              defaultHoverColor: 'rgb(47,84,235)',
              defaultBorderColor: 'rgb(47,84,235)',
            },
          },
        }}
      >
        {/* modal for add program */}
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <BookingModalOne handleOk={handleOk} handleCancel={handleCancel} />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default AvailableFlash;
