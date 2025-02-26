'use client';
import React, { useState } from 'react';
import { ConfigProvider, DatePicker, Form, Input, Modal, Select, Tag, Upload } from 'antd';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import BookingModalTwo from './BookingModalTwo';
import { Option } from 'antd/es/mentions';
import Link from 'next/link';
const BookingModalOne = ({ handleOk, handleCancel }) => {
    const onFinish = (values) => {
        // console.log('Received values of form:', values);
    }
    const handleProfilePicUpload = () => {

    }

    // step 2 Modal:
    const [isModalOpenForStepTwo, setIsModalOpenForStepTwo] = useState(false);
    const showModalForStepTwo = () => {
        setIsModalOpenForStepTwo(true);
    };

    const handleOkForStepTwo = () => {
        setIsModalOpenForStepTwo(false);
    };

    const handleCancelForStepTwo = () => {
        setIsModalOpenForStepTwo(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4  border-0 border-b">
                <div className="flex items-center gap-3">
                    <Image
                        src={AllImages.user}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">Alex Rivera</h3>
                        <p className="text-gray-500 text-sm">Brooklyn, NY</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Tag color="green">Available Now</Tag>
                </div>
            </div>
            <h1 className='text-2xl font-bold my-'>Book Your Session</h1>
            <Form
                name="contact"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                layout="vertical"

            >
                <Form.Item name="service" label={<p className="font-bold">Choose a Service</p>}>
                    <Select placeholder="Select">
                        <Option value="service1">Service 1</Option>
                        <Option value="service2">Service 2</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="service" label={<p className="font-bold">Service Type</p>}>
                    <Select placeholder="Select">
                        <Option value="service1">Service Type 1</Option>
                        <Option value="service2">Service Type 2</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="date" label={<div className="font-bold flex justify-between items-center gap-60">
                    <p>Date and Time</p>
                    <Link href="/booking-availablity">
                        <p className='text-primary underline'>Check Availablity</p>
                    </Link>
                </div>}>
                    <DatePicker className="w-full" />
                </Form.Item>
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <p>Morning</p>
                    </div>
                    <div >
                        <p className='flex justify-center items-center border border-dashed px-2 py-1 rounded-lg'>10:00 AM -11:30 AM</p>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <p>Afternoon</p>
                    </div>
                    <div className=''>
                        <p className='flex justify-center items-center border border-dashed px-2 py-1 rounded-lg'>10:00 AM -11:30 AM</p>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <div>
                        <p>Evening</p>
                    </div>
                    <div className=''>
                        <p className='flex justify-center items-center border border-dashed px-2 py-1 rounded-lg'>10:00 AM -11:30 AM</p>
                    </div>
                </div>

                <Form.Item >
                    <button
                        onClick={showModalForStepTwo}
                        className="w-full py-2 bg-primary rounded-xl  text-white font-semiboldbold md:text-xl  shadow-lg"
                        type="submit"
                    >
                        Next
                    </button>
                </Form.Item>
            </Form>

            <ConfigProvider
                theme={{
                    components: {
                        "Button": {
                            "defaultHoverBorderColor": "rgb(47,84,235)",
                            "defaultHoverColor": "rgb(47,84,235)",
                            "defaultBorderColor": "rgb(47,84,235)"
                        }
                    }
                }}
            >
                {/* modal for add program */}
                <Modal open={isModalOpenForStepTwo} onOk={handleOkForStepTwo} onCancel={handleCancelForStepTwo} footer={false} >
                    <BookingModalTwo handleOk={handleOkForStepTwo} handleCancel={handleCancelForStepTwo} />
                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default BookingModalOne;