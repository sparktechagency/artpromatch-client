'use client';

import {
  // Checkbox,
  // CheckboxChangeEvent,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { CiCircleInfo } from 'react-icons/ci';
import { FaMinus } from 'react-icons/fa6';
import { deactivateAccount } from '@/services/Auth';
import { toast } from 'sonner';

const DeactiveAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [understandChecked, setUnderstandChecked] = useState(false);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleOpenConfirm = () => {
    form.submit();
  };

  const handleFormFinish = (values: any) => {
    const finalReason =
      values.reason === 'Other' ? values.deactivationReason : values.reason;

    setFormValues({
      ...values,
      deactivationReason: finalReason,
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!formValues) return;

    try {
      const payload = {
        email: formValues.email,
        password: formValues.password,
        deactivationReason: formValues.deactivationReason,
      };

      const res = await deactivateAccount(payload);

      if (res?.success) {
        toast.success(res?.message || 'Account deactivated successfully');
        setIsModalOpen(false);
      } else {
        toast.error(res?.message || 'Failed to deactivate account');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while deactivating account');
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  // const onCheckboxChange = (e: CheckboxChangeEvent) => {
  //   setUnderstandChecked(e.target.checked);
  // };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Deactivate Account</h1>

      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-5">
          <div>
            <h1 className="flex justify-start items-center gap-2 text-xl font-bold">
              <CiCircleInfo className="h-8 w-8 text-red-500" />
              What Happens When You Deactivate?
            </h1>
            <ul className="md:px-16 text-secondary">
              <li className="list-disc">
                You won&apos;t receive notifications or messages.
              </li>
              <li className="list-disc">
                Your bookings remain intact but won&apos;t be visible to others.
              </li>
              <li className="list-disc">
                You can log in anytime to restore your account. Learn more.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Form
        name="deactivate-account"
        layout="vertical"
        className="mb-10"
        form={form}
        onFinish={handleFormFinish}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Choose a Reason</h1>
          <Form.Item
            name="reason"
            rules={[{ required: true, message: 'Please select a reason' }]}
          >
            <Radio.Group
              onChange={e => setSelectedReason(e.target.value)}
              value={selectedReason}
            >
              <div className="flex flex-col gap-1">
                <Radio value="Taking a break, I'll be back">
                  Taking a break, I'll be back
                </Radio>
                <Radio value="Tired">Tired</Radio>
                <Radio value="Not finding the right artists">
                  Not finding the right artists
                </Radio>
                <Radio value="Prefer a different platform">
                  Prefer a different platform
                </Radio>
                <Radio value="Other">Other</Radio>
              </div>
            </Radio.Group>
          </Form.Item>
        </div>

        <h1 className="my-5">
          Tell us more why are you deactivating this Account?
        </h1>
        {selectedReason === 'Other' && (
          <Form.Item name="deactivationReason">
            <TextArea rows={4} />
          </Form.Item>
        )}

        <Form.Item name="email" label={<p>Enter your Email</p>}>
          <Input name="email" placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" label={<p>Enter your Password</p>}>
          <Input name="password" placeholder="******" />
        </Form.Item>

        {/* <Form.Item>
          <Checkbox checked={understandChecked} onChange={onCheckboxChange}>
            I understand that deleted account is not recoverable
          </Checkbox>
        </Form.Item> */}

        <div className="my-5 flex justify-end items-end">
          <Form.Item>
            <button
              onClick={handleOpenConfirm}
              className="bg-red-100 text-red-500 border border-red-500 rounded-xl px-4 py-2"
            >
              Deactivate Account
            </button>
          </Form.Item>
        </div>
      </Form>

      <ConfigProvider>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <FaMinus className="h-8 w-8 text-red-500 border border-red-500 rounded-full p-2" />
            <h1 className="text-xl font-bold">Deactivate Your Account?</h1>
            <p className="text-secondary text-center">
              Are you sure you want to deactivate your account? Your profile
              will be hidden, and you won&apos;t receive notifications or
              messages.
            </p>
            <div className="flex justify-center items-center gap-2">
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
