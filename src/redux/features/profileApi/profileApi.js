const { baseApi } = require("@/redux/api/baseApi");

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePreference: builder.mutation({
      query: (preference) => ({
        url: "clients/notification-preferences",
        method: "PATCH",
        body: preference,
      }),
      invalidatesTags: ["Preference"],
    }),
  }),
});

export const { useUpdatePreferenceMutation } = profileApi;
