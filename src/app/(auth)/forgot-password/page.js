"use client";

import { AllImages } from "@/assets/images/AllImages";
import { Form, Input, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMailOpenOutline } from "react-icons/io5";

const ForgotPassword = () => {
    const onFinish = () => {

    }
    return (
        <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
            <div className="pt-32 pb-16">
                <div className="">
                    <div className="w-[450px]">

                        <Form
                            name="login"
                            initialValues={{ remember: true }}
                      
                            onFinish={onFinish}
                            layout="vertical"
                            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
                        >
                            <div className="mb-4 flex flex-col justify-center items-center text-center">
                                <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                                    Forgot Password
                                </h2>
                                <Typography.Text className=" text-center text-base ">
                                    To reset your password, please enter the email address. You’ll get the link on your email.
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



                            <Form.Item className="text-center">
                                <Link href="/otp">
                                <button
                                    className="bg-primary w-full px-6 py-2 rounded-md text-white"
                                    htmlType="submit"
                                >
                                    Continue
                                </button>
                                </Link>
                            </Form.Item>


                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
