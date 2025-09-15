'use client';
import AfterLogin from '@/components/Shared/HomeComponent/AfterLogin/AfterLogin';
import BeforeLogin from '@/components/Shared/HomeComponent/BeforeLogin/BeforeLogin';
import React, { useEffect, useState } from 'react';

const Homepage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLogin');
    console.log(storedLoginState);

    if (storedLoginState) {
      setIsLogin(storedLoginState === 'true');
    }
  }, [setIsLogin]);
  return <div>{isLogin ? <AfterLogin /> : <BeforeLogin />}</div>;
};

export default Homepage;
