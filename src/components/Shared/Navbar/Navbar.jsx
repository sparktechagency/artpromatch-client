"use client";

import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Button, ConfigProvider, Drawer, Modal, Tooltip } from "antd";
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
import Cookies from 'universal-cookie';
const NavBar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  console.log(isLogin);
  const cookies = new Cookies();
  cookies.set('isLogin', isLogin);
  const router = useRouter();

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState) {
      setIsLogin(storedLoginState === "true");
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLogin", "true");
    setIsLogin(true);
    router.push("/");
  };

  const handleLogout = () => {
    localStorage.setItem("isLogin", "false");
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
  // const user = false;

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

  const beforeLoginLabels = [
    { name: "Discover", link: "/" },
    {
      name: "Book an Artist",
      link: "/competition-rooms",
      icon: <RiArrowDropDownLine className="text-black text-4xl" />,
    },
    { name: "Guest Spots", link: "/guest-spot" },
    {
      name: "Join As",
      link: "/join-us",
      icon: <RiArrowDropDownLine className="text-black text-4xl" />,
    },
    { name: "Help", link: "/help" },
  ];
  const labels = [
    { name: "Discover", link: "/" },
    {
      name: "Book an Artist",
      link: "/booking-availablity",
      icon: <RiArrowDropDownLine className="text-black text-4xl" />,
    },
    { name: "Guest Spots", link: "/guest-spot" },
    {
      name: "Join As",
      link: "/sign-in",
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
            {(isLogin ? labels : beforeLoginLabels).map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="text-lg font-medium hover:text-blue-600 transition flex items-center"
              >
                {item.name} {item.icon && item.icon}
              </Link>
            ))}
          </div>

          {isLogin ? (
            <div className="hidden lg:flex items-center space-x-4">
              <IoIosNotificationsOutline onClick={showModalForNotification} className="cursor-pointer h-5 w-5" />
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
              <button
                onClick={handleLogin}
                className="border border-primary bg-primary px-10 py-3 rounded-md shadow-lg"
              >
                Log In
              </button>
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
                <button
                  onClick={handleLogin}
                  className="bg-primary text-white px-10 py-3 rounded-md shadow-lg"
                >
                  Log In
                </button>
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
      <Modal open={isModalOpenForNotification} onOk={handleOkForNotification} onCancel={handleCancelForNotification}>
        <NotificationModal></NotificationModal>
      </Modal>
    </div>
  );
};

export default NavBar;
