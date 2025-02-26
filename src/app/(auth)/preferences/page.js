'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Steps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Preferences = () => {
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
                            className="mb-10 w-full md:w-[600px] bg-white px-2 rounded-2xl"
                        >
                            <div className="mb-4 flex flex-col justify-center items-center text-center">
                                <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                                    What styles of art do you love?
                                </h2>
                                <Typography.Text className=" text-center text-base ">
                                    Pick as many as you’d like.
                                </Typography.Text>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div>
                                    <div className='flex justify-center items-center gap-4'>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Realism</button>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Blackwork</button>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Watercolor</button>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Minimalist</button>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex justify-center items-center gap-4'>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Geometric</button>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Japanese Traditional</button>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Tribal</button>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Neo-Traditional</button>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex justify-center items-center gap-4'>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Portraits</button>
                                        <button className='px-4 py-2 rounded-3xl border hover:border-primary'>Abstract</button>

                                    </div>
                                </div>
                            </div>
                            <Link href="/preferd-location">
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

export default Preferences;