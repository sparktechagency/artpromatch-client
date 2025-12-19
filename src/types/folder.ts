export interface IFolder {
  _id: string;

  owner: string;
  name: string;
  for: 'portfolio' | 'flash';
  images: string[];
  
  // isPublished: boolean;
}
