"use client";

import { AllImages } from "@/assets/images/AllImages";
import {
  ConfigProvider,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Tag,
  Upload,
} from "antd";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import PaymentModal from "./PaymentModal";

const ReviewBookingModal = ({ handleOk, handleCancel }) => {
  const [isModalOpenForPayment, setIsModalOpenForPayment] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceModalDate, setServiceModalDate] = useState(false);
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const handleEdit = () => {
    <Input placeholder="Basic usage" />;
  };
  // payment modal
  const showModalForPayment = () => {
    setIsModalOpenForPayment(true);
  };

  const handleOkForPayment = () => {
    setIsModalOpenForPayment(false);
  };

  const handleCancelForPayment = () => {
    setIsModalOpenForPayment(false);
  };
  // service modal
  const showModalForService = () => {
    setServiceModalOpen(true);
  };

  const handleOkForService = () => {
    setServiceModalOpen(false);
  };

  const handleCancelForService = () => {
    setServiceModalOpen(false);
  };
  // date modal
  const showModalForDate = () => {
    setServiceModalDate(true);
  };

  const handleOkForDate = () => {
    setServiceModalDate(false);
  };

  const handleCancelForDate = () => {
    setServiceModalDate(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4  border-0 border-b">
        <div className="flex items-center gap-3">
          <Image
            src={AllImages.user}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">Alex Rivera</h3>
            <p className="text-gray-500 text-sm">Brooklyn, NY</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tag color="green">Available Now</Tag>
        </div>
      </div>
      <h1 className="text-2xl font-bold my-">Review Booking</h1>

      <div className="my-5">
        <div className="flex justify-between items-center border-0 border-b mb-2">
          <p>Artist:</p>
          <p>Alex Rivera</p>
        </div>
        <div className="flex justify-between items-center border-0 border-b mb-2">
          <p>Service</p>

          <p className="flex items-center gap-2">
            <FaPen
              onClick={showModalForService}
              className="bg-primary text-white p-1 rounded-full h-5 w-5"
            ></FaPen>{" "}
            Realism Tattoo
          </p>
        </div>
        <div className="flex justify-between items-center border-0 border-b mb-2">
          <p>Date & Time</p>
          <p className="flex items-center gap-2">
            <FaPen
              onClick={showModalForDate}
              className="bg-primary text-white p-1 rounded-full h-5 w-5"
            ></FaPen>{" "}
            Dec 10, 2024, at 11:30 AM
          </p>
        </div>
        <div className="flex justify-between items-center border-0 border-b">
          <p>Estimated Cost</p>
          <p>$400 (2 hours)</p>
        </div>
      </div>
      <button
        onClick={showModalForPayment}
        className="w-full py-2 bg-primary rounded-xl  text-white font-semiboldbold md:text-xl  shadow-lg"
        type="submit"
      >
        Proceed to Payment
      </button>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: "rgb(47,84,235)",
              defaultHoverColor: "rgb(47,84,235)",
              defaultBorderColor: "rgb(47,84,235)",
            },
          },
        }}
      >
        {/* modal for add program */}
        <Modal
          open={isModalOpenForPayment}
          onOk={handleOkForPayment}
          onCancel={handleCancelForPayment}
          footer={false}
        >
          <PaymentModal
            handleOk={handleOkForPayment}
            handleCancel={handleCancelForPayment}
          />
        </Modal>
        {/* modal for Edit   service */}
        <Modal open={serviceModalOpen} onOk={handleOkForService} footer={false}>
          <Form
            name="Edit Service"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            className="mt-10"
          >
            <Form.Item label="Service" name="service">
              <Input />
            </Form.Item>
            <div className="flex justify-end items-end">
              <Form.Item>
                <button
                  onClick={handleOkForService}
                  className=" px-6 py-2 bg-primary rounded-xl  text-white font-semibold"
                >
                  Save
                </button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
        {/* modal for Edit   date */}
        <Modal open={serviceModalDate} onOk={handleOkForDate} footer={false}>
          <Form name="Edit Date">
            <Form.Item label="Date" name="date">
              <DatePicker />
            </Form.Item>
            <div className="flex justify-end items-end">
              <Form.Item>
                <button
                  onClick={handleOkForDate}
                  className=" px-6 py-2 bg-primary rounded-xl  text-white font-semibold"
                >
                  Save
                </button>
              </Form.Item>
              </div>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ReviewBookingModal;
