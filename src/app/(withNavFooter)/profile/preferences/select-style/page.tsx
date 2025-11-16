'use client';

import { expertiseTattooServicesList } from '@/constants';
import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SelectStyle = () => {
  const router = useRouter();
  const [updatedSelectedArt, setUpdatedSelectedArt] = useState<string[]>([]);

  // Load previously selected from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('UpdatedSelectedArt');
    if (saved) {
      setUpdatedSelectedArt(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'UpdatedSelectedArt',
      JSON.stringify(updatedSelectedArt)
    );
  }, [updatedSelectedArt]);

  const handleSubmit = () => {
    router.back();
  };

  const handleSelect = (value: string) => {
    setUpdatedSelectedArt(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // const onChange = (value: number) => {
  //   setCurrent(value);
  // };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">
          Select Your Favorite Tattoo Styles
        </h1>
        <p className="text-secondary">
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
            {Array.from(
              { length: Math.ceil(expertiseTattooServicesList.length / 8) },
              (_, i) => (
                <div
                  key={i}
                  className="flex justify-start items-center gap-4 flex-wrap"
                >
                  {expertiseTattooServicesList
                    .slice(i * 8, i * 8 + 8)
                    .map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleSelect(style)}
                        className={`px-4 py-2 rounded-3xl border ${
                          updatedSelectedArt.includes(style)
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
