'use server';

// getContentPagesData
export const getContentPagesData = async (page: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/content/retrieve/${page}`,
      {
        method: 'GET',
        next: {
          tags: ['CONTENT_PAGES'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
