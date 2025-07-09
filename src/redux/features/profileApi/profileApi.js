const { baseApi } = require("@/redux/api/baseApi");

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePreference: builder.mutation({
      query: (preference) => ({
        url: "/api/v1/clients/preferences",
        method: "PATCH",
        body: preference,
      }),
      invalidatesTags: ["Preference"],
    }),

    updatePersonalInfo: builder.mutation({
      query: (data) => ({
        url: "/api/v1/clients/personal-info",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useUpdatePreferenceMutation, useUpdatePersonalInfoMutation } =
  profileApi;
