import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Id, toast } from "react-toastify";
import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";
import { Building2, Calendar, CalendarCheck, Crown, Edit3, Infinity, MapPin, PlusCircle, Settings, Users } from "lucide-react";
import { RegisterBusinessProps } from "@/types/bussinesTypes/businessTypes";
import { BusinessRegisterRequestZod, BusinessSchemaZod } from "@/validations/businessValidation/businessSchemaZod";
import { useRegisterBusinessMutation, useUpdateBusinessMutation } from "@/store/slice/businessSlice";
import { Switch } from "@heroui/react";

const RegisterBusinessComponent = ({ onClose, business }: RegisterBusinessProps) => {
  const referenciaIdtostat = useRef<Id | null>(null);

  const [registerBusiness, { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister, error: errorRegister }] = useRegisterBusinessMutation();

  const [updateBusiness, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate }] = useUpdateBusinessMutation();

  const isLoading = isLoadingRegister || isLoadingUpdate;
  const isSuccess = isSuccessRegister || isSuccessUpdate;
  const isError = isErrorRegister || isErrorUpdate;
  const error = errorRegister || errorUpdate;


    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<BusinessRegisterRequestZod>({
      resolver: zodResolver(BusinessSchemaZod),
      defaultValues: {
  name: "",
  address: "",
  createdAt: "",
  planRenewalDate: "",
  config: {
    infinty: false,
    cuantityUsers: 1,
    maxStorage: 1
  }
}
    });


    // useEffect(()=>{
    //   if(business){
    //     reset(business)
    //   }
    // },[business,reset])


useEffect(() => {
  if (business) {
    reset({
      name: business.name,
      address: business.address,
      createdAt: business.createdAt,
      planRenewalDate: business.planRenewalDate,
      config: {
        infinty: business.config[0]?.infinty || false,
        cuantityUsers: business.config[0]?.cuantityUsers || 1,
        maxStorage: business.config[0]?.maxStorage || 1,
      },
    });
  }
}, [business, reset]);




        useEffect(() => {
      
              if (isLoading) {
            referenciaIdtostat.current = toast.loading("Procesando...");
          }
          if (isSuccess) {
            toast.dismiss(referenciaIdtostat.current!);
            toast.success(`Negocio ${business ? "actualizado" : "registrado"} correctamente.`);
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


      // const onSubmit=async(data:BusinessType)=>{
      //   try {
      //     if(business?.id){
      //       await updateBusiness({...data,id:business.id}).unwrap()
      //     }else{
      //       await registerBusiness(data).unwrap()
      //     }
      //   } catch (error) {
      //     console.error('Error: ', error)
      //   }
      // }


  //       const onSubmit = async (data: BusinessRegisterRequestZod) => {
  //   try {
  //     if (business?.id) {
  //       // Para actualizar, incluimos el id del business existente
  //       await updateBusiness({ ...data, id: business.id }).unwrap();
  //     } else {
  //       // Para registrar, solo enviamos los datos del formulario
  //       await registerBusiness(data).unwrap();
  //     }
  //   } catch (error) {
  //     console.error('Error: ', error);
  //   }
  // };


    const onSubmit = async (data: BusinessRegisterRequestZod) => {
    console.log("📤 Datos del formulario:", data); // ✅ Debug
    
    try {
      // Mapear infinity de vuelta a infinty para el backend
      const dataForBackend = {
        ...data,
        config: {
          ...data.config,
          infinty: data.config.infinty, // Mapear infinity a infinty
        },
      };

      // Remover infinity del objeto para evitar conflictos
      delete (dataForBackend.config as any).infinity;

      if (business?.id) {
        console.log("🔄 Actualizando empresa con ID:", business.id);
        await updateBusiness({ ...dataForBackend, id: business.id }).unwrap();
      } else {
        console.log("➕ Registrando nueva empresa");
        await registerBusiness(dataForBackend).unwrap();
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  useEffect(() => {
  if (Object.keys(errors).length > 0) {
    console.log("❌ Errores de validación:", errors);
    toast.error("Por favor corrige los errores del formulario");
  }
}, [errors]);




  return (
  //   <>
  //     <div className="flex flex-col h-full">
  //   <div className="flex-1 overflow-y-auto p-4">
  //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  //       {/* Información Básica del Almacén */}
  //       <div className="space-y-4">
  //         <div className="flex items-center gap-3">
  //           <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
  //             <Crown className="w-4 h-4 text-cuarto" />
  //           </div>
  //           <div>
  //             <h3 className="text-lg font-semibold text-gray-900">Información del Rol</h3>
  //             <p className="text-sm text-gray-600">Datos básicos del Rol</p>
  //           </div>
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
  //           <div className="space-y-2">
  //             <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
  //               <Crown className="w-4 h-4" />
  //               Nombre del Rol
  //             </label>
  //             <InputDinamic 
  //               errors={errors} 
  //               control={control} 
  //               id="nameRol" 
  //               type="text" 
  //               name="nameRol" 
  //               placeholder="Ingrese el nombre del rol" 
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       {/* Botones de acción */}
  //       <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
  //         <button 
  //           type="button" 
  //           onClick={onClose} 
  //           className="flex-1 sm:flex-none px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium focus:ring-2 focus:ring-gray-200 focus:outline-none"
  //         >
  //           Cancelar
  //         </button>

  //         <button 
  //           type="submit" 
  //           disabled={isLoadingRegister || isLoadingUpdate} 
  //           className="flex-1 sm:flex-none px-6 py-3 bg-accents-500 text-white rounded-lg hover:bg-accents-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center gap-2"
  //         >
  //           {isLoadingRegister || isLoadingUpdate ? (
  //             <>
  //               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  //               Procesando...
  //             </>
  //           ) : (
  //             <>
  //               {business ? (
  //                 <>
  //                   <Edit3 className="w-4 h-4" />
  //                   Actualizar Rol
  //                 </>
  //               ) : (
  //                 <>
  //                   <PlusCircle className="w-4 h-4" />
  //                   Registrar Rol
  //                 </>
  //               )}
  //             </>
  //           )}
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // </div>
  //   </>
  <>
  <div className="flex flex-col h-full">
  <div className="flex-1 overflow-y-auto p-4">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Información Básica de la Empresa */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Crown className="w-4 h-4 text-cuarto" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Información de la Empresa</h3>
            <p className="text-sm text-gray-600">Datos básicos de la empresa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Nombre de la Empresa
            </label>
            <InputDinamic 
              errors={errors} 
              control={control} 
              id="name" 
              type="text" 
              name="name" 
              placeholder="Ingrese el nombre de la empresa" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Dirección
            </label>
            <InputDinamic 
              errors={errors} 
              control={control} 
              id="address" 
              type="text" 
              name="address" 
              placeholder="Ingrese la dirección" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha de Creación
            </label>
            <InputDinamic 
              errors={errors} 
              control={control} 
              id="createdAt" 
              type="date" 
              name="createdAt" 
              placeholder="fecha de creacion"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4" />
              Fecha de Renovación de Plan
            </label>
            <InputDinamic 
              errors={errors} 
              control={control} 
              id="planRenewalDate" 
              type="date" 
              name="planRenewalDate" 
              placeholder="fecha de renovación"
            />
          </div>
        </div>
      </div>

      {/* Configuración de la Empresa */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-cuarto" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
            <p className="text-sm text-gray-600">Configuración del plan de la empresa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Infinity className="w-4 h-4" />
              Plan Infinito
            </label>
            <Controller
              name="config.infinty"
              control={control}
              render={({ field }) => (
                <Switch
                    checked={field.value}
  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Cantidad de Usuarios
            </label>
            <InputDinamic 
              errors={errors} 
              control={control} 
              id="config.cuantityUsers" 
              type="number" 
              valueType="number"
              name="config.cuantityUsers" 
              placeholder="Ingrese la cantidad de usuarios" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
               Maximo de bodegas 
            </label>
            <InputDinamic 
              errors={errors} 
              control={control} 
              id="config.maxStorage" 
              type="number" 
              valueType="number"
              name="config.maxStorage" 
              placeholder="Ingrese el almacenamiento máximo" 
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
              {business ? (
                <>
                  <Edit3 className="w-4 h-4" />
                  Actualizar Empresa
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  Registrar Empresa
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

export default RegisterBusinessComponent;
