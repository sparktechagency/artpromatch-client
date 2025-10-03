import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const links = [
    {
      name: 'About Us',
      url: '/about-us',
    },
    {
      name: 'Privacy Policy',
      url: '/privacy-policy',
    },
    {
      name: 'Help',
      url: '/help',
    },
    {
      name: 'Terms And Conditions',
      url: '/terms-and-conditions',
    },
    {
      name: 'Refund Policy',
      url: '/refund-policy',
    },
  ];
  return (
    <div className="bg-[#181818] p-5">
      <div className=" text-white md:mt-16">
        <Link
          href="/"
          className="flex justify-center items-center space-x-2 mb-10"
        >
          <Image src={AllImages.logo} alt="footer" height={30} width={30} />
          <div>Staedy Hands </div>
        </Link>

        {/* links */}
        <div className="max-w-screen-sm mx-auto flex flex-col md:flex-row justify-between items-center gap-5 mt-3 md:mb-16">
          {links?.map(link => (
            <Link
              key={link.name}
              href={link.url}
              className="relative group text-gray-300 hover:text-white transition-colors duration-300"
            >
              <p>{link.name}</p>
              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <hr className="container mx-auto" />
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center my-10 md:my-16">
          <p>© {new Date().getFullYear()} Steady Hands. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Image src={AllImages.x} alt="x" height={30} width={30} />
            <Image src={AllImages.fb} alt="fb" height={30} width={30} />
            <Image src={AllImages.insta} alt="insta" height={30} width={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
