'use server';

import { FieldValues } from '@/types';
import { revalidateTag } from 'next/cache';

// getAllFaqs
export const getAllFaqs = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/faq/users`, {
      method: 'GET',

      next: {
        tags: ['FAQS'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// createFaqByUser
export const createFaqByUser = async (data: FieldValues): Promise<any> => {
  console.log({ data });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/faq/create/by-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
