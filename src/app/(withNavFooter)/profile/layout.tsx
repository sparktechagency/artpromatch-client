'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Drawer, Upload } from 'antd';
import Image from 'next/image';
import { FaCamera, FaHamburger, FaUser } from 'react-icons/fa';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { updateProfilePhoto } from '@/services/Auth';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { usePathname } from 'next/navigation';

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();

  const menuItems = [
    { name: 'Update Profile', path: '/profile/update' },
    { name: 'Password Management', path: '/profile/change-password' },
    // { name: 'Preferences', path: '/profile/preferences' },
    // { name: 'Notifications', path: '/profile/notifications' },
    { name: 'Payment History', path: '/profile/payment-history' },
    // { name: 'Privacy & Security', path: '/profile/privacy-security' },
    { name: 'Linked Accounts', path: '/profile/linked-accounts' },
  ];

  const uploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    beforeUpload: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await updateProfilePhoto(formData);
        if (res?.success) {
          toast.success(res?.message);
          setIsLoading(true);
        } else {
          toast.error(res?.message || 'Failed to update image');
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong while uploading.');
      }

      return false; // prevent auto-upload
    },
  };

  return (
    <div className="container mx-auto mt-20 px-2 md:px-0">
      <div className="my-5 w-full flex flex-col md:flex-row">
        {/* Mobile Menu Button */}
        <div
          className="flex justify-center items-center gap-2 w-full border border-gray-300/50 py-2 md:hidden mb-4 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <FaHamburger /> Menu
        </div>

        {/* Sidebar */}
        <div className="hidden md:block md:w-[30%]">
          {/* <h1 className="text-xl font-bold mb-2">Profile Information</h1> */}
          {menuItems.map(item => (
            <Link href={item.path} key={item.name}>
              <p
                className={`mb-3 cursor-pointer text-xl ${
                  pathname === item.path
                    ? 'text-black font-bold'
                    : 'text-secondary font-semibold'
                }`}
              >
                {item.name}
              </p>
            </Link>
          ))}
          <Link href="/profile/delete-account">
            <p className="mb-3 text-red-500 text-xl cursor-pointer">
              Delete Account
            </p>
          </Link>
        </div>

        {/* Drawer for mobile menu */}
        <Drawer
          title="Profile Information"
          placement="right"
          closable
          onClose={() => setOpen(false)}
          open={open}
        >
          {menuItems.map(item => (
            <Link href={item.path} key={item.name}>
              <p
                className={`mb-3 cursor-pointer text-lg ${
                  pathname === item.path
                    ? 'text-black font-bold'
                    : 'text-secondary font-semibold'
                }`}
              >
                {item.name}
              </p>
            </Link>
          ))}
          <Link href="/profile/delete-account">
            <p className="mb-3 text-red-500 text-xl cursor-pointer">
              Delete Account
            </p>
          </Link>
        </Drawer>

        {/* Main Content */}
        <div className="md:w-[70%] w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0 mb-5">
            {/* Profile Image with bottom-right camera icon */}
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <div className="relative w-28 h-28 rounded-full  border-white shadow-md overflow-hidden">
                  <Image
                    // className="object-cover rounded-full"
                    className="rounded-full"
                    src={getCleanImageUrl(
                      user?.image ||
                        'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png'
                    )}
                    alt="user"
                    fill
                    sizes="112px"
                    priority
                  />
                </div>

                {/* Small Camera Icon Button */}
                <Upload {...uploadProps}>
                  <button
                    className="absolute bottom-3 right-0 bg-white border-2 border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg hover:bg-gray-50 transition"
                    title="Change profile photo"
                  >
                    <FaCamera className="text-red-600" size={16} />
                  </button>
                </Upload>
              </div>

              <div>
                <h1 className="text-xl font-bold">{user?.fullName}</h1>
                <p className="text-neutral-400">
                  Update your profile information.
                </p>
              </div>
            </div>

            {/* Profile Preview Button */}
            {/* <Link href="/me">
              <button className="flex items-center gap-2 px-10 py-2 rounded-xl border hover:border-primary hover:text-primary transition">
                <FaUser /> Profile Preview
              </button>
            </Link> */}
          </div>

          {/* Children Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
