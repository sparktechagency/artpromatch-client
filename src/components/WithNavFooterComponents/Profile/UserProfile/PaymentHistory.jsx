'use client'
import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import React from 'react';
import { SlCalender } from "react-icons/sl";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { Table, Tag } from "antd";
const PaymentHistory = () => {
    const data = [
        {
            key: "1",
            artist: "Demo Artist Name",
            billingDate: "Dec 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {
            key: "2",
            artist: "Demo Artist Name",
            billingDate: "Nov 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {
            key: "3",
            artist: "Demo Artist Name",
            billingDate: "Oct 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {
            key: "4",
            artist: "Demo Artist Name",
            billingDate: "Sep 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {
            key: "5",
            artist: "Demo Artist Name",
            billingDate: "Aug 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {
            key: "6",
            artist: "Demo Artist Name",
            billingDate: "Jul 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {
            key: "7",
            artist: "Demo Artist Name",
            billingDate: "Jul 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {
            key: "8",
            artist: "Demo Artist Name",
            billingDate: "Jul 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
        {
            key: "9",
            artist: "Demo Artist Name",
            billingDate: "Jun 1, 2022",
            service: "Realism Tattoo",
            amount: "$50.00",
            status: "Paid",
        },
    ];
    const columns = [
        {
            title: "Artist",
            dataIndex: "artist",
            key: "artist",
        },
        {
            title: "Billing date",
            dataIndex: "billingDate",
            key: "billingDate",
            defaultSortOrder: "descend",
            sorter: (a, b) => new Date(a.billingDate) - new Date(b.billingDate),
        },
        {
            title: "Service",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color="green">
                    ✅ {status}
                </Tag>
            ),
        },
    ];

    return (
        <div>
            <div className=" flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image className="rounded-full" src={AllImages.user} height={100} width={100} alt="user" />
                    <div className="">
                        <h1 className="text-xl font-bold">Alex Rivera</h1>
                        <p className="text-neutral-400">Update your profile information</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-10 py-2 rounded-xl border hover:border-primary hover:text-primary">
                        <HiOutlineBars3BottomLeft />All Bookings
                    </button>
                    <button className="flex items-center gap-2 px-10 py-2 rounded-xl border hover:border-primary hover:text-primary">
                        <SlCalender /> Remove
                    </button>
                </div>
            </div>
            <div className='mt-5 mb-4 border rounded-xl p-4 flex justify-between items-center '>
                <div className='flex items-center gap-3'>
                    <Image src={AllImages.visa} alt='visa' height={50} width={50}></Image>
                    <div className='text-textSecondary'>
                        <h3>Visa ending in 1234</h3>
                        <h4>Expiry 06/2024</h4>
                    </div>
                </div>
                <button className=' px-4 py-2 rounded-xl border'>Edit</button>
            </div>
            <div>
                <Table columns={columns} dataSource={data} bordered />
            </div>
        </div>
    );
};

export default PaymentHistory;