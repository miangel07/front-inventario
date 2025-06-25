import { baseQueryconfigFormData } from "@/config/configAxios/configAxios";
import { errorDefaultApi, ExtendedErrorDefaul } from "@/types/configAxios/axiosConfigType";
import { GetProductsParams, ProductsResponse, ProductsType } from "@/types/productsTypes/productsType";
import { createApi } from "@reduxjs/toolkit/query/react";

export const ProductsSlice = createApi({
  reducerPath: "product",
  baseQuery: baseQueryconfigFormData,
  tagTypes: ["product"],

  endpoints: (build) => ({
    

    getProducts: build.query<ProductsResponse,GetProductsParams>({
      query: ({page,search,limit}) => ({
        url: "/product",
        method: "GET",
        params:{
          page,
          search,
          limit
        },
      }),
      providesTags: ["product"],

      transformResponse: (response:ProductsResponse) => {
        return response;
      },

      transformErrorResponse: (response: ExtendedErrorDefaul): { message: string } => {
        if (response.data.message) {
          return { message: response.data.message };
        }
        return { message: "Error de conexión con el servidor" };
      },

    }),


    registerProduct: build.mutation<
      string,
      ProductsType
    >({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["product"],
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

    
    updateProduct: build.mutation<
      string,
      ProductsType
    >({
      query: (data: ProductsType) => ({
        url: `products/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
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

    
    updateProductStatus: build.mutation<
      string,
      { id: number; status: string }
    >({
      query: ({ id, status }) => ({
        url: `products/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["product"],
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
    useGetProductsQuery,
    useRegisterProductMutation,
    useUpdateProductMutation,
    useUpdateProductStatusMutation
} = ProductsSlice;
