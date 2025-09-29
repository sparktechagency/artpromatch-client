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

const Preferences = () => {
  const [current, setCurrent] = useState<number>(0);
  const [favoriteTattoos, setFavoriteTattoos] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteTattoos');
    if (stored) {
      try {
        setFavoriteTattoos(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing favorite tattoos', e);
      }
    }
  }, []);

  const handleSelect = (style: string) => {
    const updated = favoriteTattoos.includes(style)
      ? favoriteTattoos.filter(item => item !== style)
      : [...favoriteTattoos, style];

    setFavoriteTattoos(updated);
    localStorage.setItem('favoriteTattoos', JSON.stringify(updated));
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <Form
          name="select-user-type"
          layout="vertical"
          className="pb-10 w-full mx-auto bg-white px-2 rounded-2xl"
        >
          <div className="mb-4 flex flex-col justify-center items-center text-center">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
              What styles of art do you love?
            </h2>
            <Typography.Text className="text-center text-base">
              Pick as many as you&apos;d like.
            </Typography.Text>
          </div>

          {/* Buttons in groups of 10 */}
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
                      className={`px-4 py-2 rounded-3xl border transition ${
                        favoriteTattoos.includes(style)
                          ? 'border-primary text-blue-500 font-semibold bg-gray-400/30'
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
            <button
              type="button"
              className="w-full bg-primary text-white py-2 rounded-lg mt-5 mb-10"
            >
              <div className="text-lg text-white"> Get Started</div>
            </button>
          </Link>
        </Form>

        {/* Steps */}
        <Steps
          current={current}
          direction="horizontal"
          size="small"
          items={[
            { title: '', status: current >= 0 ? 'finish' : 'wait' },
            { title: '', status: current >= 1 ? 'finish' : 'wait' },
            { title: '', status: current >= 2 ? 'finish' : 'wait' },
            { title: '', status: current >= 3 ? 'finish' : 'wait' },
          ]}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default Preferences;
