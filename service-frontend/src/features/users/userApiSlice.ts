import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserResponse {
  token: string;
}

export const userApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8080/api" }),
  reducerPath: "login",
  tagTypes: ["Login"],
  endpoints: build => ({
    loginUser: build.mutation<
      UserResponse,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "/login",
        method: "POST",
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userApiSlice;
