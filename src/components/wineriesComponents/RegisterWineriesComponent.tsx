import { useRegisterWinerieMutation, useUpdateWinerieMutation } from "@/store/slice/wineriesSlice";
import { RegisterWinerieProps, WineriesType } from "@/types/wineriesTypes/wineriesTypes";
import { WinerieSchemaZod } from "@/validations/wineriesValidation/winerieSchemaZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Home, MapPin, Package, PlusCircle, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Id, toast } from "react-toastify";
import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";
import SelectSearchAutoCompleteDinamic from "../DYNAMIC_COMPONENTS/SelectSearchAutoCompleteDinamic";
import { winerieTypesOptions } from "@/utils/wineriesUtils/registerWineriesUtils";
import { useGetUsersQuery } from "@/store/slice/usersSlice";

const RegisterWineriesComponent = ({ onClose, winerie }: RegisterWinerieProps) => {
  const referenciaIdtostat = useRef<Id | null>(null);

  const [registerUser, { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister, error: errorRegister }] = useRegisterWinerieMutation();

  const [updateUser, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate }] = useUpdateWinerieMutation();


const { data: usersResponse, isLoading: isLoadingOptionUser } = useGetUsersQuery({
  page: 1,
  limit: 1000 // Un número grande para obtener todos los registros sin paginación
});

  const isLoading = isLoadingRegister || isLoadingUpdate;
  const isSuccess = isSuccessRegister || isSuccessUpdate;
  const isError = isErrorRegister || isErrorUpdate;
  const error = errorRegister || errorUpdate;

const {
  control,
  handleSubmit,
  formState: { errors },
  reset
} = useForm<WineriesType>({
  resolver: zodResolver(WinerieSchemaZod),
  defaultValues: {},
});

  const usersOptions =
    usersResponse?.data.map((items) => ({
      key: `${items.id}`,
      label: items?.username,
    })) || [];




      useEffect(() => {
    if (winerie) {
      reset(winerie);
    }
  }, [winerie, reset]);


    useEffect(() => {
  
          if (isLoading) {
        referenciaIdtostat.current = toast.loading("Procesando...");
      }
      if (isSuccess) {
        toast.dismiss(referenciaIdtostat.current!);
        toast.success(`Bodega ${winerie ? "actualizada" : "registrada"} correctamente.`);
        onClose();
      }
  
    if (isError) {
      toast.dismiss(referenciaIdtostat.current!);
      if (Array.isArray(error)) {
        error.forEach((e) => toast.error(`${e.message}`));
      } else {
        toast.error("Ocurrió un error al procesar la solicitud");
      }
      
    }
  }, [isLoading, isSuccess, isError, error]);

    const onSubmit = async (data: WineriesType) => {

      try {

        if (winerie?.id) {
          await updateUser({ ...data, id: winerie.id }).unwrap();
        } else {
          await registerUser(data).unwrap();
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };


  return (
    <>
  <div className="flex flex-col h-full">
    <div className="flex-1 overflow-y-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Información Básica del Almacén */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-cuarto" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Información del Almacén</h3>
              <p className="text-sm text-gray-600">Datos básicos del almacén</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Nombre del Almacén
              </label>
              <InputDinamic 
                errors={errors} 
                control={control} 
                id="nameStorage" 
                type="text" 
                name="nameStorage" 
                placeholder="Ingrese el nombre del almacén" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Home className="w-4 h-4" />
                Tipo de Almacén
              </label>
              <SelectSearchAutoCompleteDinamic 
                data={winerieTypesOptions} 
                label="Seleccione tipo de almacén" 
                name="TypeStorage" 
                control={control} 
                placeholder="Escribe para buscar..." 
                errors={errors} 
                className="w-full" 
                radius="md" 

              />
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-cuarto" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Ubicación</h3>
              <p className="text-sm text-gray-600">Dirección del almacén</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 pl-11">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Dirección Completa
              </label>
              <InputDinamic 
                errors={errors} 
                control={control} 
                id="address" 
                type="text" 
                name="address" 
                placeholder="Ingrese la dirección del almacén"
              />
            </div>
          </div>
        </div>

        {/* Responsable */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-cuarto" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Responsable</h3>
              <p className="text-sm text-gray-600">Encargado del almacén</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pl-11">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Encargado
              </label>
              <SelectSearchAutoCompleteDinamic 
                data={usersOptions} 
                label="Seleccione el responsable" 
                name="managerId" 
                control={control}
                valueType="number" 
                placeholder="Escribe para buscar..." 
                errors={errors} 
                className="w-full" 
                radius="md" 
              />
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 sm:flex-none px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium focus:ring-2 focus:ring-gray-200 focus:outline-none"
          >
            Cancelar
          </button>

          <button 
            type="submit" 
            disabled={isLoadingRegister || isLoadingUpdate} 
            className="flex-1 sm:flex-none px-6 py-3 bg-accents-500 text-white rounded-lg hover:bg-accents-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center gap-2"
          >
            {isLoadingRegister || isLoadingUpdate ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Procesando...
              </>
            ) : (
              <>
                {winerie ? (
                  <>
                    <Edit3 className="w-4 h-4" />
                    Actualizar Almacén
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    Registrar Almacén
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
    </>
  )
};

export default RegisterWineriesComponent;
