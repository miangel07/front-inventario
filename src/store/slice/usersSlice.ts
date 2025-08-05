import { baseQueryconfig } from "@/config/configAxios/configAxios";
import { errorDefaultApi, ExtendedErrorDefaul } from "@/types/configAxios/axiosConfigType";
import { GetUsersParams,  UsersResponse, UsersType } from "@/types/usersTypes/usersTypes";
import { createApi } from "@reduxjs/toolkit/query/react";

export const UsersSlice = createApi({
  reducerPath: "users",
  baseQuery: baseQueryconfig,
  tagTypes: ["users"],

  endpoints: (build) => ({
    
    //listar usuarios
    getUsers: build.query<UsersResponse,GetUsersParams>({
      query: ({page,search,limit}) => ({
        url: "/users",
        method: "GET",
        params:{
          page,
          search,
          limit
        },
      }),
      providesTags: ["users"],

      transformResponse: (response:UsersResponse) => {
        return response;
      },

      transformErrorResponse: (response: ExtendedErrorDefaul): { message: string } => {
        if (response.data.message) {
          return { message: response.data.message };
        }
        return { message: "Error de conexión con el servidor" };
      },

    }),

    // //Registro usuario
    registerUser: build.mutation<
      string,
      UsersType
    >({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
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

        // //Registro usuario con bodega
    registerUserStorage: build.mutation<
      string,
      UsersType
    >({
      query: (user) => ({
        url: "/users/createUserStorage",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
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

    // //actualizar usuario:
    updateUser: build.mutation<
      string,
      UsersType
    >({
      query: (data: UsersType) => ({
        url: `users/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
      transformErrorResponse: (response: {
        data: { error: errorDefaultApi[] };
        status: number;
      }): errorDefaultApi[] => {
        if (response.data?.error.length > 0) {
          return response.data.error.map((err) => ({
            message: err.message,
            field: err.field || "",
          }));
        }
        return [
          {
            message: "Error de conexión con el servidor.",
            field: "",
          },
        ];
      },
    }),

    //actualizar estado usuario
    updateUsersState: build.mutation<
      string,
      { id: number; status: string }
    >({
      query: ({ id, status }) => ({
        url: `users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["users"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
      transformErrorResponse: (response: {
        data?: { error?: errorDefaultApi[] };
        status: number;
      }): errorDefaultApi[] => {
        if (response.data?.error?.length) {
          return response.data.error.map((err) => ({
            message: err.message,
            field: err.field || "",
          }));
        }
        return [
          {
            message: "Error de conexión con el servidor.",
            field: "",
          },
        ];
      },
    }),



        //listar roles
    getRollen: build.query<RollenResponse,GetRollenParams>({
      query: ({page,search,limit}) => ({
        url: "/role",
        method: "GET",
        params:{
          page,
          search,
          limit
        },
      }),
      providesTags: ["users"],

      transformResponse: (response:RollenResponse) => {
        return response;
      },

      transformErrorResponse: (response: ExtendedErrorDefaul): { message: string } => {
        if (response.data.message) {
          return { message: response.data.message };
        }
        return { message: "Error de conexión con el servidor" };
      },

    }),

    // //Registro rol
    registerRolle: build.mutation<
      string,
      RollenType
    >({
      query: (user) => ({
        url: "/role",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
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

    // //actualizar rol:
    updateRolle: build.mutation<
      string,
      RollenType
    >({
      query: (data: RollenType) => ({
        url: `role/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
      transformErrorResponse: (response: {
        data: { error: errorDefaultApi[] };
        status: number;
      }): errorDefaultApi[] => {
        if (response.data?.error.length > 0) {
          return response.data.error.map((err) => ({
            message: err.message,
            field: err.field || "",
          }));
        }
        return [
          {
            message: "Error de conexión con el servidor.",
            field: "",
          },
        ];
      },
    }),

    //actualizar estado rol
    updateRolleState: build.mutation<
      string,
      { id: number; status: string }
    >({
      query: ({ id, status }) => ({
        url: `role/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["users"],
      transformResponse: (response: { message: string }) => {
        return response.message;
      },
      transformErrorResponse: (response: {
        data?: { error?: errorDefaultApi[] };
        status: number;
      }): errorDefaultApi[] => {
        if (response.data?.error?.length) {
          return response.data.error.map((err) => ({
            message: err.message,
            field: err.field || "",
          }));
        }
        return [
          {
            message: "Error de conexión con el servidor.",
            field: "",
          },
        ];
      },
    }),





  }),
});

export const {
    useGetUsersQuery,
    useRegisterUserMutation,
    useRegisterUserStorageMutation,
    useUpdateUserMutation,
    useUpdateUsersStateMutation,
    useGetRollenQuery,
    useRegisterRolleMutation,
    useUpdateRolleMutation,
    useUpdateRolleStateMutation
} = UsersSlice;
