'use client';

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, Form, Input, InputNumber, Modal, Tag } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import ConfirmModal from '../../BookingModals/ConfirmModal';
// import ConfirmModal from './ConfirmModal';

interface Props {
  handleOk?: () => void;
  handleCancel?: () => void;
}

const CardEditModal: React.FC<Props> = ({ handleOk, handleCancel }) => {
  const [isModalOpenForConfirm, setIsModalOpenForConfirm] = useState(false);

  const showModalForConfirm = () => setIsModalOpenForConfirm(true);
  const handleOkForConfirm = () => setIsModalOpenForConfirm(false);
  const handleCancelForConfirm = () => setIsModalOpenForConfirm(false);

  interface PaymentFormValues {
    cardNumber: string | number;
    expiry: string;
    cvc: string;
    country: string;
    zip: string | number;
  }

  const onFinish = (values: PaymentFormValues) => {
    console.log('Received values of form:', values);
    showModalForConfirm();
  };

  return (
    <div>
      {/* User Info */}
      <div className="flex justify-between items-center mb-4  border-0 border-b">
        <div className="flex items-center gap-3">
          <Image
            src={AllImages.user}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full object-cover"
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

      {/* Booking Info */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Secure Your Booking</h1>
          <p>A deposit is required to secure your appointment.</p>
        </div>
        <h1 className="text-xl font-bold text-primary">$50.00</h1>
      </div>

      {/* Payment Options & Form */}
      <div className="my-5">
        <div className="flex gap-5 mb-4">
          <div className="border p-2 rounded-xl h-16 w-20 flex flex-col justify-center items-center hover:border-primary">
            <Image
              src={AllImages.VisaMastercard}
              alt="Card"
              width={56}
              height={20}
              className="object-contain h-5 w-14"
            />
            <p>Card</p>
          </div>
          <div className="border p-2 rounded-xl h-16 w-20 flex flex-col justify-center items-center hover:border-primary">
            <Image
              src={AllImages.Paypal}
              alt="Paypal"
              width={56}
              height={20}
              className="object-contain"
            />
            <p>Paypal</p>
          </div>
        </div>
        <Form
          name="payment"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="cardNumber"
            label={<p className="font-semibold">Card Number</p>}
          >
            <div className="flex justify-between items-center gap-2 rounded-xl">
              <InputNumber
                placeholder="1234 1234 1234 1234"
                style={{ width: '100%' }}
                // className="flex-1"
              />
              <div className="flex gap-2">
                {[
                  AllImages.visa,
                  AllImages.Mastercard,
                  AllImages.AMEX,
                  AllImages.Discover,
                ].map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt="card"
                    width={56}
                    height={20}
                    className="object-contain"
                  />
                ))}
              </div>
            </div>
          </Form.Item>

          <div className="flex justify-between items-center gap-2 rounded-xl">
            <Form.Item
              name="expiry"
              label={<p className="font-semibold">Expiry</p>}
            >
              <Input placeholder="MM/YY"></Input>
            </Form.Item>
            <Form.Item name="cvc" label={<p className="font-semibold">CVC</p>}>
              <Input placeholder="000"></Input>
            </Form.Item>
          </div>
          <div className="flex justify-between items-center gap-2 rounded-xl">
            <Form.Item
              name="country"
              label={<p className="font-semibold">Country</p>}
            >
              <Input placeholder="Country"></Input>
            </Form.Item>
            <Form.Item
              name="zip"
              label={<p className="font-semibold">Zip Code</p>}
            >
              <Input placeholder="000"></Input>
            </Form.Item>
          </div>
          <Form.Item>
            <button
              onClick={showModalForConfirm}
              className="w-full py-2 bg-primary rounded-xl  text-white font-semiboldbold md:text-xl  shadow-lg"
              type="submit"
            >
              Pay & Confirm Booking
            </button>
          </Form.Item>
        </Form>
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
          open={isModalOpenForConfirm}
          onOk={handleOkForConfirm}
          onCancel={handleCancelForConfirm}
          footer={false}
        >
          <ConfirmModal
            handleOk={handleOkForConfirm}
            handleCancel={handleCancelForConfirm}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default CardEditModal;
