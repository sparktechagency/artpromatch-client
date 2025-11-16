export const getCleanImageUrl = (path?: string) => {
  if (!path)
    return 'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png';

  if (path.startsWith('http')) {
    return path;
  }

  return `${process.env.NEXT_PUBLIC_MAIN_API}/${path}`;
};

export const makeImageUrl = (path: string) => {
  return path.replace(`${process.env.NEXT_PUBLIC_MAIN_API}/`, '');
};
