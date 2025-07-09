"use client";

import { Form } from "antd";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const SelectStyle = () => {
  const router = useRouter();
  const [UpdatedSelectedArt, setUpdatedSelectedArt] = useState([]);
  console.log("UpdatedSelectedArt", UpdatedSelectedArt);
  localStorage.setItem(
    "UpdatedSelectedArt",
    JSON.stringify(UpdatedSelectedArt)
  );
  const [current, setCurrent] = useState(0);
  const handleSubmit = () => {
    router.back();
  };
 const artStyles = [
  "American Traditional",
  "Neo Traditional",
  "Traditional",
  "Pacific Islander/Polynesian",
  "Tatau",
  "Maori",
  "African",
  "Native American",
  "Black & Grey",
  "Portrait",
  "Realism",
  "Abstract",
  "Blackwork",
  "Heavy Blackwork",
  "Brutal Blackwork",
  "Ignorant",
  "Anime",
  "White on Black",
  "White tattoos",
  "Black trash",
  "Trash Polka",
  "Blackout",
  "Script",
  "Lettering",
  "Fine Line",
  "Calligraphy",
  "Ornamental",
  "Watercolor",
  "Geometric",
  "Japanese style",
  "Irezumi",
  "Tebori",
  "Tribal",
  "Neo Tribal",
  "New School",
  "Old School",
  "Illustrative",
  "Minimalist",
  "Lineart",
  "Botanical",
  "Realistic Color",
  "Realistic Black & Grey",
  "Graphic",
  "Dotwork",
  "Stick and poke",
  "Microrealism",
  "Biomech",
  "Chicano",
  "Thai",
  "Comic",
  "Coverups",
  "Scar Coverups",
  "Microblading",
  "Freckles",
  "Tattoo Removal",
  "Tooth Gems"
];


  const handleSelect = (value) => {
    setUpdatedSelectedArt((prevSelectedArt) =>
      prevSelectedArt.includes(value)
        ? prevSelectedArt.filter((item) => item !== value)
        : [...prevSelectedArt, value]
    );
  };
  const onChange = (value) => {
    setCurrent(value);
  };

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
          // onFinish={onFinish}
          name="select-preference"
          initialValues={{ remember: true }}
          layout="vertical"
          className="mb-10 w-full bg-white px-2 rounded-2xl"
        >
          {/* Buttons in groups of 4 */}
          <div className="flex flex-col gap-4">
            {Array.from({ length: Math.ceil(artStyles.length / 8) }, (_, i) => (
              <div
                key={i}
                className="flex justify-start items-center gap-4 flex-wrap"
              >
                {artStyles.slice(i * 8, i * 8 + 8).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleSelect(style)}
                    className={`px-4 py-2 rounded-3xl border ${
                      UpdatedSelectedArt.includes(style)
                        ? "border-primary text-primary font-semibold"
                        : "hover:border-primary"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className=" flex justify-end items-end">
            <button
              onClick={handleSubmit}
              className="bg-primary text-white py-3 px-6 rounded-lg clear-start"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SelectStyle;
