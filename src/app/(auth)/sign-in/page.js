'use client'
/* eslint-disable react/no-unescaped-entities */

import { AllImages } from '@/assets/images/AllImages';
import GooleLogin from '@/components/Shared/SocialLogin/GooleLogin';
import { Checkbox, Form, Input, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SignIn = () => {
    const onFinish = (values) => {
        console.log(values)
    }
    return (
        <div className='container mx-auto my-10 md:my-40'>
            <div className='flex justify-center items-center'>
                <div>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        style={{ maxWidth: 800 }}
                        onFinish={onFinish}
                        layout="vertical"
                        className=""
                    >
                        <div className="mb-4 flex flex-col justify-center items-center text-center">
                            <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                            <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                                Sign In
                            </h2>
                            <Typography.Text className=" text-center text-base ">
                                Sign in if you already have an account.
                            </Typography.Text>
                        </div>

                        <Form.Item
                            name="email"
                            label={<p className=" text-md">Enter your email</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="oliviareiss91@gmail.com"
                            />
                        </Form.Item>
                        <Form.Item name="password" label={<p className=" text-md">Enter your Password</p>}>
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className="flex items-center justify-between">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox
                                        required
                                        className="text-md hover: text-md"
                                    >
                                        Accept terms of services
                                    </Checkbox>
                                </Form.Item>
                                <p className=" text-primary">
                                    <Link href="/forgot-password">Forgot Password</Link>
                                </p>
                            </div>
                        </Form.Item>

                        <Form.Item className="text-center">
                            <button
                                className="bg-primary w-full px-6 py-2 rounded-md text-white"
                                htmlType="submit"
                            >
                                Continue
                            </button>
                        </Form.Item>
                        <p className=' text-center my-4 '> or SIgn in With</p>
                        <Form.Item className="text-center">
                            <button
                                className="border w-full px-6 py-2 rounded-md text-primary flex justify-center items-center gap-5"
                                htmlType="submit"
                            >
                                <Image src={AllImages.google} width={20} height={20} alt='logo'></Image>
                                Login with Google
                            </button>
                        </Form.Item>
                        <p className=" text-center mb-5">
                            Don't have an Account?
                            <Link href="/sign-up" className=" pl-2">
                                Sign Up
                            </Link>
                        </p>

                        {/* <GooleLogin /> */}
                    </Form>
                </div>
            </div>

        </div>
    );
};

export default SignIn;