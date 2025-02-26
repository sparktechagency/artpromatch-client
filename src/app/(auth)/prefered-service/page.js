'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Radio, Steps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const PreferdService = () => {
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    return (
        <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
            <div className="pt-32 pb-16">
                <div className="">
                    <div className="w-[600px]">
                        <Form
                            name="select-user-type"
                            initialValues={{ remember: true }}
                            layout="vertical"
                            className="mb-10"
                        >
                            <div className="mb-4 flex flex-col justify-center items-center text-center">
                                <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                                    What services are you looking for?
                                </h2>
                                <Typography.Text className=" text-center text-base ">
                                    Select all that apply.
                                </Typography.Text>
                            </div>
                            <div className='flex justify-center items-center gap-20'>
                                <div className='flex flex-col gap-2'>
                                    <Radio>Tattoos</Radio>
                                    <Radio>Custom Designs</Radio>
                                    <Radio>Touch-ups</Radio>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Radio>Piercings</Radio>
                                    <Radio>Cover-ups</Radio>
                                    <Radio>Guest Spots</Radio>
                                </div>

                            </div>
                            <Link href="/stay-updated">
                                <button className='w-full bg-primary text-white py-3 rounded-lg mt-5'>Get Started</button>
                            </Link>
                            <button className='w-full mt-5'>Skip</button>

                        </Form>
                        <Steps
                            current={current}
                            onChange={onChange}
                            direction="horizontal"
                            size="small"
                            items={[
                                {
                                    title: '',
                                    status: 'finish',
                                },
                                {
                                    title: '',
                                    status: current >= 1 ? 'finish' : 'wait',
                                },
                                {
                                    title: '',
                                    status: current >= 2 ? 'finish' : 'wait',
                                },
                                {
                                    title: '',
                                    status: current >= 3 ? 'finish' : 'wait',
                                },
                            ]}
                            style={{
                                width: '100%',
                            }}
                        />

                    </div>
                </div>
            </div>
        </div >
    );
};

export default PreferdService;