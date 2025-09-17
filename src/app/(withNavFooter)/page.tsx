"use client";
import AfterLogin from "@/components/Shared/HomeComponent/AfterLogin/AfterLogin";
import BeforeLogin from "@/components/Shared/HomeComponent/BeforeLogin/BeforeLogin";
import React, { useEffect, useState } from "react";

const Homepage = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    setToken(localStorage.getItem("accessToken"));

    // Listen for token changes from other parts of the app (login/logout)
    const handleStorageChange = () => {
      setToken(localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <div>{token ? <AfterLogin /> : <BeforeLogin />}</div>;
};

export default Homepage;
