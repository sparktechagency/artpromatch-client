import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
         <div className='bg-[#181818] p-5'>
            <div className=' text-white md:mt-16'>
                <div className='flex justify-center items-center gap-2 mb-10'>
                    <Image src={AllImages.logo} alt='footer' height={30} width={30}></Image>
                    <p className='mt-3'>Staedy Hands </p>
                </div>
                <div className='max-w-screen-sm mx-auto flex flex-col md:flex-row justify-between items-center gap-5 mt-3 md:mb-16'>
                    <p>About Us</p>
                    <p>Privacy Policy</p>
                    <p>FAQs</p>
                    <p>Terms And Conditions</p>
                    <p>Contact us</p>
                </div>
                <hr className='container mx-auto' />
                <div className='container mx-auto flex flex-col md:flex-row justify-between items-center my-10 md:my-16'>
                    <p>© 2024 Steady Hands. All rights reserved.</p>
                    <div className='flex items-center gap-2'>
                        <Image src={AllImages.x} alt='x' height={30} width={30}></Image>
                        <Image src={AllImages.fb} alt='fb' height={30} width={30}></Image>
                        <Image src={AllImages.insta} alt='insta' height={30} width={30}></Image>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer; 