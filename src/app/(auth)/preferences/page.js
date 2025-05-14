"use client";

import { AllImages } from "@/assets/images/AllImages";
import { Form, Steps, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Preferences = () => {
  const [current, setCurrent] = useState(0);
  const [selectedArt, setSelectedArt] = useState([]);
  console.log("selectedArt", selectedArt);
  const handleSelect = (value) => {
    setSelectedArt((prevSelectedArt) =>
      prevSelectedArt.includes(value)
        ? prevSelectedArt.filter((item) => item !== value)
        : [...prevSelectedArt, value]
    );
  };

  const SearchParams = useSearchParams();
  const role = SearchParams.get("role");

  const onChange = (value) => {
    setCurrent(value);
  };

  const artStyles = [
    "Realism",
    "Blackwork",
    "Watercolor",
    "Minimalist",
    "Geometric",
    "Japanese Traditional",
    "Tribal",
    "Neo-Traditional",
    "Portraits",
    "Abstract",
  ];



  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-[600px]">
          <Form
            name="select-user-type"
            initialValues={{ remember: true }}
            layout="vertical"
            className="mb-10 w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                What styles of art do you love?
              </h2>
              <Typography.Text className="text-center text-base">
                Pick as many as you’d like.
              </Typography.Text>
            </div>

            {/* Buttons in groups of 4 */}
            <div className="flex flex-col gap-4">
              {Array.from(
                { length: Math.ceil(artStyles.length / 4) },
                (_, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center gap-4 flex-wrap"
                  >
                    {artStyles.slice(i * 4, i * 4 + 4).map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleSelect(style)}
                        className={`px-4 py-2 rounded-3xl border ${
                          selectedArt.includes(style)
                            ? "border-primary text-primary font-semibold"
                            : "hover:border-primary"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Navigation buttons */}
            <Link
              href={{
                pathname: "/preferd-location",
                query: { art: selectedArt.join(",") },
              }}
            >
              <button className="w-full bg-primary text-white py-3 rounded-lg mt-5">
                Get Started
              </button>
            </Link>

            <button className="w-full mt-5">Skip</button>
          </Form>

          {/* Steps */}
          <Steps
            current={current}
            onChange={onChange}
            direction="horizontal"
            size="small"
            items={[
              { title: "", status: "finish" },
              { title: "", status: current >= 1 ? "finish" : "wait" },
              { title: "", status: current >= 2 ? "finish" : "wait" },
              { title: "", status: current >= 3 ? "finish" : "wait" },
            ]}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preferences;
