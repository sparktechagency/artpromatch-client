'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Typography } from 'antd';
import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { RxCross2 } from 'react-icons/rx';

const ClientAfterLoginHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState<string>('');

  // ✅ Initialize searchTerm from URL on load or URL change
  useEffect(() => {
    const term = searchParams.get('searchTerm') || '';
    setSearchTerm(term);
  }, [searchParams]);

  const handleSearch = () => {
    // router.push(`/discover?searchTerm=${encodeURIComponent(searchTerm)}`);
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set('searchTerm', searchTerm.trim());
    } else {
      params.delete('searchTerm');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('searchTerm');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  // const items = [
  //   {
  //     key: '1',
  //     label: (
  //       <Link target="_blank" rel="noopener noreferrer" href="">
  //         Current Location
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <Link target="_blank" rel="noopener noreferrer" href="">
  //         Change Location
  //       </Link>
  //     ),
  //   },
  // ];

  return (
    <div>
      <div className="mb-4 flex flex-col justify-center items-center text-center pt-16">
        <Image src={AllImages.logo} width={50} height={50} alt="logo" />
        <h2 className="text-center md:text-6xl font-bold mt-6 mb-2">
          Discover Artists and Studios <br /> Near You
        </h2>
        <Typography.Text className="md:text-xl text-center text-primary mt-3 mb-10">
          Discover tattoo artists, piercers, and studios tailored to <br /> your
          preferences.
        </Typography.Text>

        <div className="bg-slate-100 rounded-3xl p-2 flex justify-center items-center gap-3">
          <IoLocationOutline className="h-5 w-5 text-primary" />
          <div className="text-sm">
            {user?.stringLocation || 'Your location'}
          </div>
          {/* <Dropdown menu={{ items }} placement="bottom">
            <IoIosArrowDown className="h-5 w-5 text-primary cursor-pointer" />
          </Dropdown> */}
        </div>

        {/* Search field */}
        <div className="mt-2 md:mt-5 md:w-[650px] border rounded-lg p-2 flex justify-between items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="w-full text-sm outline-none bg-transparent px-2"
            placeholder="Search for tattoo artists, piercers and studios"
          />

          {searchTerm && (
            <button
              onClick={handleReset}
              className="h-7 w-7 rounded-full flex justify-center items-center hover:bg-gray-200 cursor-pointer"
            >
              <RxCross2 className="text-gray-500" />
            </button>
          )}

          <button
            onClick={handleSearch}
            className="bg-primary h-8 w-8 rounded-xl flex justify-center items-center cursor-pointer"
          >
            <CiSearch className="text-white h-5 w-5 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientAfterLoginHeader;
