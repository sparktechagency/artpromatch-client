'use client';

import { ConfigProvider, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { BsTrash3 } from 'react-icons/bs';
import { CiCircleInfo } from 'react-icons/ci';
import { deleteAccount } from '@/services/Auth';
import { toast } from 'sonner';

const ConfirmDelete = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any | null>(null);

  const showDeleteModal = () => {
    form.submit();
  };

  const handleFormFinish = (values: any) => {
    setFormValues(values);
    setIsDeleteModalOpen(true);
  };

  const handleOk = async () => {
    if (!formValues) return;

    try {
      const payload = {
        email: formValues.email,
        password: formValues.password,
      };

      const res = await deleteAccount(payload);

      if (res?.success) {
        toast.success(res?.message || 'Account deleted successfully');
        setIsDeleteModalOpen(false);
      } else {
        toast.error(res?.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while deleting account');
    }
  };

  const handleCancel = () => setIsDeleteModalOpen(false);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Delete Account</h1>

      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-5">
          <div>
            <h1 className="flex justify-start items-center gap-2 text-xl font-bold">
              <CiCircleInfo className="h-8 w-8 text-red-500" />
              Before You Delete Your Account
            </h1>
            <ul className="md:px-16 text-secondary">
              <li className="list-disc">
                Deleting your account is irreversible. All bookings, messages,
                and preferences will be permanently removed.
              </li>
              <li className="list-disc">
                Any active bookings will be canceled, and you may lose access to
                ongoing services.
              </li>
              <li className="list-disc">
                If you just need a break, consider temporarily deactivating your
                account instead. Deactivate Account
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Form
        layout="vertical"
        className="mb-10 mt-5"
        form={form}
        onFinish={handleFormFinish}
      >
        <Form.Item name="email" label={<p>Enter your Email</p>}>
          <Input name="email" placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" label={<p>Enter your Password</p>}>
          <Input name="password" placeholder="******" />
        </Form.Item>

        <div className="my-5 flex justify-end items-end">
          <button
            onClick={showDeleteModal}
            className="bg-red-100 text-red-500 border border-red-500 rounded-xl px-4 py-2"
          >
            Delete Account
          </button>
        </div>
      </Form>

      <ConfigProvider>
        <Modal
          open={isDeleteModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <BsTrash3 className="h-8 w-8 text-red-500" />
            <h1 className="text-xl font-bold">Confirm account Deletion?</h1>
            <p className="text-secondary text-center">
              This action is permanent. Once deleted, your account and all data
              cannot be recovered.
            </p>
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="bg-slate-50 text-slate-900 border border-slate-900 rounded-xl px-4 py-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="bg-red-100 text-red-500 border border-red-500 rounded-xl px-4 py-2">
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
