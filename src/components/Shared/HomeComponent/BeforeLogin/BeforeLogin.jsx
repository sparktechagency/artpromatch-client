'use client';
import { AllImages } from '@/assets/images/AllImages';
import { Typography } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import MarqueeCOmponent from './MarqueeComponent/MarqueeComponent';
import FeaturedTatuArtists from './FeaturedTatoArtists/FeaturedTatuArtists';
import FeaturedPiercingArtist from './FeaturedPiercingArtist/FeaturedPiercingArtist';
import NearYou from './NearYou/NearYou';
import WantATattto from './WantATatto/WantATattto';
import PiercingNow from './PiercingNow/PiercingNow';
import Testimonials from './Testimonials/Testimonials';
import SteadyHands from './StaedyHands/SteadyHands';
import Link from 'next/link';

const BeforeLogin = () => {
    return (
        <div className='container mx-auto px-2 md:px-0'>
            <div className="mb-4 flex flex-col justify-center items-center text-center pt-16 bg-[#fafafa] border rounded-lg">
                <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                <h2 className="text-center md:text-6xl font-bold mt-6 mb-2 ">
                    Your next masterpiece <br /> starts here
                </h2>
                <Typography.Text className="md:text-xl text-center text-primary mt-3 md:mb-10 ">
                    Discover tattoo artists, piercers, and studios tailored to <br /> your preferences.
                </Typography.Text>
                <div className='flex flex-col md:flex-row justify-center items-center md:gap-5 mb-20'>
                    <Link href="/sign-in">
                        <button className='bg-black text-white py-3 px-6 rounded-lg mt-5'>Book Artist Now</button>
                    </Link>
                    <Link href="/sign-in">
                        <button className='bg-primary text-white py-3 px-6 rounded-lg mt-5 flex justify-center items-center gap-2'>Explore Guest Spot <IoIosArrowForward /></button>
                    </Link>
                </div>
                <MarqueeCOmponent />
            </div>
            <FeaturedTatuArtists />
            <FeaturedPiercingArtist />
            <NearYou />
            <WantATattto />
            <PiercingNow />
            <Testimonials />
            <SteadyHands />
        </div>
    );
};

export default BeforeLogin;