import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';

const Button = () => {
    return (
        <div className='flex justify-center items-center gap-2'>
            <button className='px-3 py-1 rounded-xl border'><CiHeart className='h-4 w-4 ' /></button>
            <button className='px-3 py-1 rounded-xl border flex justify-center items-center gap-2'><AiOutlineMessage className='h-4 w-4 ' />Message</button>
            <button className='px-3 py-1 rounded-xl border flex justify-center items-center gap-2 bg-primary text-white'><SlCalender className='h-4 w-4 ' />Book Now</button>
        </div>
    );
};

export default Button;