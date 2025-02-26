import React from 'react';
import { LuMessageCircleMore } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
const ProfileSideBar = () => {
    return (
        <div className='container mx-auto'>
            <div className='border p-3 rounded-lg mb-5'>
                <h1 className='text-xl font-bold'>Availability & Guest Spots</h1>
                <p className='text-sm font-bold'> Dec 1–5:<span className='font-normal'> Open for bookings.</span></p>
                <p className='text-sm font-bold'> Dec 10–15:<span className='font-normal'>  Guest Spot in Brooklyn</span></p>
                <p className='text-sm font-bold'> Dec 20–30:<span className='font-normal'> Open for bookings .</span></p>
            </div>
            <div className='border p-3 rounded-lg mb-2'>
                <h1 className='text-xl font-bold'>Services</h1>
                <p className='text-sm font-bold'>Hourly Rate<span className='font-normal'> $200/hour</span></p>
                <p className='text-sm font-bold'>Day Rate<span className='font-normal'>  $1000</span></p>
                <p className='text-sm font-bold'>Consultations<span className='font-normal'> $50 (deductible from final price)</span></p>
            </div>
            <div className="border p-3 rounded-lg mb-2">
                <h1 className="text-xl font-bold">Contact Alex Rivera</h1>

                <div className="flex gap-2 text-sm">
                    <LuMessageCircleMore className="h-6 w-6 text-primary" />
                    <div className="font-normal">
                        <p className="font-bold">Direct Message</p>
                        <p>Usually replies in a few minutes</p>
                    </div>
                </div>

                <div className="flex gap-2 text-sm">
                    <IoLocationOutline className="h-6 w-6 text-primary" />
                    <div className="font-normal">
                        <p className="font-bold">Location</p>
                        <p>Based in Brooklyn, NY</p>
                    </div>
                </div>

                <p className="text-sm font-bold flex gap-2">
                    <FiPhone className="h-6 w-6 text-primary" />Phone
                    <span className="font-normal">555-123-4567</span>
                </p>

                <p className="text-sm font-bold flex gap-2">
                    <MdOutlineEmail className="h-6 w-6 text-primary" />Email
                    <span className="font-normal">alexrivera@tattoos.com</span>
                </p>
            </div>

        </div>
    );
};

export default ProfileSideBar;