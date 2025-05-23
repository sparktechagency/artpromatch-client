import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    verifySignUp: builder.mutation({
      query: (credentials) => {

        return ({
        url: "auth/verify-signup-otp",
        method: "POST",
        body: credentials,
      
      })
      },
    }),
    sendOtpAgain: builder.mutation({
      query: (credentials) => ({
        url: "auth/verify-signup-otp-again",
        method: "POST",
        body: credentials,
      }),
    }),
    userTypeSelection: builder.mutation({
      query: (credentials) => ({
        url: "auth/create-profile",
        method: "POST",
        body: credentials,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),

    createProfile: builder.mutation({
      query: (formData) => ({
        url: "/auth/create-profile",
        method: "POST",
        body: formData,
      }),
    }),


  }),
});

export const {
  useSignUpMutation,
  useVerifySignUpMutation,
  useSendOtpAgainMutation,
  useUserTypeSelectionMutation,
  useLoginMutation,
  useCreateProfileMutation
} = authApi;

