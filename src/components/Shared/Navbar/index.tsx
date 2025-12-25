'use client';

import { useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import { Button, Drawer, Dropdown, Modal } from 'antd';
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import { RiArrowDropDownLine } from 'react-icons/ri';
// import { CiHeart } from 'react-icons/ci';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineMessage } from 'react-icons/ai';
import NotificationModal from '@/components/WithNavFooterComponents/Profile/NotificationModal';
import { initSocket } from '@/utils/socket';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { logOut } from '@/services/Auth';
import { protectedRoutes } from '@/constants';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

const NavBar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  const { user, setUser, setIsLoading } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setIsMobile(window.innerWidth < 1024);

  //     const handleResize = () => {
  //       setIsMobile(window.innerWidth < 1024);
  //     };

  //     window.addEventListener('resize', handleResize);
  //     return () => window.removeEventListener('resize', handleResize);
  //   }
  // }, []);

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    setIsLoading(true);

    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/sign-in');
    }
  };

  const [isModalOpenForNotification, setIsModalOpenForNotification] =
    useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const showModalForNotification = () => {
    setIsModalOpenForNotification(true);
  };

  const handleOkForNotification = () => {
    setIsModalOpenForNotification(false);
  };

  const handleCancelForNotification = () => {
    setIsModalOpenForNotification(false);
  };

  useEffect(() => {
    if (!user?.id) {
      setUnreadCount(0);
      return;
    }

    const socket = initSocket(user.id);

    const handleUnread = (payload: { unreadCount?: number }) => {
      setUnreadCount(payload?.unreadCount ?? 0);
    };

    socket.on('unread-message-count', handleUnread);

    return () => {
      socket.off('unread-message-count', handleUnread);
    };
  }, [user?.id]);

  // const items = [
  //   {
  //     key: '1',
  //     label: (
  //       <Link
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.antgroup.com"
  //       >
  //         1st menu item
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <Link
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.aliyun.com"
  //       >
  //         2nd menu item
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: '3',
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.luohanacademy.com"
  //       >
  //         3rd menu item
  //       </a>
  //     ),
  //   },
  // ];

  const beforeLoginLabels = [
    {
      name: 'Home',
      link: '/',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Guest Spots',
      link: '/guest-spots',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Help',
      link: '/help',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },

    {
      name: 'Join As',
      isDropdown: true,
      dropdownItems: [
        {
          key: '1',
          label: (
            <Link href="https://client-artpromatch-4cq2vqx1n-rabeyaakter78s-projects.vercel.app/">
              Client
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link href="https://artist-artpromatch-ckakmcc6u-rabeyaakter78s-projects.vercel.app/">
              Artist
            </Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link href="https://artpromatch-business-nh3gxj7po-rabeyaakter78s-projects.vercel.app/">
              Business Owner
            </Link>
          ),
        },
      ],
      icon: <RiArrowDropDownLine className="text-black text-4xl" />,
    },
  ];

  const afterLoginLabels = [
    {
      name: 'Home',
      link: '/',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Bookings',
      link: '/bookings',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Guest Spots',
      link: '/guest-spots',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },

    {
      name: 'Help',
      link: '/help',
      isDropdown: false,
      dropdownItems: [],
    },
  ];

  return (
    <div>
      <nav className="w-full my-6">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
          <Link href="/" className="flex justify-center items-center space-x-2">
            <Image
              src={AllImages.logo}
              height={500}
              width={500}
              alt="logo"
              className="lg:h-11 h-16 w-auto rounded-full"
            />
            <div className="mb-0 text-2xl lg:text-3xl font-bold">
              Steady Hands
            </div>
          </Link>

          <div className="hidden lg:flex flex-grow justify-center space-x-6">
            {(user ? afterLoginLabels : beforeLoginLabels).map((item, index) =>
              item?.isDropdown ? (
                <Dropdown
                  key={index}
                  menu={{ items: item?.dropdownItems }}
                  placement="bottom"
                >
                  <button className="text-lg font-medium hover:text-blue-600 transition flex items-center">
                    {item.name} {item?.icon}
                  </button>
                </Dropdown>
              ) : (
                <Link
                  href={item.link || '/'}
                  key={index}
                  className={`text-lg font-medium hover:text-blue-600 transition flex items-center ${
                    pathname === item.link
                      ? 'border-b-2 border-primary p-1 text-blue-600'
                      : ''
                  }`}
                >
                  {item.name} {item?.icon && item?.icon}
                </Link>
              )
            )}
          </div>

          {user ? (
            <div className="hidden lg:flex items-center space-x-4">
              {/* <Link href="/favourites">
                <CiHeart className="h-5 w-5 cursor-pointer" />
              </Link> */}
              <IoIosNotificationsOutline
                onClick={showModalForNotification}
                className="cursor-pointer h-5 w-5"
              />
              <Link href="/message" className="relative">
                <AiOutlineMessage className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white shadow-lg">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Link>
              <Link href="/profile">
                <Image
                  src={getCleanImageUrl(user?.image)}
                  alt="user"
                  height={40}
                  width={40}
                  className="h-10 w-10 rounded-full"
                />
              </Link>

              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4 ">
              <Link href="/sign-in" className="text-white">
                <button className="bg-primary px-10 py-3 rounded-md shadow-lg">
                  Log In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="border border-primary text-primary px-10 py-3 rounded-md shadow-lg">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <div className="lg:hidden">
            <Button
              icon={<RxHamburgerMenu className="text-black text-2xl" />}
              onClick={() => setDrawerVisible(true)}
            />
          </div>
        </div>

        <Drawer
          title=""
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <div className="flex flex-col items-center space-y-4">
            {(user ? afterLoginLabels : beforeLoginLabels).map(
              (item, index) => (
                <Link
                  href={item.link || '/'}
                  key={index}
                  className="text-lg font-medium hover:text-blue-600 transition"
                  onClick={() => setDrawerVisible(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            {user ? (
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            ) : (
              <>
                <Link href="/sign-in">
                  <button className="bg-primary px-10 py-3 rounded-md shadow-lg">
                    <span className="text-white font-bold"> Log In</span>
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="bg-primary px-10 py-3 rounded-md shadow-lg">
                    <span className="text-white font-bold"> Sign Up</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </Drawer>
      </nav>
      <Modal
        open={isModalOpenForNotification}
        onOk={handleOkForNotification}
        onCancel={handleCancelForNotification}
      >
        <NotificationModal />
      </Modal>
    </div>
  );
};

export default NavBar;
