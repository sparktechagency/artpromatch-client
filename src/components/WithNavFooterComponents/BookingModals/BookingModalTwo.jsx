'use client';
import React from 'react';
import { ConfigProvider, DatePicker, Form, Input, Modal, Select, Tag, Upload } from 'antd';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useForm } from 'antd/es/form/Form';
import { Option } from 'antd/es/mentions';
import ReviewBookingModal from './ReviewBookingModal';
const BookingModalTwo = ({ handleOk, handleCancel }) => {
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    }
    const [profilePic, setProfilePic] = useState(null);

    const handleProfilePicUpload = (e) => {
        setProfilePic(e.file.originFileObj);
    };


    const [isModalOpenForReviewBooking, setIsModalOpenForReviewBooking] = useState(false);
    const showModalForReviewBooking = () => {
        setIsModalOpenForReviewBooking(true);
    };

    const handleOkForReviewBooking = () => {
        setIsModalOpenForReviewBooking(false);
    };

    const handleCancelForReviewBooking = () => {
        setIsModalOpenForReviewBooking(false);
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
            <h1 className='text-2xl font-semibold my-'>Tell Alex About Your Tattoo</h1>
            <Form
                name="contact"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                layout="vertical"

            >
                <Form.Item name="service" label={<p className="font-semibold">Where on your body?</p>}>
                    <Select placeholder="Select">
                        <Option value="service1">Body Part 1</Option>
                        <Option value="service2">Body Part 2</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="service" label={<p className="font-semibold">Describe your tattoo idea in detail.</p>}>
                    <Input.TextArea rows={4}></Input.TextArea>
                </Form.Item>
                <Form.Item name="date" label={<p className="font-semibold">Date and Time</p>}>
                    <DatePicker className="w-full" />
                </Form.Item>
                {/* upload image */}
                <Form.Item
                    name="image"
                    label={<p className="font-semibold">Upload Reference Images (Optional)</p>
                    }
                >
                    <div className='border border-dashed w-full rounded-full cursor-pointer flex justify-center items-center py-5'>
                        <Upload

                            showUploadList={false}
                            maxCount={1}
                            beforeUpload={() => false}

                        >
                            <Image src={AllImages.upload} alt='upload' width={30} height={30}></Image>
                        </Upload>
                    </div>

                </Form.Item>


                <Form.Item >
                    <button
                        onClick={showModalForReviewBooking}
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
                <Modal open={isModalOpenForReviewBooking} onOk={handleOkForReviewBooking} onCancel={handleCancelForReviewBooking} footer={false} >
                    <ReviewBookingModal handleOk={handleOkForReviewBooking} handleCancel={handleCancelForReviewBooking} />
                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default BookingModalTwo;