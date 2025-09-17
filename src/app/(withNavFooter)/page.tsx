'use client';

import ClientAfterLogin from '@/components/Shared/HomeComponent/AfterLogin/ClientAfterLogin';
import BeforeLogin from '@/components/Shared/HomeComponent/BeforeLogin';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';

const Homepage = () => {
  const { isLoading, setIsLoading, user } = useUser();

  console.log({ user });

  const renderContent = () => {
    if (!user) return <BeforeLogin />;

    switch (user.role) {
      case 'CLIENT':
        return <ClientAfterLogin />;

      // case 'ARTIST':
      //   return <ArtistAfterLogin />;

      // case 'BUSINESS':
      //   return <BusinessAfterLogin />;

      default:
        return <BeforeLogin />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Homepage;
