import { baseQueryconfig } from "@/config/configAxios/configAxios";
import { errorDefaultApi, ExtendedErrorDefaul } from "@/types/configAxios/axiosConfigType";
import { UsersResponse, UsersType } from "@/types/usersTypes/usersTypes";
import { GetWineriesParams, WineriesResponse, WineriesType } from "@/types/wineriesTypes/wineriesTypes";
import { createApi, QueryReturnValue } from "@reduxjs/toolkit/query/react";


// Tipos para el error
interface ErrorResponse {
  data?: any;
  status: number;
  message?: string;
}

// Tipo para la respuesta exitosa
interface SuccessResponse<T> {
  data: T;
  meta?: unknown;
}

// Tipo para el retorno de queryFn
type QueryFnReturn = QueryReturnValue<
  { key: number; label: string }[],
  ErrorResponse
>;



export const WineriesSlice = createApi({
  reducerPath: "wineries",
  baseQuery: baseQueryconfig,
  tagTypes: ["wineries","users"],

  endpoints: (build) => ({
    
    //listar bodegas
    getWineries: build.query<WineriesResponse,GetWineriesParams>({
      query: ({page,search,limit}) => ({
        url: "/storage",
        method: "GET",
        params:{
          page,
          search,
          limit
        },
      }),
      providesTags: ["wineries"],

      transformResponse: (response:WineriesResponse) => {
        return response;
      },

      transformErrorResponse: (response: ExtendedErrorDefaul): { message: string } => {
        if (response.data.message) {
          return { message: response.data.message };
        }
        return { message: "Error de conexión con el servidor" };
      },

    }),

    // //Registro bodega
    registerWinerie: build.mutation<
      string,
      WineriesType
    >({
      query: (winerie) => ({
        url: "/storage",
        method: "POST",
        body: winerie,
      }),
      invalidatesTags: ["wineries"],
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
    updateWinerie: build.mutation<
      string,
      WineriesType
    >({
      query: (data: WineriesType) => ({
        url: `storage/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wineries"],
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
    // updateUsersState: build.mutation<
    //   string,
    //   { id: number; status: string }
    // >({
    //   query: ({ id, status }) => ({
    //     url: `users/${id}/status`,
    //     method: "PATCH",
    //     body: { status },
    //   }),
    //   invalidatesTags: ["users"],
    //   transformResponse: (response: { message: string }) => {
    //     return response.message;
    //   },
    //   transformErrorResponse: (response: {
    //     data?: { error?: errorDefaultApi[] };
    //     status: number;
    //   }): errorDefaultApi[] => {
    //     if (response.data?.error?.length) {
    //       return response.data.error.map((err) => ({
    //         message: err.message,
    //         field: err.field || "",
    //       }));
    //     }
    //     return [
    //       {
    //         message: "Error de conexión con el servidor.",
    //         field: "",
    //       },
    //     ];
    //   },
    // }),


    // getUsers: build.query<UsersResponse, GetUsersParams>({
    //   query: ({ page, search, limit }) => ({
    //     url: "/users",
    //     method: "GET",
    //     params: { page, search, limit },
    //   }),
    //   providesTags: ["users"],
    // }),

    // Nuevo endpoint para el Autocomplete (obtiene TODOS los usuarios)
    getAllUsersForSelect: build.query<{ key: number; label: string }[], void>({
      async queryFn(
        _arg,
        _api,
        _extraOptions,
        fetchWithBQ
      ): Promise<QueryFnReturn> {
        try {
          let allUsers: UsersType[] = [];
          let page = 1;
          let totalPages = 1;

          do {
            const response = await fetchWithBQ({
              url: "/users",
              method: "GET",
              params: { page, limit: 100 },
            });

            if (response.error) {
              throw response.error;
            }

            const data = response.data as UsersResponse;
            allUsers = [...allUsers, ...data.data];
            totalPages = data.meta.lastPage;
            page++;
          } while (page <= totalPages);

          // Asegurando que id nunca sea undefined
          const usersForSelect = allUsers.map((user) => ({
            key: user.id as number, // Aquí forzamos el tipo a number
            label: user.username,
          }));

          return { data: usersForSelect };
        } catch (error) {
          return { error: error as ErrorResponse };
        }
      },
      providesTags: ["users"],
    }),
  }),
});

export const {
useGetWineriesQuery,
useRegisterWinerieMutation,
useUpdateWinerieMutation,
useGetAllUsersForSelectQuery
} = WineriesSlice;
