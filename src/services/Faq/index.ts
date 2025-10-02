'use server';

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
