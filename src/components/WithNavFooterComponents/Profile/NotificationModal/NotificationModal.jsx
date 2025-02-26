import { AllImages } from '@/assets/images/AllImages';
import { Tag } from 'antd';
import Image from 'next/image';
import React from 'react';

const NotificationModal = ({ handleOk, handleCancel }) => {
    return (
        <div>
            <h1 className='text-xl font-bold border-0 border-b pb-2 '>(0) Notifications</h1>
            <div className="flex items-center gap-3 border-0 border-b pb-2 mb-2">
                <Image
                    src={AllImages.user}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-neutral-600">Your booking with Alex Rivera for Dec 10, 2024, at 11:30 AM has been confirmed!</h3>
                    <p className="text-gray-500 text-sm">3 days ago</p>
                </div>
            </div>
            <div className="flex items-center gap-3 border-0 border-b pb-2 mb-2">
                <Image
                    src={AllImages.user}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-neutral-600">Your booking with Alex Rivera for Dec 10, 2024, at 11:30 AM has been confirmed!</h3>
                    <p className="text-gray-500 text-sm">3 days ago</p>
                </div>
            </div>
            <div className="flex items-center gap-3 border-0 border-b pb-2 mb-2">
                <Image
                    src={AllImages.user}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-neutral-600">Your booking with Alex Rivera for Dec 10, 2024, at 11:30 AM has been confirmed!</h3>
                    <p className="text-gray-500 text-sm">3 days ago</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;