'use client';

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, DatePicker, Form, Input, Modal } from 'antd';
import Image from 'next/image';
import React from 'react';

interface PaymentModalProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  handleOk,
  handleCancel,
}) => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    handleOk();
  };

  return (
    <div className="my-5">
      <Form name="paymentForm" onFinish={onFinish} layout="vertical">
        {/* Card Number */}
        <Form.Item
          name="cardNumber"
          label={<p className="font-semibold">Card Number</p>}
          rules={[{ required: true, message: 'Card number is required' }]}
        >
          <div className="flex justify-between items-center gap-2 rounded-xl">
            <Input placeholder="1234 1234 1234 1234" maxLength={19} />
            <div className="flex gap-2">
              <Image
                src={AllImages.visa}
                alt="visa"
                className="object-contain h-5 w-10"
              />
              <Image
                src={AllImages.Mastercard}
                alt="mastercard"
                className="object-contain h-5 w-10"
              />
              <Image
                src={AllImages.AMEX}
                alt="amex"
                className="object-contain h-5 w-10"
              />
              <Image
                src={AllImages.Discover}
                alt="discover"
                className="object-contain h-5 w-10"
              />
            </div>
          </div>
        </Form.Item>

        {/* Expiry + CVC */}
        <div className="flex gap-2">
          <Form.Item
            name="expiry"
            label={<p className="font-semibold">Expiry</p>}
            rules={[{ required: true, message: 'Expiry date required' }]}
          >
            <DatePicker picker="month" className="w-full" />
          </Form.Item>

          <Form.Item
            name="cvc"
            label={<p className="font-semibold">CVC</p>}
            rules={[{ required: true, message: 'CVC required' }]}
          >
            <Input placeholder="000" maxLength={4} />
          </Form.Item>
        </div>

        {/* Country + Zip Code */}
        <div className="flex gap-2">
          <Form.Item
            name="country"
            label={<p className="font-semibold">Country</p>}
            rules={[{ required: true, message: 'Country required' }]}
          >
            <Input placeholder="Country" />
          </Form.Item>

          <Form.Item
            name="zip"
            label={<p className="font-semibold">Zip Code</p>}
            rules={[{ required: true, message: 'Zip code required' }]}
          >
            <Input placeholder="000" />
          </Form.Item>
        </div>

        {/* Submit */}
        <Form.Item>
          <button
            className="w-full py-2 bg-primary rounded-xl text-white font-semibold md:text-xl shadow-lg"
            type="submit"
          >
            Pay & Confirm Booking
          </button>
        </Form.Item>
      </Form>

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
      />
    </div>
  );
};

export default PaymentModal;
