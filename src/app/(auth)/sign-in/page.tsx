/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AllImages } from "@/assets/images/AllImages";
import { loginUser } from "@/services/AuthService";
import { Checkbox, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type SignInFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const SignIn: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: SignInFormValues) => {
    try {
      const res = await loginUser(values);
      console.log("res:", res);
      localStorage.setItem("accessToken", res?.data?.accessToken);
      if (res.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto my-10 md:my-40">
      <div className="flex justify-center items-center">
        <div>
          <Form
            name="login"
            initialValues={{ remember: true }}
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
                Sign In
              </h2>
              <div className="text-center text-base">
                Sign in if you already have an account.
              </div>
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
            <Form.Item
              name="password"
              label={<p className=" text-md">Enter your Password</p>}
            >
              <Input.Password
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
                  <Checkbox required className="text-md hover: text-md">
                    Accept terms of services
                  </Checkbox>
                </Form.Item>
                <p className=" text-primary">
                  <Link href="/forgot-password">Forgot Password</Link>
                </p>
              </div>
            </Form.Item>

            <Form.Item className="text-center">
              <div className="bg-primary w-full px-6 py-2 rounded-md text-white">
                <button type="submit">Continue</button>
              </div>
            </Form.Item>
            <p className=" text-center my-4 "> or SIgn in With</p>
            <Form.Item className="text-center">
              <button type="submit">
                <div className="border w-full px-6 py-2 rounded-md text-primary flex justify-center items-center gap-5">
                  <Image
                    src={AllImages.google}
                    width={20}
                    height={20}
                    alt="logo"
                  ></Image>
                  Login with Google
                </div>
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
