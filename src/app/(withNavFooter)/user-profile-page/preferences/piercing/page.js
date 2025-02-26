"use client";

import { Form, } from "antd";
import Link from "next/link";
import React from "react";

const PiercingPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">
        Select Your Favorite Piercings
        </h1>
        <p className="text-textSecondary">
        Pick the ones that match your vibe.
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
