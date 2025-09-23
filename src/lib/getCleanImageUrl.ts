export const getCleanImageUrl = (path: string) => {
  if (!path) return '/404.png';

  if (path.startsWith('http')) {
    return path;
  }

  return `${process.env.NEXT_PUBLIC_IMAGE_API}/${path}`;
};
