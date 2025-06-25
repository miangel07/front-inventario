import { baseQueryconfig } from "@/config/configAxios/configAxios";
import { errorDefaultApi } from "@/types/configAxios/axiosConfigType";
import { LoginType, LoginUserConfirm } from "@/types/login/loginType";
import { createApi } from "@reduxjs/toolkit/query/react";

export const LoginSlice = createApi({
  reducerPath: "login",
  baseQuery: baseQueryconfig,
  tagTypes: ["login"],

  endpoints: (build) => ({
    
    //Login User 
    loginUser: build.mutation<
      string,
      LoginType
    >({
      query: (login) => ({
        url: "/auth/login",
        method: "POST",
        body: login,
      }),
      invalidatesTags: ["login"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
      transformErrorResponse: (response: {
        data: { error: errorDefaultApi[]; message: string };
        status: number;
      }): errorDefaultApi[] => {
        if (response.data?.error && Array.isArray(response.data?.error)) {
          return response.data.error.map((err) => ({
            message: err.message,
            field: err.field || "",
          }));
        }
        return [
          {
            message: `${response.data?.message}`,
            field: "",
          },
        ];
      },
    }),

    //login user confirm
        // //Login User 
    loginUserConfirm: build.mutation<
      string,
      LoginUserConfirm
    >({
      query: (login) => ({
        url: "/auth/confirm-storage",
        method: "POST",
        body: login,
      }),
      invalidatesTags: ["login"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
      transformErrorResponse: (response: {
        data: { error: errorDefaultApi[]; message: string };
        status: number;
      }): errorDefaultApi[] => {
        if (response.data?.error && Array.isArray(response.data?.error)) {
          return response.data.error.map((err) => ({
            message: err.message,
            field: err.field || "",
          }));
        }
        return [
          {
            message: `${response.data?.message}`,
            field: "",
          },
        ];
      },
    }),


  }),
});

export const {
    useLoginUserMutation,
    useLoginUserConfirmMutation
} = LoginSlice;
