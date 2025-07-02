import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, EyeOff, Eye, Edit3, UserPlus, User, CreditCard, Mail, Phone, MapPin } from "lucide-react";
import { RegisterUserProps, UsersType } from "@/types/usersTypes/usersTypes";
import { Id, toast } from "react-toastify";
import { useRegisterUserMutation, useUpdateUserMutation } from "@/store/slice/usersSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchemaZod } from "@/validations/userValidation/userSchemaZod";
import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";
import { documentTypesOptions, rollenOptionsAdmin } from "@/utils/usersUtils/registerUserUtils";
import SelectSearchAutoCompleteDinamic from "../DYNAMIC_COMPONENTS/SelectSearchAutoCompleteDinamic";

const RegisterUserComponent = ({ onClose, user }: RegisterUserProps) => {
  const referenciaIdtostat = useRef<Id | null>(null);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleConfirma, setIsVisibleConfirma] = useState<boolean>(false);

  const [registerUser, { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister, error: errorRegister }] = useRegisterUserMutation();

  const [updateUser, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate }] = useUpdateUserMutation();


  const isLoading = isLoadingRegister || isLoadingUpdate;
  const isSuccess = isSuccessRegister || isSuccessUpdate;
  const isError = isErrorRegister || isErrorUpdate;
  const error = errorRegister || errorUpdate;

  
  const isEditing = !!user?.id;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UsersType>({
    resolver: zodResolver(UserSchemaZod),
    defaultValues: {
      business:3
    },
  });

  useEffect(() => {
    if (user) {
      // Para edición, excluir los campos de contraseña
      const { password, password_confirmation, ...userWithoutPasswords } = user;
      reset(userWithoutPasswords);
    }
  }, [user, reset]);

  useEffect(() => {
    if (isLoading) {
      referenciaIdtostat.current = toast.loading("Procesando...");
    }
    if (isSuccess) {
      toast.dismiss(referenciaIdtostat.current!);
      toast.success(`Usuario ${user ? "actualizado" : "registrado"} correctamente.`);
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

  const onSubmit = async (data: UsersType) => {
    try {
      if (user?.id) {
        // Para actualización, usar los datos tal como vienen del formulario
        await updateUser({ ...data, id: user.id }).unwrap();
      } else {
        // Para creación, eliminar la confirmación antes de enviar
        const { password_confirmation, ...createData } = data;
        await registerUser(createData).unwrap();
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
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-cuarto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
                  <p className="text-sm text-gray-600">Datos básicos del usuario</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombres
                  </label>
                  <InputDinamic errors={errors} control={control} id="username" type="text" name="username" placeholder="Ingrese sus nombres" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Apellidos
                  </label>
                  <InputDinamic errors={errors} control={control} id="lastname" type="text" name="lastname" placeholder="Ingrese sus apellidos" />
                </div>
                <div className="grid grid-cols-1 gap-4 pl-11">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Rol
                    </label>
                    <SelectSearchAutoCompleteDinamic 
                    data={rollenOptionsAdmin} 
                    label="Seleccione el rol" 
                    name="Rol" 
                    control={control} 
                    valueType="number" 
                    placeholder="Escribe para buscar..." 
                    errors={errors} 
                    className="w-full" 
                    radius="md" 
                    />
                  </div>
                </div>


                <div className="grid grid-cols-1 gap-4 pl-11">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Negocio
                    </label>
                    <SelectSearchAutoCompleteDinamic 
                    data={rollenOptionsAdmin} 
                    label="Seleccione el negocio" 
                    name="business" 
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
            </div>

            {/* Identificación */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-cuarto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Identificación</h3>
                  <p className="text-sm text-gray-600">Documento de identidad</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Tipo de Documento
                  </label>
                  <SelectSearchAutoCompleteDinamic 
                  data={documentTypesOptions} 
                  label="Seleccione tipo de documento" 
                  name="typeDocument" 
                  control={control} 
                  placeholder="Escribe para buscar..." 
                  errors={errors} 
                  className="w-full" 
                  radius="md" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Número de Identificación
                  </label>
                  <InputDinamic errors={errors} control={control} id="identificationNumber" type="number" name="identificationNumber" placeholder="Ingrese su numero de identificacion" />
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-cuarto" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
                  <p className="text-sm text-gray-600">Datos para comunicación</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Correo Electrónico
                  </label>
                  <InputDinamic errors={errors} control={control} id="email" type="email" name="email" placeholder="Ingrese su correo" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </label>
                  <InputDinamic errors={errors} control={control} id="phone" type="number" name="phone" placeholder="Ingrese su numero telefonico" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Dirección
                  </label>
                  <InputDinamic errors={errors} control={control} id="address" type="text" name="address" placeholder="Ingrese su direccion" />
                </div>
              </div>
            </div>

            {/* Contraseña - Solo mostrar en modo creación */}
            {!isEditing && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4 text-cuarto" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Seguridad</h3>
                    <p className="text-sm text-gray-600">Configuración de acceso</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Contraseña
                    </label>
                    <InputDinamic
                      errors={errors}
                      control={control}
                      id="password"
                      type={isVisible ? "text" : "password"}
                      name="password"
                      placeholder="Contraseña segura"
                      icon={
                        <button aria-label="toggle password visibility" type="button" onClick={() => setIsVisible(!isVisible)} className="focus:outline-none p-1 hover:bg-gray-100 rounded-md transition-colors">
                          {isVisible ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                        </button>
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirmar Contraseña
                    </label>
                    <InputDinamic
                      errors={errors}
                      control={control}
                      id="password_confirmation"
                      type={isVisibleConfirma ? "text" : "password"}
                      name="password_confirmation"
                      placeholder="Confirmar contraseña"
                      icon={
                        <button aria-label="toggle password visibility" type="button" onClick={() => setIsVisibleConfirma(!isVisibleConfirma)} className="focus:outline-none p-1 hover:bg-gray-100 rounded-md transition-colors">
                          {isVisibleConfirma ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                        </button>
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button type="button" onClick={onClose} className="flex-1 sm:flex-none px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium focus:ring-2 focus:ring-gray-200 focus:outline-none">
                Cancelar
              </button>

              <button type="submit" disabled={isLoadingRegister || isLoadingUpdate} className="flex-1 sm:flex-none px-6 py-3 bg-accents-500 text-white rounded-lg hover:bg-accents-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center gap-2">
                {isLoadingRegister || isLoadingUpdate ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    {user ? (
                      <>
                        <Edit3 className="w-4 h-4" />
                        Actualizar Usuario
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Registrar Usuario
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
  );
};

export default RegisterUserComponent;
