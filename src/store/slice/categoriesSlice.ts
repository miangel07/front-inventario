import { baseQueryconfig } from "@/config/configAxios/configAxios";
import { CategoriesResponse, CategoriesType, GetCategoriesParams } from "@/types/categoriesTypes/categoriesType";
import { errorDefaultApi, ExtendedErrorDefaul } from "@/types/configAxios/axiosConfigType";
import { createApi } from "@reduxjs/toolkit/query/react";

export const CategoriesSlice = createApi({
  reducerPath: "category",
  baseQuery: baseQueryconfig,
  tagTypes: ["category"],

  endpoints: (build) => ({
    
    //listar categorias
    getCategories: build.query<CategoriesResponse,GetCategoriesParams>({
      query: ({page,search,limit}) => ({
        url: "/category",
        method: "GET",
        params:{
          page,
          search,
          limit
        },
      }),
      providesTags: ["category"],

      transformResponse: (response:CategoriesResponse) => {
        return response;
      },

      transformErrorResponse: (response: ExtendedErrorDefaul): { message: string } => {
        if (response.data.message) {
          return { message: response.data.message };
        }
        return { message: "Error de conexión con el servidor" };
      },

    }),

    // //Registro categorias
    registerCategories: build.mutation<
      string,
      CategoriesType
    >({
      query: (category) => ({
        url: "/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["category"],
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

    // //actualizar categorias:
    updateCategories: build.mutation<
      string,
      CategoriesType
    >({
      query: (data: CategoriesType) => ({
        url: `category/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
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
    updateCategoryState: build.mutation<
      string,
      { id: number; status: string }
    >({
      query: ({ id, status }) => ({
        url: `category/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["category"],
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
    useGetCategoriesQuery,
    useRegisterCategoriesMutation,
    useUpdateCategoriesMutation,
    useUpdateCategoryStateMutation
} = CategoriesSlice;
