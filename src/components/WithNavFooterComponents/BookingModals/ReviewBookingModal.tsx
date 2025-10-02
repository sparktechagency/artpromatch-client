'use client';

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, DatePicker, Form, Input, Modal, Tag } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { FaPen } from 'react-icons/fa6';
import PaymentModal from './PaymentModal';

interface ReviewBookingModalProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const ReviewBookingModal: React.FC<ReviewBookingModalProps> = ({
  handleOk,
  handleCancel,
}) => {
  const [isModalOpenForPayment, setIsModalOpenForPayment] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceModalDate, setServiceModalDate] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <div>
      {/* Top section */}
      <div className="flex justify-between items-center mb-4 border-b">
        <div className="flex items-center gap-3">
          <Image
            src={AllImages.user}
            height={500}
            width={500}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">Alex Rivera</h3>
            <p className="text-gray-500 text-sm">Brooklyn, NY</p>
          </div>
        </div>
        <Tag color="green">Available Now</Tag>
      </div>

      {/* Booking Info */}
      <h1 className="text-2xl font-bold mb-2">Review Booking</h1>
      <div className="my-5 space-y-2">
        <div className="flex justify-between border-b pb-1">
          <p>Artist:</p>
          <p>Alex Rivera</p>
        </div>
        <div className="flex justify-between border-b pb-1">
          <p>Service</p>
          <p className="flex items-center gap-2">
            <FaPen
              onClick={() => setServiceModalOpen(true)}
              className="bg-primary text-white p-1 rounded-full h-5 w-5 cursor-pointer"
            />
            Realism Tattoo
          </p>
        </div>
        <div className="flex justify-between border-b pb-1">
          <p>Date & Time</p>
          <p className="flex items-center gap-2">
            <FaPen
              onClick={() => setServiceModalDate(true)}
              className="bg-primary text-white p-1 rounded-full h-5 w-5 cursor-pointer"
            />
            Dec 10, 2024, at 11:30 AM
          </p>
        </div>
        <div className="flex justify-between border-b pb-1">
          <p>Estimated Cost</p>
          <p>$400 (2 hours)</p>
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={() => setIsModalOpenForPayment(true)}
        className="w-full py-2 bg-primary rounded-xl text-white font-semibold md:text-xl shadow-lg"
      >
        Proceed to Payment
      </button>

      {/* ConfigProvider + Modals */}
      <ConfigProvider>
        {/* Payment Modal */}
        <Modal
          open={isModalOpenForPayment}
          onCancel={() => setIsModalOpenForPayment(false)}
          footer={false}
        >
          <PaymentModal
            handleOk={() => setIsModalOpenForPayment(false)}
            handleCancel={() => setIsModalOpenForPayment(false)}
          />
        </Modal>

        {/* Edit Service Modal */}
        <Modal
          open={serviceModalOpen}
          onCancel={() => setServiceModalOpen(false)}
          footer={false}
        >
          <Form name="Edit Service" onFinish={onFinish} className="mt-10">
            <Form.Item label="Service" name="service">
              <Input />
            </Form.Item>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-primary rounded-xl text-white font-semibold"
              >
                Save
              </button>
            </div>
          </Form>
        </Modal>

        {/* Edit Date Modal */}
        <Modal
          open={serviceModalDate}
          onCancel={() => setServiceModalDate(false)}
          footer={false}
        >
          <Form name="Edit Date" onFinish={onFinish}>
            <Form.Item label="Date" name="date">
              <DatePicker />
            </Form.Item>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-primary rounded-xl text-white font-semibold"
              >
                Save
              </button>
            </div>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ReviewBookingModal;
