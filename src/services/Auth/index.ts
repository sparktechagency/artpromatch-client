'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { FieldValues } from '@/types';
import {
  getValidAccessTokenForServerActions,
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';

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

// createProfile
export const createProfile = async (data: FormData) => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/create-profile`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

// checkProfileStatus
export const checkProfileStatus = async () => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/check-status`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
export const updateAuthData = async (data: {
  fullName: string;
  stringLocation: string;
}): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/update-auth-data`,
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
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// fetchProfileData
export const fetchProfileData = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/profile`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();
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

// forgotPassword
export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set('forgotPassToken', result?.data?.token);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// sendForgotPasswordOtpAgain
export const sendForgotPasswordOtpAgain = async (): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('forgotPassToken')?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/send-forgot-password-otp-again`,
      {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// verifyOtpForForgotPassword
export const verifyOtpForForgotPassword = async (otp: string): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('forgotPassToken')?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/verify-forgot-password-otp`,
      {
        method: 'POST',
        body: JSON.stringify({ token, otp }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();

    if (result?.success) {
      cookieStore.set('resetPasswordToken', result?.data?.resetPasswordToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// setNewPassword
export const setNewPassword = async (newPassword: string): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('resetPasswordToken')?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/reset-password`,
      {
        method: 'POST',
        body: JSON.stringify({ newPassword }),
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    if (result?.success) {
      cookieStore.delete('forgotPassToken');
      cookieStore.delete('resetPasswordToken');
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

// getUserForConversation
export const getUserForConversation = async (searchTerm: string) => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/auth/message-user/search?term=${encodeURIComponent(searchTerm)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// deactivateAccount
export const deactivateAccount = async (data: FieldValues) => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/deactive-account`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (result?.success) {
      (await cookies()).delete('accessToken');
      (await cookies()).delete('refreshToken');
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// deleteAccount
export const deleteAccount = async (data: FieldValues) => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/delete-account`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    if (result?.success) {
      (await cookies()).delete('accessToken');
      (await cookies()).delete('refreshToken');
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
