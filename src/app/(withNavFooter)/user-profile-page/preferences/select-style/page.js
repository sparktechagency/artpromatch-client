"use client";

import { AllImages } from "@/assets/images/AllImages";
import { Form, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SelectStyle = () => {
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">
          Select Your Favorite Tattoo Styles
        </h1>
        <p className="text-textSecondary">
          Choose the tattoo styles you love the most.
        </p>
      </div>
    
        <div className="">
          <Form
            name="select-user-type"
            initialValues={{ remember: true }}
            layout="vertical"
            className="mb-10"
          >
              <div className="grid grid-cols-5 gap-4  mb-5">
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Realism
                  </button>
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Blackwork
                  </button>
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Watercolor
                  </button>
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Minimalist
                  </button>

                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Geometric
                  </button>
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Japanese Traditional
                  </button>
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Tribal
                  </button>
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Neo-Traditional
                  </button>
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Portraits
                  </button>
                  <button className="px-8 py-2 rounded-3xl border hover:border-primary">
                    Abstract
                  </button>
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

export default SelectStyle;
