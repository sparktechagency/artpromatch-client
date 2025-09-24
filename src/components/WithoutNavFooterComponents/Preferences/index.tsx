'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Steps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const artStyles = [
  'American Traditional',
  'Neo Traditional',
  'Traditional',
  'Pacific Islander/Polynesian',
  'Tatau',
  'Maori',
  'African',
  'Native American',
  'Black & Grey',
  'Portrait',
  'Realism',
  'Abstract',
  'Blackwork',
  'Heavy Blackwork',
  'Brutal Blackwork',
  'Ignorant',
  'Anime',
  'White On Black',
  'White Tattoos',
  'Black Trash',
  'Trash Polka',
  'Blackout',
  'Script',
  'Lettering',
  'Fine Line',
  'Calligraphy',
  'Ornamental',
  'Watercolor',
  'Geometric',
  'Japanese Style',
  'Irezumi',
  'Tebori',
  'Tribal',
  'Neo Tribal',
  'New School',
  'Old School',
  'Illustrative',
  'Minimalist',
  'Lineart',
  'Botanical',
  'Realistic Color',
  'Realistic Black & Grey',
  'Graphic',
  'Dotwork',
  'Stick and Poke',
  'Microrealism',
  'Biomech',
  'Chicano',
  'Thai',
  'Comic',
  'Coverups',
  'Scar Coverups',
  'Microblading',
  'Freckles',
  'Tattoo Removal',
  'Tooth Gems',
];

const Preferences = ({ role }: { role: string }) => {
  const [current, setCurrent] = useState<number>(0);
  const [selectedArt, setSelectedArt] = useState<string[]>([]);

  console.log({ role });

  // Save selected arts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteTattoos', JSON.stringify(selectedArt));
  }, [selectedArt]);

  const handleSelect = (style: string) => {
    setSelectedArt(prev =>
      prev.includes(style)
        ? prev.filter(item => item !== style)
        : [...prev, style]
    );
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-full">
          <Form
            name="select-user-type"
            initialValues={{ remember: true }}
            layout="vertical"
            className="mb-10 w-full  mx-auto bg-white px-2 rounded-2xl"
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
                { length: Math.ceil(artStyles.length / 10) },
                (_, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center gap-4 flex-wrap"
                  >
                    {artStyles.slice(i * 10, i * 10 + 10).map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleSelect(style)}
                        className={`px-4 py-2 rounded-3xl border ${
                          selectedArt.includes(style)
                            ? 'border-primary text-primary font-semibold'
                            : 'hover:border-primary'
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
            <Link href="/preferd-location">
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
              { title: '', status: 'finish' },
              { title: '', status: current >= 1 ? 'finish' : 'wait' },
              { title: '', status: current >= 2 ? 'finish' : 'wait' },
              { title: '', status: current >= 3 ? 'finish' : 'wait' },
            ]}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preferences;
