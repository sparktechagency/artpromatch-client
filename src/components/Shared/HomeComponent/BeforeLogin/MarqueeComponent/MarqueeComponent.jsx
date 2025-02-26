import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import React from 'react';
import Marquee from "react-fast-marquee";
const MarqueeCOmponent = () => {
    return (
        <div> 
            <Marquee className=''>
                <div className=' flex justify-between items-center gap-4'>
                    <Image src={AllImages.image} width={300} height={300} alt='logo'></Image>
                    <Image src={AllImages.image1} width={300} height={300} alt='logo'></Image>
                    <Image src={AllImages.image2} width={300} height={300} alt='logo'></Image>
                    <Image src={AllImages.image3} width={300} height={300} alt='logo'></Image>
                    <Image src={AllImages.image4} width={300} height={300} alt='logo'></Image>
                    <Image src={AllImages.image5} width={300} height={300} alt='logo'></Image>
                    <Image src={AllImages.image6} width={300} height={300} alt='logo'></Image>
                    <Image src={AllImages.image7} width={300} height={300} alt='logo'></Image>
                    <Image src={AllImages.image8} width={300} height={300} alt='logo'></Image>

                </div>

            </Marquee>
        </div>
    );
};

export default MarqueeCOmponent; 