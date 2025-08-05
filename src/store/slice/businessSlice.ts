import { baseQueryconfig } from "@/config/configAxios/configAxios";
import { BusinessResponse, GetBusinessParams } from "@/types/bussinesTypes/businessTypes";
import { errorDefaultApi, ExtendedErrorDefaul } from "@/types/configAxios/axiosConfigType";
import { BusinessRegisterRequestZod } from "@/validations/businessValidation/businessSchemaZod";
import { createApi } from "@reduxjs/toolkit/query/react";

export const BusinessSlice = createApi({
  reducerPath: "business",
  baseQuery: baseQueryconfig,
  tagTypes: ["business"],

  endpoints: (build) => ({
    
    //listar negocios
    getBusiness: build.query<BusinessResponse,GetBusinessParams>({
      query: ({page,search,limit}) => ({
        url: "/business",
        method: "GET",
        params:{
          page,
          search,
          limit
        },
      }),
      providesTags: ["business"],

      transformResponse: (response:BusinessResponse) => {
        return response;
      },

      transformErrorResponse: (response: ExtendedErrorDefaul): { message: string } => {
        if (response.data.message) {
          return { message: response.data.message };
        }
        return { message: "Error de conexión con el servidor" };
      },

    }),

    // //Registro negocios
    registerBusiness: build.mutation<
      string,
      BusinessRegisterRequestZod
    >({
      query: (business) => ({
        url: "/business",
        method: "POST",
        body: business,
      }),
      invalidatesTags: ["business"],
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

    // //actualizar negocio:
    updateBusiness: build.mutation<
      string,
      BusinessRegisterRequestZod
    >({
      query: (data: BusinessRegisterRequestZod) => ({
        url: `business/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["business"],
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

    //actualizar estado categorias
    updateBusinessState: build.mutation<
      string,
      { id: number; status: string }
    >({
      query: ({ id, status }) => ({
        url: `business/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["business"],
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
  useGetBusinessQuery,
  useRegisterBusinessMutation,
  useUpdateBusinessMutation,
  useUpdateBusinessStateMutation
} = BusinessSlice;
