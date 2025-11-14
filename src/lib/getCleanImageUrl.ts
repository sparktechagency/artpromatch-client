import avatarImage from '@/assets/avatar.png';

export const getCleanImageUrl = (path?: string) => {
  if (!path) return avatarImage;

  if (path.startsWith('http')) {
    return path;
  }

  return `${process.env.NEXT_PUBLIC_MAIN_API}/${path}`;
};

export const makeImageUrl = (path: string) => {
  return path.replace(`${process.env.NEXT_PUBLIC_MAIN_API}/`, '');
};
