'use client';

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, Form, Input, Slider, Steps, Tooltip, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaLocationArrow } from "react-icons/fa6";
const PreferedLocation = () => {
    const onFinish = () => {

    }
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const [value, setValue] = useState(8);
    const minValue = 8;
    const maxValue = 436;
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
                                    Where do you want to find artists or studios?
                                </h2>
                                <Typography.Text className=" text-center text-base ">
                                    We’ll prioritize results in these areas.
                                </Typography.Text>
                            </div>
                            <div>
                                <Form.Item
                                    name="address"
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Enter your address"
                                    />
                                </Form.Item>
                                <Form.Item name="password">
                                    <button className='flex justify-center items-center gap-2 text-primary border border-primary w-full py-2 rounded-xl'>
                                        <FaLocationArrow />
                                        <p className='text-sm'>Use my current location</p>
                                    </button>
                                </Form.Item>


                                <Form.Item className="text-center">
                                    <Link href="prefered-service">
                                        <button
                                            className="bg-primary w-full px-6 py-2 rounded-md text-white"
                                            htmlType="submit"
                                        >
                                            Continue
                                        </button>
                                    </Link>
                                    <button
                                        className="mt-5"
                                        htmlType="submit"
                                    >
                                        Skip
                                    </button>
                                </Form.Item>
                            </div>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Slider: {
                                            handleColor: "#6b4f38",
                                            trackBg: "#6b4f38",
                                            railBg: "#e5e7eb",
                                            handleSize: 14,
                                        },
                                    },
                                }}
                            >
                                <div>
                                    <p className="text-gray-700 font-medium">Show results within</p>
                                    <Slider
                                        defaultValue={5}
                                        min={5}
                                        max={100}
                                        tooltip={{ open: false }}
                                    />
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>5 miles</span>
                                        <span>100 Miles</span>
                                    </div>
                                </div>
                            </ConfigProvider>


                        </Form>
                        <div className='mt-5'>
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
        </div >
    );
};

export default PreferedLocation;