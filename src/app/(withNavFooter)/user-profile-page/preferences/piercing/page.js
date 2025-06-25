"use client";

import { Form } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const PiercingPage = () => {
  const [selectedPerasing, setSeletedPearsing] = useState([]);
  // console.log("selectedPerasing", selectedPerasing);

  localStorage.setItem("selectedPerasing", JSON.stringify(selectedPerasing));
  const preferedPerasing = [
    "Ear Lobe",
    " Lip (Labret, Monroe)",
    " Triple Helix",
    "  Industrial",
    "Septum",
    " Nose Nostril",
    " Tongue",
    "   Nasallang",
    "  Blackwork",
    "  Traguss",
    "   Conch",
  ];

  const handleSelect = (value) => {
    setSeletedPearsing((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">Select Your Favorite Piercings</h1>
        <p className="text-textSecondary">
          Pick the ones that match your vibe.
        </p>
      </div>

      <div className="">
        <Form
          name="select-pearsing"
          initialValues={{ remember: true }}
          layout="vertical w-full"
          className="mb-10"
        >
          {/* <div className="grid grid-cols-5 gap-4  mb-5">
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Ear Lobe
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Lip (Labret, Monroe)
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Triple Helix
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Industrial
            </button>

            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Septum
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Nose Nostril
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Tongue
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Nasallang
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Blackwork
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Traguss
            </button>
            <button className="px-8 py-2 rounded-3xl border hover:border-primary">
              Conch
            </button>
          </div> */}

          <div className="flex flex-col gap-4">
            {Array.from(
              { length: Math.ceil(preferedPerasing.length / 6) },
              (_, i) => (
                <div
                  key={i}
                  className="flex justify-start items-center gap-4 flex-wrap"
                >
                  {preferedPerasing.slice(i * 6, i * 6 + 6).map((pearsing) => (
                    <button
                      key={pearsing}
                      type="button"
                      onClick={() => handleSelect(pearsing)}
                      className={`px-8 py-2 rounded-3xl border hover:border-primary ${
                        selectedPerasing.includes(pearsing)
                          ? "border-primary text-primary font-semibold"
                          : "hover:border-primary"
                      }`}
                    >
                      {pearsing}
                    </button>
                  ))}
                </div>
              )
            )}
          </div>

          <Link href="/user-profile-page/preferences">
            <div className=" flex justify-end items-end">
              <button className="bg-primary text-white py-3 px-6 rounded-lg clear-start">
                Save
              </button>
            </div>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default PiercingPage;
