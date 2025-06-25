"use client";

import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Button, Drawer, Dropdown, Menu, Modal } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import { AllImages } from "@/assets/images/AllImages";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import NotificationModal from "@/components/WithNavFooterComponents/Profile/NotificationModal/NotificationModal";
import { useRouter } from "next/navigation";
const NavBar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const storedLoginState = localStorage.getItem("token");
    if (storedLoginState) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);



const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLogin(false);
  router.push("/");
};

  const [isModalOpenForNotification, setIsModalOpenForNotification] =
    useState(false);
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
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024);

      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  const beforeLoginLabels = [
    { name: "Discover", link: "/" },
    { name: "Guest Spots", link: "/guest-spot" },
    { name: "Help", link: "/help" },
  ];
  const labels = [
    { name: "Discover", link: "/" },
    {
      name: "Book an Artist",
      icon: <RiArrowDropDownLine className="text-black text-4xl" />,
      isDropdown: true,
      dropdownItems: [
        { key: "1", label: <Link href="">Tattoo Artists</Link> },
        { key: "2", label: <Link href="">Body Piercers</Link> },
        { key: "3", label: <Link href="">Studios</Link> },
      ],
    },
    { name: "Guest Spots", link: "/guest-spot" },
    {
      name: "Join As",
      isDropdown: true,
      dropdownItems: [
        {
          key: "1",
          label: (
            <Link href="https://client-artpromatch-4cq2vqx1n-rabeyaakter78s-projects.vercel.app/">
              Client
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link href="https://artist-artpromatch-ckakmcc6u-rabeyaakter78s-projects.vercel.app/">
              Artist
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link href="https://artpromatch-business-nh3gxj7po-rabeyaakter78s-projects.vercel.app/">
              Business Owner
            </Link>
          ),
        },
      ],
      icon: <RiArrowDropDownLine className="text-black text-4xl" />,
    },
    { name: "Help", link: "/help" },
  ];

  return (
    <div>
      <nav className="w-full my-6">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={AllImages.logo}
              alt="logo"
              className="lg:h-11 h-16 w-auto rounded-full"
            />
            <p className="mb-0 text-2xl lg:text-3xl font-bold">Steady Hands</p>
          </Link>

          <div className="hidden lg:flex flex-grow justify-center space-x-6">
            {(isLogin ? labels : beforeLoginLabels).map((item, index) =>
              item.isDropdown ? (
                <Dropdown
                  key={index}
                  menu={{ items: item.dropdownItems }}
                  placement="bottom"
                >
                  <button className="text-lg font-medium hover:text-blue-600 transition flex items-center">
                    {item.name} {item.icon}
                  </button>
                </Dropdown>
              ) : (
                <Link
                  href={item.link}
                  key={index}
                  className="text-lg font-medium hover:text-blue-600 transition flex items-center"
                >
                  {item.name} {item.icon && item.icon}
                </Link>
              )
            )}
          </div>

          {isLogin ? (
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/favourites">
                <CiHeart className="h-5 w-5 cursor-pointer" />
              </Link>
              <IoIosNotificationsOutline
                onClick={showModalForNotification}
                className="cursor-pointer h-5 w-5"
              />
              <Link href="/message">
                <AiOutlineMessage className="h-5 w-5" />
              </Link>
              <Link href="/user-profile-page">
                <Image
                  src={AllImages.user}
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
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/sign-in">
                  <button className="bg-primary text-white px-10 py-3 rounded-md shadow-lg">
                    Log In
                  </button>
                </Link>
              {/* <Link href="/sign-up">
                <button className="border border-primary text-primary px-10 py-3 rounded-md shadow-lg">
                  Sign Up
                </button>
              </Link> */}
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
            {(isLogin ? labels : beforeLoginLabels).map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="text-lg font-medium hover:text-blue-600 transition"
                onClick={() => setDrawerVisible(false)}
              >
                {item.name}
              </Link>
            ))}
            {isLogin ? (
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            ) : (
              <>
                <Link href="/sign-in">
                  <button className="bg-primary text-white px-10 py-3 rounded-md shadow-lg">
                    Log In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="border border-primary text-primary px-10 py-3 rounded-md shadow-lg">
                    Sign Up
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
        <NotificationModal></NotificationModal>
      </Modal>
    </div>
  );
};

export default NavBar;
