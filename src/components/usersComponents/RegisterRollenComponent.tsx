import { useRegisterRolleMutation, useUpdateRolleMutation } from "@/store/slice/usersSlice";
import { RegisterRollenProps, RollenType } from "@/types/usersTypes/usersTypes";
import { RolleSchemaZod } from "@/validations/userValidation/userSchemaZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Id, toast } from "react-toastify";
import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";
import { Crown, Edit3, PlusCircle } from "lucide-react";

const RegisterRollenComponent = ({ onClose, rolle }: RegisterRollenProps) => {
  const referenciaIdtostat = useRef<Id | null>(null);

  const [registerRolle, { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister, error: errorRegister }] = useRegisterRolleMutation();

  const [updateRolle, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate }] = useUpdateRolleMutation();

  const isLoading = isLoadingRegister || isLoadingUpdate;
  const isSuccess = isSuccessRegister || isSuccessUpdate;
  const isError = isErrorRegister || isErrorUpdate;
  const error = errorRegister || errorUpdate;


    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<RollenType>({
      resolver: zodResolver(RolleSchemaZod),
      defaultValues: {},
    });


    useEffect(()=>{
      if(rolle){
        reset(rolle)
      }
    },[rolle,reset])

        useEffect(() => {
      
              if (isLoading) {
            referenciaIdtostat.current = toast.loading("Procesando...");
          }
          if (isSuccess) {
            toast.dismiss(referenciaIdtostat.current!);
            toast.success(`Rol ${rolle ? "actualizado" : "registrado"} correctamente.`);
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


      const onSubmit=async(data:RollenType)=>{
        try {
          if(rolle?.id){
            await updateRolle({...data,id:rolle.id}).unwrap()
          }else{
            await registerRolle(data).unwrap()
          }
        } catch (error) {
          console.error('Error: ', error)
        }
      }



  return (
    <>
      <div className="flex flex-col h-full">
    <div className="flex-1 overflow-y-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Información Básica del Almacén */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Crown className="w-4 h-4 text-cuarto" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Información del Rol</h3>
              <p className="text-sm text-gray-600">Datos básicos del Rol</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Nombre del Rol
              </label>
              <InputDinamic 
                errors={errors} 
                control={control} 
                id="nameRol" 
                type="text" 
                name="nameRol" 
                placeholder="Ingrese el nombre del rol" 
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
                {rolle ? (
                  <>
                    <Edit3 className="w-4 h-4" />
                    Actualizar Rol
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    Registrar Rol
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

export default RegisterRollenComponent;
