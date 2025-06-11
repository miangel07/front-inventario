import { baseQueryconfig } from "@/config/configAxios/configAxios";
import { errorDefaultApi, ExtendedErrorDefaul } from "@/types/configAxios/axiosConfigType";
import { GetUsersParams, UsersResponse, UsersType } from "@/types/usersTypes/usersTypes";
import { createApi } from "@reduxjs/toolkit/query/react";

export const UsersSlice = createApi({
  reducerPath: "users",
  baseQuery: baseQueryconfig,
  tagTypes: ["users"],

  endpoints: (build) => ({
    
    //listar usuarios
    getUsers: build.query<UsersResponse,GetUsersParams>({
      query: ({page,search,per_page}) => ({
        url: "/users",
        method: "GET",
        params:{
          page,
          search,
          per_page
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

    //actualizar estado bodega
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
  }),
});

export const {
    useGetUsersQuery,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useUpdateUsersStateMutation
} = UsersSlice;
