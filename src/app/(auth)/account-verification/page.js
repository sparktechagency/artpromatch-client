"use client";

import Image from "next/image";
import { AllImages } from "@/assets/images/AllImages";
import { useRouter } from "next/navigation";
import {
  useSendOtpAgainMutation,
  useVerifySignUpMutation,
} from "@/redux/features/auth/authApi";
import { Flex, Input, message } from "antd";
import { useState } from "react";

const AccountVerification = () => {
  const router = useRouter();
  const [verifySignUp] = useVerifySignUpMutation();
  const [sendOtpAgain] = useSendOtpAgainMutation();
  const [otp, setOtp] = useState("");

  const onChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await verifySignUp({ otp }).unwrap();
      const accessToken = response?.data?.accessToken;

      if (response.success) {
        message.success(response.message);
        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"), "token from 32");

        localStorage.setItem("token", accessToken);
        console.log(localStorage.getItem("token"), "token from 35");
        router.push("/user-type-selection");
      } else {
        message.error("Invalid OTP.");
      }
    } catch (error) {
      console.log("error", error);
      message.error(error?.data?.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await sendOtpAgain({ otp }).unwrap();
      if (response.success) {
        message.success("OTP sent successfully!");
      } else {
        message.error("Failed to send OTP.");
      }
    } catch (error) {
      console.log("error", error);

      if (error?.data?.message === "jwt expired") {
        message.error("Session expired. Please sign in again.");
        localStorage.removeItem("token");
        // router.push("/sign-in");
        return;
      }

      message.error("Verification failed.");
    }
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="mx-4 md:mx-0 w-auto md:w-[600px]">
        <div className="py-10 px-5 md:px-14">
          <div className="flex flex-col justify-center items-center">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <h1 className="text-3xl text-center font-bold py-5">
              Account Verification
            </h1>
            <p className="text-center">
              To verify your account, please enter the verification code you
              received on your phone.
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Flex gap="middle" align="flex-start" vertical>
              <Input.OTP
                value={otp}
                onChange={onChange}
                formatter={(str) => str.toUpperCase()}
              />
            </Flex>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-3 rounded-xl w-full mt-10"
          >
            Send
          </button>

          <p className="text-center mt-5">
            Didn’t get the code?{" "}
            <span
              onClick={handleResendOtp}
              className="text-primary cursor-pointer"
            >
              Send Again
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
