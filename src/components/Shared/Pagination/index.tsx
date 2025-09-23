'use client';

import { IMeta } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Pagination = ({ meta }: { meta: IMeta }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = meta?.page || 1;
  const totalPage = meta?.totalPage || 1;

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-center items-center gap-3 my-8">
      <button
        onClick={() => handlePage(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-gray-700">
        Page {totalPage === 0 ? 0 : currentPage} of {totalPage}
      </span>

      <button
        onClick={() => handlePage(Math.min(totalPage, currentPage + 1))}
        disabled={currentPage >= totalPage}
        className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
