'use client';

import { Form } from 'antd';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const PiercingPage = () => {
  const [selectedPiercing, setSelectedPiercing] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedPerasing');
    if (saved) setSelectedPiercing(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('selectedPerasing', JSON.stringify(selectedPiercing));
  }, [selectedPiercing]);

  const preferredPiercing: string[] = [
    'Earlobe',
    'Transverse Lobe',
    'Helix',
    'Triple Helix',
    'Forward Helix',
    'Anti-Helix',
    'Snug',
    'Industrial',
    'Daith',
    'Rook',
    'Conch',
    'Tragus',
    'Anti-Tragus',
    'Nostril',
    'High Nostril',
    'Septum',
    'Septril',
    'Nasallang',
    'Bridge',
    'Eyebrow',
    'Navel',
    'Floating Navel',
    'Nipple',
    'Tongue',
    'Frenum (Oral)',
    'Cheek',
    'Lip',
    'Labret',
    'Vertical Labret',
    'Inverse Vertical Labret',
    'Philtrum',
    'Surface Piercing',
    'Frenum (Genital)',
    'PA (Genital)',
    'Reverse PA (Genital)',
    'Apadravya (Genital)',
    'Ampallang (Genital)',
    'Hafada (Genital)',
    'Dydoe (Genital)',
    'Lorum (Genital)',
    'Guiche (Genital)',
    'Pubic (Genital)',
    'Christina (Genital)',
    'Hood (Genital)',
    'Triangle (Genital)',
    'Inner Labia (Genital)',
    'Outer Labia (Genital)',
    'Fourchette (Genital)',
    'Princess Albertina (Genital)',
    'Tooth Gems',
  ];

  const handleSelect = (value: string) => {
    setSelectedPiercing(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">Select Your Favorite Piercings</h1>
        <p className="text-secondary">Pick the ones that match your vibe.</p>
      </div>

      <div className="">
        <Form
          name="select-pearsing"
          initialValues={{ remember: true }}
          layout="vertical"
          className="mb-10"
          // className="mb-10 w-full"
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
              { length: Math.ceil(preferredPiercing.length / 7) },
              (_, i) => (
                <div
                  key={i}
                  className="flex justify-start items-center gap-4 flex-wrap"
                >
                  {preferredPiercing.slice(i * 7, i * 7 + 7).map(pearsing => (
                    <button
                      key={pearsing}
                      type="button"
                      onClick={() => handleSelect(pearsing)}
                      className={`px-8 py-2 rounded-3xl border hover:border-primary ${
                        selectedPiercing.includes(pearsing)
                          ? 'border-primary text-primary font-semibold'
                          : 'hover:border-primary'
                      }`}
                    >
                      {pearsing}
                    </button>
                  ))}
                </div>
              )
            )}
          </div>

          <Link href="/profile/preferences">
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
