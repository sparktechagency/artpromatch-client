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
const ConfirmDelete = () => {
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
      <h1 className="text-xl font-bold">Delete Account</h1>
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-5">
          <div className="">
            <h1 className="flex justify-start items-center gap-2 text-xl font-bold">
              {" "}
              <CiCircleInfo className="h-8 w-8 text-red-500" />
              Before You Delete Your Account
            </h1>
            <ul className="md:px-16 text-secondary">
              <li className=" list-disc">
                Deleting your account is irreversible. All bookings, messages,
                and preferences will be permanently removed.
              </li>
              <li className=" list-disc">
                Any active bookings will be canceled, and you may lose access to
                ongoing services.
              </li>
              <li className=" list-disc">
                If you just need a break, consider temporarily deactivating your
                account instead. Deactivate Account
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-bold">
          Choose a Reason <span className="text-neutral-400">(Optional)</span>
        </h1>
        <Radio value={1}>I no longer need the service</Radio>
        <Radio value={1}>Privacy concerns</Radio>
        <Radio value={1}>Too many notifications</Radio>
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
              Tell us more why are you deleting this Account? (optional)
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
                  Delete Account
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
            <BsTrash3 className="h-8 w-8 text-red-500" />
            <h1 className="text-xl font-bold">Confirm account Deletion?</h1>
            <p className="text-textSecondary">
              This action is permanent. Once deleted, your account and all data
              cannot be recovered.
            </p>
            <div className="flex justify-center items-center gap-2">
              <button
                className="bg-slate-50 text-slate-900 border border-slate-900 
              rounded-xl px-4 py-2"
              >
                Cancel
              </button>
              <button
                className="bg-red-100 text-red-500 border border-red-500 
              rounded-xl px-4 py-2"
              >
                Delete Account
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ConfirmDelete;
