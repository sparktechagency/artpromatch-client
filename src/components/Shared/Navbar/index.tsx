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
  const [isModalOpenForNotification, setIsModalOpenForNotification] =
    useState(false);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  // const [isMobile, setIsMobile] = useState(false);
  const { user, setUser, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

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

  const handleNotificationClick = () => setIsModalOpenForNotification(true);
  const handleNotificationCancel = () => setIsModalOpenForNotification(false);
  const handleNotificationOk = () => setIsModalOpenForNotification(false);

  // handleLogout
  const handleLogout = async () => {
    await logOut();
    setUser(null);
    setIsLoading(true);

    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/sign-in');
    }
  };

  return (
    <div>
      <nav className="w-full my-6">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
          {/* Logo */}
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

          {/* Desktop Navigation */}
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

          {/* Desktop Right Section */}
          {user ? (
            <div className="hidden lg:flex items-center space-x-4">
              {/* <Link href="/favourites">
                <CiHeart className="h-5 w-5 cursor-pointer" />
              </Link> */}
              <IoIosNotificationsOutline
                onClick={handleNotificationClick}
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

          {/* Mobile Right Section */}
          {user && (
            <div className="flex lg:hidden items-center justify-end space-x-3 mr-3 w-full">
              <IoIosNotificationsOutline
                onClick={handleNotificationClick}
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
                  className="h-9 w-9 rounded-full"
                />
              </Link>
            </div>
          )}

          {/* Mobile Drawer Button */}
          <div className="lg:hidden">
            <Button
              icon={<RxHamburgerMenu className="text-black text-2xl" />}
              onClick={() => setDrawerVisible(true)}
            />
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title=""
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <div className="flex flex-col w-full px-3 py-3 space-y-2 bg-white">
            {(user ? afterLoginLabels : beforeLoginLabels).map(
              (item, index) => {
                if (item?.isDropdown) {
                  const isOpen = !!openSections[index];
                  return (
                    <div key={index} className="w-full">
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-base font-medium border transition ${
                          isOpen
                            ? 'border-primary bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                        onClick={() =>
                          setOpenSections(prev => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                      >
                        <span className="text-primary">{item.name}</span>
                        <RiArrowDropDownLine
                          className={`text-3xl transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="mt-1 ml-3 space-y-1">
                          {item.dropdownItems?.map(sub => (
                            <Link
                              key={sub.key}
                              href={(sub.label as any)?.props?.href || '#'}
                              onClick={() => setDrawerVisible(false)}
                              className="block px-4 py-2 rounded-md text-base hover:bg-gray-50 border border-gray-300"
                            >
                              <span className="text-primary">
                                {(sub.label as any)?.props?.children}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    href={item.link || '/'}
                    key={index}
                    className={`block px-4 py-3 rounded-lg text-base font-medium border transition ${
                      pathname === item.link
                        ? 'border-primary bg-blue-50 text-primary'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setDrawerVisible(false)}
                  >
                    <span className="text-primary">{item.name}</span>
                  </Link>
                );
              }
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full mt-2 py-3 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 border border-red-200"
              >
                Logout
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                <Link href="/sign-in" className="w-full">
                  <button className="w-full bg-primary px-10 py-3 rounded-md shadow-lg">
                    <span className="text-white font-bold"> Log In</span>
                  </button>
                </Link>
                <Link href="/sign-up" className="w-full">
                  <button className="w-full bg-primary px-10 py-3 rounded-md shadow-lg">
                    <span className="text-white font-bold"> Sign Up</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Drawer>
      </nav>

      {/* Notification Modal */}
      <Modal
        open={isModalOpenForNotification}
        onOk={handleNotificationOk}
        onCancel={handleNotificationCancel}
      >
        <NotificationModal />
      </Modal>
    </div>
  );
};

export default NavBar;
