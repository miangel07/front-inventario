import { baseQueryconfig } from "@/config/configAxios/configAxios";
import { errorDefaultApi } from "@/types/configAxios/axiosConfigType";
import { LoginResponse, LoginType, LoginUserConfirm } from "@/types/login/loginType";
import { createApi } from "@reduxjs/toolkit/query/react";




export const LoginSlice = createApi({
  reducerPath: "login",
  baseQuery: baseQueryconfig,
  tagTypes: ["login"],

  endpoints: (build) => ({
    // Login User - CORREGIDO
    loginUser: build.mutation<LoginResponse, LoginType>({
      query: (login) => ({
        url: "/auth/login",
        method: "POST",
        body: login,
      }),
      invalidatesTags: ["login"],
      
      transformResponse: (response: LoginResponse) => {
        return response;
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

    // Login user confirm
    // loginUserConfirm: build.mutation<string, LoginUserConfirm>({
    //   query: (login) => ({
    //     url: "/auth/confirm-storage",
    //     method: "POST",
    //     body: login,
    //   }),
    //   invalidatesTags: ["login"],
    //   transformResponse: (response: { message: string }) => {
    //     return response.message;
    //   },
    //   transformErrorResponse: (response: {
    //     data: { error: errorDefaultApi[]; message: string };
    //     status: number;
    //   }): errorDefaultApi[] => {
    //     if (response.data?.error && Array.isArray(response.data?.error)) {
    //       return response.data.error.map((err) => ({
    //         message: err.message,
    //         field: err.field || "",
    //       }));
    //     }
    //     return [
    //       {
    //         message: `${response.data?.message}`,
    //         field: "",
    //       },
    //     ];
    //   },
    // }),



    // En LoginSlice.ts
loginUserConfirm: build.mutation<LoginResponse, LoginUserConfirm>({
  query: (login) => ({
    url: "/auth/confirm-storage",
    method: "POST",
    body: login,
  }),
  invalidatesTags: ["login"],
  transformResponse: (response: LoginResponse) => {
    return response;
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





    logoutUser: build.mutation<void, void>({
      queryFn: async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        return { data: undefined };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLoginUserConfirmMutation,
  useLogoutUserMutation
} = LoginSlice;