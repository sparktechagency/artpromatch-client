'use client';

import { useState } from 'react';
import { Table, Avatar, ConfigProvider, Form, Button, Modal } from 'antd';
import Link from 'next/link';
import { IBooking } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import dayjs from 'dayjs';
import { cancelBookingByClient } from '@/services/Booking';
import { toast } from 'sonner';

const Bookings = ({ bookings = [] }: { bookings: IBooking[] }) => {
  // State for confirmation modal
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    onConfirm: (() => void) | null;
  }>({ open: false, title: '', onConfirm: null });

  // const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  // const [form] = Form.useForm();

  // const [isReviewModalOpen, setIsReviewModalOpen] = useState<{
  //   open: boolean;
  //   title: string;
  //   onSubmit: ((otp: string) => void) | null;
  // }>({ open: false, title: '', onSubmit: null });

  // Function to show modal
  const showConfirmationModal = (title: string, onConfirm: () => void) => {
    setConfirmModal({ open: true, title, onConfirm });
  };

  // Function to handle OK
  const handleConfirmOk = () => {
    confirmModal.onConfirm?.();
    setConfirmModal({ ...confirmModal, open: false, onConfirm: null });
  };

  // Function to handle Cancel
  const handleConfirmCancel = () => {
    setConfirmModal({ ...confirmModal, open: false, onConfirm: null });
  };

  // handleCancelBookingByArtist
  const handleCancelBookingByArtist = async (bookingId: string) => {
    try {
      const res = await cancelBookingByClient(bookingId);

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // const handleOtpSubmit = async () => {
  //   try {
  //     const values = await form.validateFields(['otp']);
  //     isReviewModalOpen.onSubmit?.(values.otp);
  //     form.resetFields();
  //     setIsReviewModalOpen({
  //       ...isReviewModalOpen,
  //       open: false,
  //       onSubmit: null,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const baseColumns = [
    {
      title: 'Client',
      dataIndex: 'clients',
      key: 'client',
      render: (text: string, booking: IBooking) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={getCleanImageUrl(booking?.client?.image)}
            style={{ marginRight: 8 }}
          />
          {text}
        </div>
      ),
    },
    {
      title: 'Service',
      key: 'service',
      render: (_: any, booking: IBooking) => booking.service?.title || 'N/A',
    },
    {
      title: 'Session Length',
      key: 'sessionType',
      render: (_: any, booking: IBooking) => {
        if (!booking.sessions || booking.sessions.length === 0) return 'N/A';

        const uniqueDays = new Set(
          booking.sessions.map(s => new Date(s.date).toDateString())
        );
        const totalDays = uniqueDays.size;

        const totalHours = booking.sessions.reduce((sum, s) => {
          const start = dayjs(s.startTime, 'hh:mm A');
          const end = dayjs(s.endTime, 'hh:mm A');
          const diffInHours = end.diff(start, 'minute') / 60;
          return sum + diffInHours;
        }, 0);

        const dayText = totalDays === 1 ? 'day' : 'days';
        const hourText = totalHours === 1 ? 'hour' : 'hours';

        return `${totalDays} ${dayText} of total ${totalHours} ${hourText}`;
      },
    },
    {
      title: 'Scheduled Date & Time',
      key: 'scheduledTime',
      render: (_: any, booking: IBooking) => {
        if (!booking.sessions || booking.sessions.length === 0) return 'N/A';

        return (
          <div className="flex flex-col gap-1">
            {booking.sessions
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .map((s, index) => (
                <div key={index}>
                  {booking.sessions.length > 1 ? `${index + 1}. ` : ''}
                  {dayjs(s.date).format('YYYY-MM-DD')} ({s.startTime} -{' '}
                  {s.endTime})
                </div>
              ))}
          </div>
        );
      },
    },
    {
      title: 'Deposit Paid',
      key: 'price',
      render: (_: any, booking: IBooking) => <span>${booking.price || 0}</span>,
    },
    {
      title: 'Payment Status',
      key: 'paymentStatus',
      render: (_: any, booking: IBooking) => (
        <span
          className={`capitalize font-medium py-1 px-2 rounded-lg w-fit ${
            booking.paymentStatus === 'succeeded'
              ? 'bg-green-500'
              : booking.paymentStatus === 'pending'
              ? 'bg-amber-400'
              : 'bg-red-400'
          }`}
        >
          {booking.paymentStatus || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Booking Status',
      key: 'status',
      render: (_: any, booking: IBooking) => (
        <div className="flex flex-col gap-2">
          <span
            className={`capitalize font-medium py-1 px-2 rounded-lg w-fit ${
              booking.status === 'completed'
                ? 'bg-green-500'
                : booking.status === 'pending' || booking.status === 'confirmed'
                ? 'bg-amber-400'
                : 'bg-red-400'
            }`}
          >
            {booking.status || 'N/A'}
          </span>

          {booking.status === 'completed' && (
            <Link href={`/review/${booking._id}`}>
              <Button type="primary" size="small">
                Leave Review
              </Button>
            </Link>
          )}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, booking: IBooking) => (
        <div>
          <div
            className="py-2 px-6 rounded-2xl bg-red-500 text-white w-fit"
            onClick={() =>
              showConfirmationModal(
                'Are you sure you want to cancel this booking?',
                () => handleCancelBookingByArtist(booking._id)
              )
            }
          >
            Cancel
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-secondary">
          View and manage your confirmed appointments.
        </p>
      </div>

      <div className="my-5">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#f5f5f5',
              },
            },
          }}
        >
          <Table
            dataSource={bookings}
            columns={baseColumns}
            rowKey="_id"
            pagination={false}
          />
        </ConfigProvider>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={confirmModal.open}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        okText="Yes"
        cancelText="No"
        title={confirmModal.title}
      >
        <p>Please confirm your action.</p>
      </Modal>
    </div>
  );
};

export default Bookings;
