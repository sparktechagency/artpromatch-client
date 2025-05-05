import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    verifySignUp: builder.mutation({
      query: (credentials) => ({
        url: "auth/verify-signup-otp",
        method: "POST",
        body: credentials,
      }),
    }),

    signIn: builder.mutation({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignUpMutation, useVerifySignUpMutation, useSignInMutation } =
  authApi;
