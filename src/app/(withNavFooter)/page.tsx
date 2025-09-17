"use client";
import AfterLogin from "@/components/Shared/HomeComponent/AfterLogin/AfterLogin";
import BeforeLogin from "@/components/Shared/HomeComponent/BeforeLogin/BeforeLogin";
import { useUser } from "@/context/UserContext";

const Homepage = () => {
  const { user } = useUser();


  return <div>{user ? <AfterLogin /> : <BeforeLogin />}</div>;
};

export default Homepage;
