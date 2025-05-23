"use client";
/* eslint-disable react/no-unescaped-entities */

import { AllImages } from "@/assets/images/AllImages";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { Form, Input, message, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SignUp = () => {
  const router = useRouter();
  const [signUp, {isLoading}] = useSignUpMutation();
  const onFinish =  (values) => {

      const userInfo = {
        fullName: values.name,
        email: values.email,
        phoneNumber: values.phone,
        password: values.password,
      }

      signUp(userInfo).unwrap().then((res) => {
        localStorage.setItem("token", res?.data?.token);
        message.success("User Registered Successfully");
        router.push("/account-verification");
      }).catch((error) => {
        message.error(error?.data?.message)
      });

  };

  return (
    <div className="container mx-auto my-10 md:my-40">
      <div className="flex justify-center items-center">
        <div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 550 }}
            onFinish={onFinish}
            layout="vertical"
            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image
                src={AllImages.logo}
                width={50}
                height={50}
                alt="logo"
              ></Image>
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                Create Account
              </h2>
              <Typography.Text className=" text-center text-base ">
                Register for Your Account Instantly!
              </Typography.Text>
            </div>

            <Form.Item
              name="name"
              label={<p className=" text-md">Enter your Full Name</p>}
              style={{}}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Olivia Reiss"
              />
            </Form.Item>
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
            <Form.Item
              name="phone"
              label={<p className=" text-md">Enter your Phone Number</p>}
              style={{}}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="oliviareiss91@gmail.com"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={
                <p className=" text-md">
                  Choose a password with at least 8 characters.
                </p>
              }
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <p className=" text-center mb-5">
              Already have an Account?
              <Link href="/sign-in" className=" pl-2">
                Sign In
              </Link>
            </p>
            <Form.Item className="text-center">
              <button
                className="bg-primary w-full px-6 py-2 rounded-md text-white"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                Create Account
              </button>
            </Form.Item>
            <p className="text-center my-6"> Or Sign up with</p>
            <Form.Item className="text-center">
              <button
                className="border w-full px-6 py-2 rounded-md text-primary flex justify-center items-center gap-5"
                htmlType="submit"
              >
                <Image
                  src={AllImages.google}
                  width={20}
                  height={20}
                  alt="logo"
                ></Image>
                Login with Google
              </button>
            </Form.Item>
            {/* <SocialLogin /> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
