'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Radio, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserTypeSelection = () => {

    return (
        <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
            <div className="pt-32 pb-16">
                <div className="">
                    <div className="w-[450px]">
                        <Form
                            name="select-user-type"
                            initialValues={{ remember: true }}
                            layout="vertical"
                            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
                        >
                            <div className="mb-4 flex flex-col justify-center items-center text-center">
                                <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                                    How will you use Steady Hands?
                                </h2>
                                <Typography.Text className=" text-center text-base ">
                                    Choose the role that fits you best. You can always expand your role later.
                                </Typography.Text>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Radio >
                                    <div className='border hover:border-primary rounded-lg p-6'>
                                        <h1 className='text-xl font-bold'>Client</h1>
                                        <p className=''>Discover and book talented artists and piercers near you or worldwide. Save your favorites, explore guest spots, and manage appointments. </p>
                                    </div>
                                </Radio>
                                <Radio>
                                    <div className='border hover:border-primary rounded-lg p-6'>
                                        <h1 className='text-xl font-bold'>Client</h1>
                                        <p className=''>Discover and book talented artists and piercers near you or worldwide. Save your favorites, explore guest spots, and manage appointments. </p>
                                    </div>
                                </Radio>
                                <Radio>
                                    <div className='border hover:border-primary rounded-lg p-6'>
                                        <h1 className='text-xl font-bold'>Client</h1>
                                        <p className=''>Discover and book talented artists and piercers near you or worldwide. Save your favorites, explore guest spots, and manage appointments. </p>
                                    </div>
                                </Radio>
                            </div>
                            <Link href="/preference-selection">
                                <button className='w-full bg-primary text-white py-3 rounded-lg mt-5'>Continue</button>
                            </Link>
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTypeSelection;