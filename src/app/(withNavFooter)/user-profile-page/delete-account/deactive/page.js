"use client";
import {
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";
import { FaMinus } from "react-icons/fa6";
const DeactiveAccount = () => {
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

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Deactivate Account</h1>
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-5">
          <div className="">
            <h1 className="flex justify-start items-center gap-2 text-xl font-bold">
              {" "}
              <CiCircleInfo className="h-8 w-8 text-red-500" />
              What Happens When You Deactivate?
            </h1>
            <ul className="md:px-16 text-secondary">
              <li className=" list-disc">
                You won’t receive notifications or messages.
              </li>
              <li className=" list-disc">
                Your bookings remain intact but won’t be visible to artists.
              </li>
              <li className=" list-disc">
                ou can log in anytime to restore your account. Learn more
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-bold">
          Choose a Reason <span className="text-neutral-400">(Optional)</span>
        </h1>
        <Radio value={1}>Taking a break, I’ll be back</Radio>
        <Radio value={1}>Tired</Radio>
        <Radio value={1}>Not finding the right artists</Radio>
        <Radio value={1}>Prefer a different platform</Radio>
        <Radio value={1}>Other</Radio>
      </div>
      <div>
        <div className="">
          <Form
            name="select-user-type"
            initialValues={{ remember: true }}
            layout="vertical"
            className="mb-10"
          >
            <h1 className="my-5">
              Tell us more why are you deactivating this Account? (optional)
              (optional)
            </h1>
            <TextArea rows={4}></TextArea>
            <Form.Item name="email" label={<p>Enter your Email</p>}>
              <Input name="email" placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" label={<p>Enter your Password</p>}>
              <Input name="password" placeholder="******" />
            </Form.Item>
            <Form.Item>
              <Checkbox onChange={onChange}>
                I understand that deleted account is not recoverable
              </Checkbox>
            </Form.Item>
            <div className="my-5 flex justify-end items-end">
              <Form.Item>
                <button
                  onClick={showModal}
                  className="bg-red-100 text-red-500 border border-red-500 
              rounded-xl px-4 py-2"
                >
                  Deactivate Account
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
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
            <p className="text-textSecondary">
              Are you sure you want to deactivate your account? Your profile
              will be hidden, and you won’t receive notifications or messages.
            </p>
            <div className="flex justify-center items-center gap-2">
              <button
              onCancel={handleCancel}
                className="bg-slate-50 text-slate-900 border border-slate-900 
              rounded-xl px-4 py-2"
              >
                Cancel
              </button>
              <button
              onClick={handleOk}
                className="bg-red-100 text-red-500 border border-red-500 
              rounded-xl px-4 py-2"
              >
              Deactivate  Account
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default DeactiveAccount;
