'use client';

import {
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
  Checkbox,
  CheckboxChangeEvent,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { CiCircleInfo } from 'react-icons/ci';
import { FaMinus } from 'react-icons/fa6';

const DeactiveAccount: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    showModal();
  };

  const reasons = [
    "Taking a break, I'll be back",
    'Tired',
    'Not finding the right artists',
    'Prefer a different platform',
    'Other',
  ];

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Deactivate Account</h1>

      <div className="border rounded-xl p-5 flex justify-between items-start mb-4">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold mb-2">
            <CiCircleInfo className="h-8 w-8 text-red-500" />
            What Happens When You Deactivate?
          </h1>
          <ul className="md:px-16 text-secondary list-disc space-y-1">
            <li>You won&apos;t receive notifications or messages.</li>
            <li>
              Your bookings remain intact but won&apos;t be visible to artists.
            </li>
            <li>You can log in anytime to restore your account. Learn more</li>
          </ul>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Choose a Reason (Optional)">
          <Radio.Group
            onChange={e => setSelectedReason(e.target.value)}
            value={selectedReason}
          >
            {reasons.map(reason => (
              <Radio key={reason} value={reason}>
                {reason}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Tell us more (Optional)" name="details">
          <TextArea
            rows={4}
            placeholder="Explain why you are deactivating..."
          />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password placeholder="******" />
        </Form.Item>

        <Form.Item>
          <Checkbox onChange={onCheckboxChange}>
            I understand that deleted account is not recoverable
          </Checkbox>
        </Form.Item>

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="bg-red-100 text-red-500 border border-red-500 rounded-xl px-4 py-2"
          >
            Deactivate Account
          </button>
        </div>
      </Form>

      <ConfigProvider>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center gap-4 p-4">
            <FaMinus className="h-8 w-8 text-red-500 border border-red-500 rounded-full p-2" />
            <h1 className="text-xl font-bold">Deactivate Your Account?</h1>
            <p className="text-secondary text-center">
              Are you sure you want to deactivate your account? Your profile
              will be hidden, and you won&apos;t receive notifications or
              messages.
            </p>
            <div className="flex justify-center items-center gap-2 mt-3">
              <button
                onClick={handleCancel}
                className="bg-slate-50 text-slate-900 border border-slate-900 rounded-xl px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className="bg-red-100 text-red-500 border border-red-500 rounded-xl px-4 py-2"
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default DeactiveAccount;
