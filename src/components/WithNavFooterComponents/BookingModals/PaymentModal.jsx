'use client'

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, DatePicker, Form, Input, InputNumber, Modal, Select, Tag } from 'antd';
import { Option } from 'antd/es/mentions';
import Image from 'next/image';
import React, { useState } from 'react';
import ReviewBookingModal from './ReviewBookingModal';
import ConfirmModal from './ConfirmModal';

const PaymentModal = ({ handleOk, handleCancel }) => {
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    }


    const [isModalOpenForConfirm, setIsModalOpenForConfirm] = useState(false);
    const showModalForConfirm = () => {
        setIsModalOpenForConfirm(true);
    };

    const handleOkForConfirm = () => {
        setIsModalOpenForConfirm(false);
    };

    const handleCancelForConfirm = () => {
        setIsModalOpenForConfirm(false);
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
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold my-'>Secure Your Booking</h1>
                    <p>A deposit is required to secure your appointment.</p>
                </div>
                <h1 className='text-xl font-bold text-primary'>$50.00</h1>
            </div>



            <div className='my-5'>
                <div className='flex justify-start items-center gap-5 border-0 border-b mb-2 pb-2'>
                    <div className='border p-2 rounded-xl h-16 w-20 flex flex-col justify-center items-center hover:border-primary'>
                        <Image src={AllImages.VisaMastercard} height={0} width={0} alt='card' className='object-contain h-5 w-14'></Image>
                        <p>Card</p>
                    </div>
                    <div className='border p-2 rounded-xl h-16 w-20 flex flex-col justify-center items-center hover:border-primary'>
                        <Image src={AllImages.Paypal} height={0} width={0} alt='card' object-contain h-5 w-14></Image>
                        <p>Paypal</p>
                    </div>
                </div>
                <Form
                    name="contact"
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    layout="vertical"

                >
                    <Form.Item name="service" label={<p className="font-semibold">Card Number</p>}>
                        <div className='flex justify-between items-center gap-2 rounded-xl'>
                            <InputNumber placeholder="1234 1234 1234 1234" style={{ width: '100%' }} />
                            <div className='flex gap-2'>
                                <Image src={AllImages.visa} height={0} width={0} alt='card' className='object-contain h-5 w-14'></Image>
                                <Image src={AllImages.Mastercard} height={0} width={0} alt='card' className='object-contain h-5 w-14'></Image>
                                <Image src={AllImages.AMEX} height={0} width={0} alt='card' className='object-contain h-5 w-14'></Image>
                                <Image src={AllImages.Discover} height={0} width={0} alt='card' className='object-contain h-5 w-14'></Image>
                            </div>
                        </div>
                    </Form.Item>
                    <div className='flex justify-between items-center gap-2 rounded-xl'>
                        <Form.Item name="expiry" label={<p className="font-semibold">Expiry</p>}>
                            <Input placeholder='MM/YY'></Input>
                        </Form.Item>
                        <Form.Item name="CVC" label={<p className="font-semibold">CVC</p>}>
                            <Input placeholder='000'></Input>
                        </Form.Item>
                    </div>
                    <div className='flex justify-between items-center gap-2 rounded-xl'>
                        <Form.Item name="Country" label={<p className="font-semibold">Country</p>}>
                            <Input placeholder='Country'></Input>
                        </Form.Item>
                        <Form.Item name="Zip Code" label={<p className="font-semibold">Zip Code</p>}>
                            <Input placeholder='000'></Input>
                        </Form.Item>
                    </div>
                    <Form.Item >
                        <button
                            onClick={showModalForConfirm}
                            className="w-full py-2 bg-primary rounded-xl  text-white font-semiboldbold md:text-xl  shadow-lg"
                            type="submit"
                        >
                            Pay & Confirm Booking
                        </button>
                    </Form.Item>
                </Form>
            </div>

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
                <Modal open={isModalOpenForConfirm} onOk={handleOkForConfirm} onCancel={handleCancelForConfirm} footer={false} >
                    <ConfirmModal handleOk={handleOkForConfirm} handleCancel={handleCancelForConfirm} />
                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default PaymentModal; 