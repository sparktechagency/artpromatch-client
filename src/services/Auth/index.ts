'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { FieldValues } from '@/types';
import { getValidAccessTokenForServerActions } from '@/lib/getValidAccessToken';

// socialSignIn
export const socialSignIn = async (payload: {
  email: string;
  fcmToken: string;
  image: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/social-signin`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // for keeping response fresh
      }
    );

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    // return { success: false, message: 'Something went wrong' };
    return Error(error);
  }
};

// registerUser
export const signUpUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// sendSignupOtpAgain
export const sendSignupOtpAgain = async (userEmail: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/send-signup-otp-again`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// verifySignUpByOTP
export const verifySignUpByOTP = async (userEmail: string, otp: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/verify-signup-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, otp }),
      }
    );

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// signInUser
export const signInUser = async (userData: FieldValues): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateProfilePhoto
export const updateProfilePhoto = async (data: FormData): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/update-profile-photo`,
      {
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();
    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateAuthData
export const updateAuthData = async (fullName: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/update-auth-data`,
      {
        method: 'PATCH',
        body: JSON.stringify({ fullName }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();
    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// changePassword
export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set('accessToken', result?.data?.accessToken);
      (await cookies()).set('refreshToken', result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getCurrentUser
export const getCurrentUser = async (): Promise<any> => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

// logOut
export const logOut = async (): Promise<void> => {
  (await cookies()).delete('accessToken');
  (await cookies()).delete('refreshToken');
};

// getNewAccessToken
export const getNewAccessToken = async (refreshToken: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/access-token`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateFcmTokenToServer
export const updateFcmTokenToServer = async (data: FieldValues) => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/save-fcm-token`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
