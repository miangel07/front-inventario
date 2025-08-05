    // <>
    //   <div className="flex flex-col h-full">
    //     <div className="flex-1 overflow-y-auto p-4">
    //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //         <div className="space-y-4">
    //           <div className="flex items-center gap-3">
    //             <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
    //               <Package className="w-4 h-4 text-cuarto" />
    //             </div>
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-900">Información del producto</h3>
    //               <p className="text-sm text-gray-600">Datos básicos del producto</p>
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Package className="w-4 h-4" />
    //                 Nombre del producto
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="nameProduct"
    //                 type="text"
    //                 name="nameProduct"
    //                 placeholder="Ingrese nombre del producto"
    //               />
    //             </div>

    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <ClipboardList className="w-4 h-4" />
    //                 Descripcion
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="description"
    //                 type="text"
    //                 name="description"
    //                 placeholder="Ingrese la descripcion del producto"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="space-y-4">
    //           <div className="flex items-center gap-3">
    //             <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
    //               {/* <CreditCard className="w-4 h-4 text-cuarto" /> */}
    //             </div>
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-900">Identificación</h3>
    //               <p className="text-sm text-gray-600">Documento de identidad</p>
    //             </div>
    //           </div>
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Barcode className="w-4 h-4" />
    //                 Codigo interno
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="internalCode"
    //                 type="number"
    //                 name="internalCode"
    //                 placeholder="Ingrese el codigo interno"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="space-y-4">
    //           <div className="flex items-center gap-3">
    //             <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
    //               {/* <Mail className="w-4 h-4 text-cuarto" /> */}
    //             </div>
    //             <div>
    //               <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
    //               <p className="text-sm text-gray-600">Datos para comunicación</p>
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Factory className="w-4 h-4" />
    //                 marca del producto
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="brand"
    //                 type="text"
    //                 name="brand"
    //                 placeholder="Ingrese la marca del producto"
    //               />
    //             </div>

    //             <div className="space-y-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Boxes className="w-4 h-4" />
    //                 Cantidad
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="quantity"
    //                 type="number"
    //                 name="quantity"
    //                 placeholder="Ingrese su numero telefonico"
    //               />
    //             </div>

    //             <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <ArrowUp className="w-4 h-4" />
    //                 Cantidad Maxima
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="stockMax"
    //                 type="number"
    //                 name="stockMax"
    //                 placeholder="Ingrese cantidad maxima del producto"
    //               />
    //             </div>
    //                                 <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <ArrowUp className="w-4 h-4" />
    //                 Cantidad Minima
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="stockMin"
    //                 type="number"
    //                 name="stockMin"
    //                 placeholder="Ingrese cantidad maxima del producto"
    //               />
    //             </div>
    //                                                     <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Image className="w-4 h-4" />
    //                 Imagen del producto
    //               </label>
    //               <InputImageDinamic
    //           name="imagen_1"
    //           register={register}
    //           setValue={setValue}
    //           errors={errors}
    //           width="100%"
    //           height="15rem"
    //           placeholder="Imagen producto"
    //               />
    //             </div>

    //                                                     <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <FileText className="w-4 h-4" />
    //                 Observaciones
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="observations"
    //                 type="number"
    //                 name="observations"
    //                 placeholder="Ingrese observaciones del producto"
    //               />
    //             </div>
    //             <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <MapPin className="w-4 h-4" />
    //                 ubicación del producto
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="location"
    //                 type="text"
    //                 name="location"
    //                 placeholder="Ingrese ubicación del producto"
    //               />
    //             </div>
    //                                 <div className="space-y-2 md:col-span-2">
    //               <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //                 <Calendar className="w-4 h-4" />
    //                 fecha de vencimiento
    //               </label>
    //               <InputDinamic
    //                 errors={errors}
    //                 control={control}
    //                 id="expirationDate"
    //                 type="date"
    //                 name="expirationDate"
    //                 placeholder="Ingrese fecha de vencimiento del producto"
    //               />
    //             </div>

    //         <div className="space-y-2">
    //           <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //             <Ruler className="w-4 h-4" />
    //             Unidad de medida
    //           </label>
    //           <SelectSearchAutoCompleteDinamic
    //             data={unitOptions}
    //             label="Seleccione tipo de documento"
    //             name="measureUnitId"
    //             control={control}
    //             placeholder="Escribe para buscar..."
    //             errors={errors}
    //             className="w-full"
    //             radius="md"
    //           />
    //         </div>
    //                         <div className="space-y-2">
    //           <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //             <Ruler className="w-4 h-4" />
    //             Categoria del producto
    //           </label>
    //           <SelectSearchAutoCompleteDinamic
    //             data={categoryOptions}
    //             label="Seleccione tipo de documento"
    //             name="categoryId"
    //             control={control}
    //             placeholder="Escribe para buscar..."
    //             errors={errors}
    //             className="w-full"
    //             radius="md"
    //           />
    //         </div>
    //                         <div className="space-y-2">
    //           <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
    //             <Ruler className="w-4 h-4" />
    //             Bodega
    //           </label>
    //           <SelectSearchAutoCompleteDinamic
    //             data={winerieOptions}
    //             label="Seleccione tipo de documento"
    //             name="storage"
    //             control={control}
    //             placeholder="Escribe para buscar..."
    //             errors={errors}
    //             className="w-full"
    //             radius="md"
    //           />
    //         </div>

    //           </div>
    //         </div>
    //                     <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
    //                       <button type="button" onClick={onClose} className="flex-1 sm:flex-none px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium focus:ring-2 focus:ring-gray-200 focus:outline-none">
    //                         Cancelar
    //                       </button>

    //                       <button type="submit" disabled={isLoadingRegister || isLoadingUpdate} className="flex-1 sm:flex-none px-6 py-3 bg-accents-500 text-white rounded-lg hover:bg-accents-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center gap-2">
    //                         {isLoadingRegister || isLoadingUpdate ? (
    //                           <>
    //                             <Loader2 className="w-4 h-4 animate-spin" />
    //                             Procesando...
    //                           </>
    //                         ) : (
    //                           <>
    //                             {product ? (
    //                               <>
    //                                 <Edit3 className="w-4 h-4" />
    //                                 Actualizar Producto
    //                               </>
    //                             ) : (
    //                               <>
    //                                 <PlusCircle className="w-4 h-4" />
    //                                 Registrar Producto
    //                               </>
    //                             )}
    //                           </>
    //                         )}
    //                       </button>
    //                     </div>

    //       </form>
    //     </div>
    //   </div>
    // </>


    import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import { TableDinamic } from "@/components/DYNAMIC_COMPONENTS/TableDinamic";
import RegisterRollenComponent from "@/components/usersComponents/RegisterRollenComponent";
import RegisterUserComponent from "@/components/usersComponents/RegisterUserComponent";
import { useListRollenHook } from "@/hooks/usersHooks/useListRollenHook";
import { useListUsersHook } from "@/hooks/usersHooks/useListUsersHook";
import LayoutDefault from "@/layouts/Layoutdefault";
import { selectUserRole } from "@/store/slice/authSlice";
import { useAppSelector } from "@/store/store";
import { columnsRollen, columnsUsers } from "@/utils/usersUtils/listUsersUtils";
import { Spinner } from "@heroui/react";
import { Building2, Crown, User } from "lucide-react";
import { useState } from "react";

const UsersPage = () => {

  // const userRole = useAppSelector(selectUserRole);
  

  const [contenido, setContenido] = useState<"users" | "rols">("users");

  // Estados para la tabla de usuarios
  const [usersSearch, setUsersSearch] = useState("");
  const [usersPage, setUsersPage] = useState(1);
  const [usersLimit, setUsersLimit] = useState(4);

  // Estados para la tabla de roles
  const [rollenSearch, setRollenSearch] = useState("");
  const [rollenPage, setRollenPage] = useState(1);
  const [rollenLimit, setRollenLimit] = useState(4);

  // Hook para usuarios - solo se ejecuta cuando contenido === "users"
  const { usersData, pagination, isLoading } = useListUsersHook({
    page: usersPage,
    search: usersSearch,
    limit: usersLimit,
    enabled: contenido === "users" 
  });

  // Hook para roles - solo se ejecuta cuando contenido === "rols"
  const { rollenData, paginationRollen, isLoadingRollen } = useListRollenHook({
    page: rollenPage,
    search: rollenSearch,
    limit: rollenLimit,
    enabled: contenido === "rols" 
  });

  // Funciones para usuarios
  const handleUsersPageChange = (newPage: number) => {
    setUsersPage(newPage);
  };

  const handleUsersSearch = (searchText: string) => {
    setUsersSearch(searchText);
    setUsersPage(1);
  };

  // Funciones para roles
  const handleRollenPageChange = (newPage: number) => {
    setRollenPage(newPage);
  };

  const handleRollenSearch = (searchText: string) => {
    setRollenSearch(searchText);
    setRollenPage(1);
  };

  // Función para cambiar de pestaña con reset opcional
  const handleTabChange = (tab: "users" | "rols") => {
    setContenido(tab);
    
    // Opcional: Reset de página cuando cambias de pestaña
    if (tab === "users") {
      setUsersPage(1);
    } else {
      setRollenPage(1);
    }
  };

  return (
    <>
      <LayoutDefault>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl text-primarys-500 font-roboto">Gestión de Usuarios</h1>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6 sm:grid-cols-2">
            {/* cart usuario */}
            <div 
              className={`cursor-pointer p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition-all ease-in-out duration-300 ${
                contenido === "users" 
                  ? "bg-primarys-700 text-accents-400 shadow-xl" 
                  : "bg-gray-100 text-primarys-700 hover:shadow-xl"
              }`} 
              onClick={() => handleTabChange("users")}
            >
              <User className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-roboto">Usuarios</h3>
            </div>
            {/* cart rol */}
            <div 
              className={`cursor-pointer p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition-all ease-in-out duration-300 ${
                contenido === "rols" 
                  ? "bg-primarys-700 text-accents-400 shadow-xl" 
                  : "bg-gray-100 text-primarys-700 hover:shadow-xl"
              }`} 
              onClick={() => handleTabChange("rols")}
            >
              <Building2 className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-roboto">Administrar Negocios</h3>
            </div>
          </div>
          
          {contenido === "users" ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-primarys-700">Lista de Usuarios</h2>
                <div className="flex justify-end">
                  <ModalDinamic 
                    titleModal="Registro de Usuario" 
                    titleButon="Nuevo Usuario" 
                    sizeModal="5xl" 
                    backdrop="opaque" 
                    className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium whitespace-nowrap" 
                    children={(onclose) => <RegisterUserComponent onClose={onclose} />} 
                  />
                </div>
              </div>

              <TableDinamic 
                columns={columnsUsers} 
                data={usersData || []} 
                pagination={pagination} 
                onPageChange={handleUsersPageChange} 
                barraBusqueda={handleUsersSearch} 
                searchPlaceholder="Buscar usuarios..." 
                emptyContent={
                  <div className="py-8 text-center">
                    {isLoading ? <Spinner /> : "No se encontraron usuarios"}
                  </div>
                } 
                isLoading={isLoading} 
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-primarys-700">Lista de Roles</h2>
                <div className="flex justify-end">
                  <ModalDinamic 
                    titleModal="Registro de Rol" 
                    titleButon="Nuevo Rol" 
                    sizeModal="5xl" 
                    backdrop="opaque" 
                    className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium whitespace-nowrap" 
                    children={(onclose) => <RegisterRollenComponent onClose={onclose} />} 
                  />
                </div>
              </div>

              <TableDinamic 
                columns={columnsRollen} 
                data={rollenData || []} 
                pagination={paginationRollen} 
                onPageChange={handleRollenPageChange} 
                barraBusqueda={handleRollenSearch}    
                searchPlaceholder="Buscar rol..." 
                emptyContent={
                  <div className="py-8 text-center">
                    {isLoadingRollen ? <Spinner /> : "No se encontraron roles"}
                  </div>
                } 
                isLoading={isLoadingRollen} 
              />
            </div>
          )}
        </div>
      </LayoutDefault>
    </>
  );
};

export default UsersPage;





import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, EyeOff, Eye, Edit3, UserPlus, User, CreditCard, Mail, Phone, MapPin, Home } from "lucide-react";
import { RegisterUserProps, UsersType } from "@/types/usersTypes/usersTypes";
import { Id, toast } from "react-toastify";
import { useRegisterUserMutation, useRegisterUserStorageMutation, useUpdateUserMutation } from "@/store/slice/usersSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchemaZod } from "@/validations/userValidation/userSchemaZod";
import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";
import { documentTypesOptions, rollenOptionsAdmin } from "@/utils/usersUtils/registerUserUtils";
import SelectSearchAutoCompleteDinamic from "../DYNAMIC_COMPONENTS/SelectSearchAutoCompleteDinamic";
import { useAppSelector } from "@/store/store";
import { selectUserRole } from "@/store/slice/authSlice";
import { useGetBusinessQuery } from "@/store/slice/businessSlice";
import { winerieTypesOptions } from "@/utils/wineriesUtils/registerWineriesUtils";

const RegisterUserComponent = ({ onClose, user }: RegisterUserProps) => {
  const referenciaIdtostat = useRef<Id | null>(null);

  const userRole = useAppSelector(selectUserRole);

  console.log('rol :', userRole)

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isVisibleConfirma, setIsVisibleConfirma] = useState<boolean>(false);

  //slice para registro de usuario sin bodega
  const [registerUser, { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister, error: errorRegister }] = useRegisterUserMutation();

  //slice para registro de usuario con bodega
    const [registerUserStorage, { isLoading: isLoadingRegisterStorage, isSuccess: isSuccessRegisterStorage, isError: isErrorRegisterStorage, error: errorRegisterStorage }] = useRegisterUserStorageMutation();



  const [updateUser, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate }] = useUpdateUserMutation();

  const { data: businessResponse, isLoading: isLoadingBusiness } = useGetBusinessQuery({
    page: 1,
    limit: 10000,
  });

  const [showStorageSection, setShowStorageSection] = useState(false);

  const isLoading = isLoadingRegister || isLoadingRegisterStorage || isLoadingUpdate;
  const isSuccess = isSuccessRegister || isSuccessRegisterStorage || isSuccessUpdate;
  const isError = isErrorRegister || isErrorRegisterStorage || isErrorUpdate;
  const error = errorRegister || errorRegisterStorage || errorUpdate;

  const isEditing = !!user?.id;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UsersType>({
    resolver: zodResolver(UserSchemaZod),
    defaultValues: {
      business: 3,
    },
  });

  // Preparar las opciones de negocio con validación
  const businessOptions =
    businessResponse?.data?.map((items) => ({
      key: `${items.id}`,
      label: items?.name,
    })) || [];

  // Estado para controlar si los datos están listos
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    if (user) {
      // Para edición, excluir los campos de contraseña
      const { password, password_confirmation, ...userWithoutPasswords } = user;
      reset(userWithoutPasswords);
    }
  }, [user, reset]);

  // Verificar que todos los datos necesarios estén cargados
  useEffect(() => {
    const hasBusinessData = !isLoadingBusiness && businessResponse?.data && businessResponse.data.length > 0;
    const hasRoleData = rollenOptionsAdmin && rollenOptionsAdmin.length > 0;
    const hasDocumentData = documentTypesOptions && documentTypesOptions.length > 0;

    if (hasBusinessData && hasRoleData && hasDocumentData) {
      setDataReady(true);
    }
  }, [businessResponse, isLoadingBusiness]);

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
    console.log("data :", data);
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Rol
                  </label>
                  <SelectSearchAutoCompleteDinamic id="rol" data={rollenOptionsAdmin} label="Seleccione el rol" name="Rol" control={control} valueType="number" placeholder="Escribe para buscar..." errors={errors} className="w-full" radius="md" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Negocio
                  </label>
                  <SelectSearchAutoCompleteDinamic id="negocio" data={businessOptions} label="Seleccione el negocio" name="business" control={control} valueType="number" placeholder="Escribe para buscar..." errors={errors} className="w-full" radius="md" />
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
                  <SelectSearchAutoCompleteDinamic id="tipo-documento" data={documentTypesOptions} label="Seleccione tipo de documento" name="typeDocument" control={control} placeholder="Escribe para buscar..." errors={errors} className="w-full" radius="md" />
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

            {/* Datos de Almacenamiento */}
            {(userRole === "admin" || userRole === "super_admin") && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-cuarto" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Datos de bodega</h3>
                        <p className="text-sm text-gray-600">{showStorageSection ? "Información del almacén a registrar" : "Opcional para vincular nueva bodega"}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setShowStorageSection(!showStorageSection)} className="px-4 py-2 text-sm font-medium text-white bg-accents-500 rounded-lg hover:bg-accents-600 transition-colors">
                      {showStorageSection ? "Ocultar" : "Agregar bodega"}
                    </button>
                  </div>

                  {showStorageSection && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Home className="w-4 h-4" />
                          Nombre del Almacén
                        </label>
                        <InputDinamic errors={errors} control={control} id="storageData.nameStorage" type="text" name="storageData.nameStorage" placeholder="Ingrese el nombre del almacén" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Tipo de Almacén
                        </label>
                        <SelectSearchAutoCompleteDinamic id="storageData.TypeStorage" data={winerieTypesOptions} label="Seleccione tipo de almacen" name="storageData.TypeStorage" control={control} placeholder="Escribe para buscar..." errors={errors} className="w-full" radius="md" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Dirección del Almacén
                        </label>
                        <InputDinamic errors={errors} control={control} id="storageData.address" type="text" name="storageData.address" placeholder="Ingrese la dirección del almacén" />
                      </div>
                    </div>
                  )}
                </div>
              )}

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

              <button type="submit" disabled={isLoadingRegister || isLoadingUpdate || !dataReady} className="flex-1 sm:flex-none px-6 py-3 bg-accents-500 text-white rounded-lg hover:bg-accents-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center gap-2">
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