'use client'

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, DatePicker, Form, Image, Input, Modal, Select, Tag, Upload } from 'antd';
// import { Option } from 'antd/es/mentions';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa6';
import PaymentModal from './PaymentModal';

const ReviewBookingModal = ({ handleOk, handleCancel }) => {
    // const router = useRouter();
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    }
    const handleEdit = () => {
        // it will go back to the previous modal:
        router.back();
    }

    const [isModalOpenForPayment, setIsModalOpenForPayment] = useState(false);
    const showModalForPayment = () => {
        setIsModalOpenForPayment(true);
    };

    const handleOkForPayment = () => {
        setIsModalOpenForPayment(false);
    };

    const handleCancelForPayment = () => {
        setIsModalOpenForPayment(false);
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
            <h1 className='text-2xl font-bold my-'>Review Booking</h1>

            {/* TODO: EDIT MOdal */}

            <div className='my-5'>
                <div className='flex justify-between items-center border-0 border-b mb-2'>
                    <p>Artist:</p>
                    <p>Alex Rivera</p>
                </div>
                <div className='flex justify-between items-center border-0 border-b mb-2'>
                    <p>Service</p>

                    <p className='flex items-center gap-2'><FaPen onClick={handleEdit} className='bg-primary text-white p-1 rounded-full h-5 w-5'></FaPen> Realism Tattoo</p>
                </div>
                <div className='flex justify-between items-center border-0 border-b mb-2'>
                    <p>Date & Time</p>
                    <p className='flex items-center gap-2'><FaPen onClick={handleEdit} className='bg-primary text-white p-1 rounded-full h-5 w-5'></FaPen> Dec 10, 2024, at 11:30 AM</p>
                </div>
                <div className='flex justify-between items-center border-0 border-b'>
                    <p>Estimated Cost</p>
                    <p>$400 (2 hours)</p>
                </div>
            </div>
            <button
                onClick={showModalForPayment}
                className="w-full py-2 bg-primary rounded-xl  text-white font-semiboldbold md:text-xl  shadow-lg"
                type="submit"
            >
                Proceed to Payment
            </button>
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
                <Modal open={isModalOpenForPayment} onOk={handleOkForPayment} onCancel={handleCancelForPayment} footer={false} >
                    <PaymentModal handleOk={handleOkForPayment} handleCancel={handleCancelForPayment} />
                </Modal>
            </ConfigProvider>

        </div>
    );
};

export default ReviewBookingModal;