'use client';

import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import { useState } from 'react';
import { Modal, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import PaymentModal from '../../BookingModals/PaymentModal';

interface PaymentDataType {
  key: string;
  artist: string;
  billingDate: string;
  service: string;
  amount: string;
  status: string;
}

const PaymentHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data: PaymentDataType[] = [
    {
      key: '1',
      artist: 'Demo Artist Name',
      billingDate: 'Dec 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
    {
      key: '2',
      artist: 'Demo Artist Name',
      billingDate: 'Nov 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
    {
      key: '3',
      artist: 'Demo Artist Name',
      billingDate: 'Oct 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
    {
      key: '4',
      artist: 'Demo Artist Name',
      billingDate: 'Sep 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
    {
      key: '5',
      artist: 'Demo Artist Name',
      billingDate: 'Aug 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
    {
      key: '6',
      artist: 'Demo Artist Name',
      billingDate: 'Jul 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
    {
      key: '7',
      artist: 'Demo Artist Name',
      billingDate: 'Jul 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
    {
      key: '8',
      artist: 'Demo Artist Name',
      billingDate: 'Jul 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
    {
      key: '9',
      artist: 'Demo Artist Name',
      billingDate: 'Jun 1, 2022',
      service: 'Realism Tattoo',
      amount: '$50.00',
      status: 'Paid',
    },
  ];

  const columns: ColumnsType<PaymentDataType> = [
    { title: 'Artist', dataIndex: 'artist', key: 'artist' },
    {
      title: 'Billing date',
      dataIndex: 'billingDate',
      key: 'billingDate',
      defaultSortOrder: 'descend',
      sorter: (a: PaymentDataType, b: PaymentDataType) =>
        new Date(a.billingDate).getTime() - new Date(b.billingDate).getTime(),
    },
    { title: 'Service', dataIndex: 'service', key: 'service' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color="green">✅ {status}</Tag>,
    },
  ];

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div>
      <div className="mt-5 mb-4 border rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src={AllImages.visa} alt="Visa" height={50} width={50} />

          <div className="text-text-secondary">
            <h3>Visa ending in 1234</h3>
            <h4>Expiry 06/2024</h4>
          </div>
        </div>
        <button onClick={showModal} className="px-4 py-2 rounded-xl border">
          Edit
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data} bordered />
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={null}
      >
        <PaymentModal handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default PaymentHistory;
