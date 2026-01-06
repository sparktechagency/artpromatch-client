'use client';

import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';

const roleOptions = [
  {
    value: 'CLIENT',
    title: 'Client',
    description:
      'Discover and book talented artists and piercers near you or worldwide. Save your favorites, explore guest spots, and manage appointments.',
  },
  {
    value: 'ARTIST',
    title: 'Artist',
    description:
      "Showcase your portfolio, attract clients, and manage bookings. Whether you're a tattoo artist or piercer, we've got you covered.",
  },
  {
    value: 'BUSINESS',
    title: 'Business Owner',
    description:
      'Promote your business, feature talented artists, and organize events. Perfect for tattoo studios, piercing studios, or related businesses.',
  },
];

const UserTypeSelection = () => {
  const [role, setRole] = useState<string>('CLIENT');
  const router = useRouter();
  const selectedRole = roleOptions.find(option => option.value === role);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleNext = () => {
    if (selectedRole) {
      localStorage.setItem('role', selectedRole.value);
      router.push('/preference-selection');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src={AllImages.logo}
            width={48}
            height={48}
            alt="Steady Hands logo"
          />
          <div className="space-y-3">
            <h1 className="text-2xl md:text-[28px] font-semibold text-[#2c1f1f]">
              How will you use Steady Hands?
            </h1>
            <p className="text-base text-[#7e6d6e]">
              Choose the role that fits you best. You can always expand your
              role later.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4 max-w-[440px] mx-auto">
          {roleOptions.map(option => {
            const isSelected = option.value === role;
            return (
              <button
                type="button"
                key={option.value}
                onClick={() => setRole(option.value)}
                className={`relative w-full rounded-2xl border-2 px-5 py-4 pl-12 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#cfbbb7] bg-[#fcf8f7] shadow-lg shadow-black/5'
                    : 'border-[#bbb9b9] border-[0.5px] hover:border-[#eadedc] hover:bg-[#fcf8f7]'
                }`}
              >
                <span
                  className={`absolute left-[-36px] top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 ${
                    isSelected
                      ? 'border-[#6a5454] bg-[#6a5454]'
                      : 'border-[#cfbfbf] bg-white'
                  }`}
                >
                  {isSelected && (
                    <MdCheck className="text-white text-lg leading-none" />
                  )}
                </span>
                <div>
                  <p className="text-lg font-semibold text-[#342727]">
                    {option.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#342727]">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="mt-8 w-full rounded-2xl bg-[#7b5859] py-3 text-base font-semibold text-white transition hover:bg-[#6a4a4b] cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
