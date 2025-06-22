import { baseQueryconfig } from "@/config/configAxios/configAxios";
import { errorDefaultApi, ExtendedErrorDefaul } from "@/types/configAxios/axiosConfigType";
import { GetUnitOfMeasurementsParams, UnitOfMeasurementsResponse, UnitOfMeasurementsType } from "@/types/unitOfMeasurementTypes/unitOfMeasurementType";
import { createApi } from "@reduxjs/toolkit/query/react";

export const UnitOfMeasurementSlice = createApi({
  reducerPath: "unitOfMeasurement",
  baseQuery: baseQueryconfig,
  tagTypes: ["unitOfMeasurement"],

  endpoints: (build) => ({
    
    //listar unidad de medida
    getUnitOfMeasurements: build.query<UnitOfMeasurementsResponse,GetUnitOfMeasurementsParams>({
      query: ({page,search,limit}) => ({
        url: "/measure-unit",
        method: "GET",
        params:{
          page,
          search,
          limit
        },
      }),
      providesTags: ["unitOfMeasurement"],

      transformResponse: (response:UnitOfMeasurementsResponse) => {
        return response;
      },

      transformErrorResponse: (response: ExtendedErrorDefaul): { message: string } => {
        if (response.data.message) {
          return { message: response.data.message };
        }
        return { message: "Error de conexión con el servidor" };
      },

    }),

    // //Registro unidad de medida
    registerUnitOfMeasurement: build.mutation<
      string,
      UnitOfMeasurementsType
    >({
      query: (unit) => ({
        url: "/measure-unit",
        method: "POST",
        body: unit,
      }),
      invalidatesTags: ["unitOfMeasurement"],
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

    // //actualizar unidad de medida:
    updateUnitOfMeasurement: build.mutation<
      string,
      UnitOfMeasurementsType
    >({
      query: (data: UnitOfMeasurementsType) => ({
        url: `measure-unit/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["unitOfMeasurement"],
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

    //actualizar estado unidad de medida
    updateUnitOfMeasurementState: build.mutation<
      string,
      { id: number; status: string }
    >({
      query: ({ id, status }) => ({
        url: `measure-unit/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["unitOfMeasurement"],
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
    useGetUnitOfMeasurementsQuery,
    useRegisterUnitOfMeasurementMutation,
    useUpdateUnitOfMeasurementMutation,
    useUpdateUnitOfMeasurementStateMutation
} = UnitOfMeasurementSlice;
