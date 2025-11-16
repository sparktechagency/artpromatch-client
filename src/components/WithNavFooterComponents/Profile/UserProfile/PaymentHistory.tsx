'use client';

import { IPayment } from '@/types';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const PaymentHistory = ({ payments = [] }: { payments: IPayment[] }) => {
  console.log({ payments });

  // deterministic date formatter to avoid SSR/CSR hydration mismatch
  const formatDate = (value?: string | number | Date) => {
    if (!value) return '';

    const d = new Date(value);

    if (Number.isNaN(d.getTime())) return '';

    return d.toISOString().slice(0, 10);
  };

  const columns: ColumnsType<IPayment> = [
    {
      title: 'Artist',
      key: 'artist',
      render: (_value, record) => record.artistInfo.fullName,
    },
    {
      title: 'Service',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Billing date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a: IPayment, b: IPayment) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (value: IPayment['createdAt']) => formatDate(value),
    },
    {
      title: 'Total Amount',
      dataIndex: 'price',
      key: 'price',
      render: (value: number) => `$${value.toFixed(2)}`,
    },

    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: IPayment['paymentStatus']) => {
        const normalized = status?.toLowerCase();
        const color =
          normalized === 'captured'
            ? 'green'
            : normalized === 'pending'
            ? 'orange'
            : normalized === 'failed'
            ? 'red'
            : 'blue';

        return (
          <Tag className="capitalize" color={color}>
            {status}
          </Tag>
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <Table
          columns={columns}
          dataSource={payments}
          bordered
          pagination={false}
          rowKey="_id" // Ensure _id is used as the rowKey
        />
      </div>
    </div>
  );
};

export default PaymentHistory;
