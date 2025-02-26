'use client';

import React from "react";
import { Flex, Input } from "antd";

import Title from "antd/es/skeleton/Title";
import Image from "next/image";
import { AllImages } from "@/assets/images/AllImages";
import Link from "next/link";

const Otp = () => {
    const onChange = (text) => {
        console.log('onChange:', text);
    };
    const onInput = (value) => {
        console.log('onInput:', value);
    };
    const sharedProps = {
        onChange,
        onInput,
    };

    return (
        <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
            <div className="mx-4 md:mx-0 w-auto md:w-[600px]">
                <div className=" py-10 px-5 md:px-14">
                    <div className="flex flex-col justify-center items-center">
                        <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                        <h1 className="text-3xl text-center font-bold py-5">
                            OTP
                        </h1>
                        <p className="text-center">
                            To reset you account, please enter the verification code you get  on your phone number +123456790.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Flex gap="middle" align="flex-start" vertical>
                            <Title level={5}>With formatter (Upcase)</Title>
                            <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
                        </Flex>
                    </div>
                    <Link href="/user-type-selection">
                        <button className="bg-primary text-white py-3 rounded-xl w-full mt-10">Send</button>
                    </Link>
                    <p className="text-center mt-5">Don’tget Code? <a href="/sign-up" className="text-primary">Send Again</a> </p>
                </div>
            </div>
        </div>
    );
};

export default Otp;