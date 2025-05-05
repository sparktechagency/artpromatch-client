import { BASE_URL } from "@/utils/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { message } from "antd";


const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token|| localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // internal server error:
  if (result?.error?.status === 500) {
    message.error(result.error.data.message);
  }
  //   page not found:
  if (result?.error?.status === 404) {
    message.error(result.error.data.message);
  }

  // forbidden:
  if (result?.error?.status === 403) {
    message.error(result.error.data.message);
  }
  //   bad request:
  if (result?.error?.status === 400) {
    message.error(result.error.data.message);
  }
  //   unAUthorized:
  if (result?.error?.status === 401) {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: api.getState().auth.refreshToken,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.access) {
      localStorage.setItem("token", data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
