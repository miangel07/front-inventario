// import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
// import { TableDinamic } from "@/components/DYNAMIC_COMPONENTS/TableDinamic";
// import RegisterRollenComponent from "@/components/usersComponents/RegisterRollenComponent";
// import RegisterUserComponent from "@/components/usersComponents/RegisterUserComponent";
// import { useListRollenHook } from "@/hooks/usersHooks/useListRollenHook";
// import { useListUsersHook } from "@/hooks/usersHooks/useListUsersHook";
// import LayoutDefault from "@/layouts/Layoutdefault";
// import { columnsRollen, columnsUsers } from "@/utils/usersUtils/listUsersUtils";
// import { Spinner } from "@heroui/react";
// import { Crown, User } from "lucide-react";
// import { useState } from "react";

// const UsersPage = () => {
//   const [contenido, setContenido] = useState<"users" | "rols">("users");

//   // Estados para la tabla de usuarios
//   const [usersSearch, setUsersSearch] = useState("");
//   const [usersPage, setUsersPage] = useState(1);
//   const [usersLimit, setUsersLimit] = useState(4);

//   // Estados para la tabla de roles
//   const [businessSearch, setbusinessSearch] = useState("");
//   const [rollenBusiness, setRollenBusiness] = useState(1);
//   const [businessLimit, businessLimit] = useState(4);

//   // Hooks con estados separados
//   const { usersData, pagination, isLoading } = useListUsersHook({
//     page: usersPage,
//     search: usersSearch,
//     limit: usersLimit,
//     enabled: contenido === "users"
//   });

//   const { businessData, paginationBusiness, isLoadingBusiness } = useListRollenHook({
//     page: rollenBusiness,
//     search: businessSearch,
//     limit: businessLimit,
//     enabled: contenido === "rols"
//   });

//   // Funciones para usuarios
//   const handleUsersPageChange = (newPage: number) => {
//     setUsersPage(newPage);
//   };

//   const handleUsersSearch = (searchText: string) => {
//     setUsersSearch(searchText);
//     setUsersPage(1);
//   };

//   // Funciones para roles
//   const handleRollenBusinessChange = (newPage: number) => {
//     setRollenBusiness(newPage);
//   };

//   const handlebusinessSearch = (searchText: string) => {
//     setbusinessSearch(searchText);
//     setRollenBusiness(1);
//   };

//   return (
//     <>
//       <LayoutDefault>
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex items-center mb-6">
//             <h1 className="text-2xl text-primarys-500 font-roboto">Gestión de Usuarios</h1>
//           </div>
//           <div className="grid grid-cols-2 gap-6 mb-6 sm:grid-cols-2">
//             {/* cart usuario */}
//             <div className={`cursor-pointer p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition-all ease-in-out duration-300 ${contenido === "users" ? "bg-primarys-700 text-accents-400 shadow-xl" : "bg-gray-100 text-primarys-700 hover:shadow-xl"}`} onClick={() => setContenido("users")}>
//               <User className="w-12 h-12 mb-3" />
//               <h3 className="text-xl font-roboto">Usuarios</h3>
//             </div>
//             {/* cart rol */}
//             <div className={`cursor-pointer p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition-all ease-in-out duration-300 ${contenido === "rols" ? "bg-primarys-700 text-accents-400 shadow-xl" : "bg-gray-100 text-primarys-700 hover:shadow-xl"}`} onClick={() => setContenido("rols")}>
//               <Crown className="w-12 h-12 mb-3" />
//               <h3 className="text-xl font-roboto">Administrar roles</h3>
//             </div>
//           </div>
//           {contenido === "users" ? (
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//                 <h2 className="text-lg sm:text-xl font-semibold text-primarys-700">Lista de Usuarios</h2>
//                 <div className="flex justify-end">
//                   <ModalDinamic
//                   titleModal="Registro de Usuario"
//                   titleButon="Nuevo Usuario"
//                   sizeModal="5xl"
//                   backdrop="opaque"
//                   className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
//                   children={(onclose) => <RegisterUserComponent onClose={onclose} />}
//                   />
//                 </div>
//               </div>

//               <TableDinamic
//               columns={columnsUsers}
//               data={usersData}
//               pagination={pagination}
//               onPageChange={handleUsersPageChange}
//               barraBusqueda={handleUsersSearch}
//               searchPlaceholder="Buscar usuarios..."
//               emptyContent={<div className="py-8 text-center">{isLoading ? <Spinner /> : "No se encontraron usuarios"}</div>}
//               isLoading={isLoading}
//               />
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//                 <h2 className="text-lg sm:text-xl font-semibold text-primarys-700">Lista de Roles</h2>
//                 <div className="flex justify-end">
//                   <ModalDinamic
//                   titleModal="Registro de Rol"
//                   titleButon="Nuevo Rol"
//                   sizeModal="5xl"
//                   backdrop="opaque"
//                   className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
//                   children={(onclose) => <RegisterRollenComponent onClose={onclose} />}
//                   />
//                 </div>
//               </div>

//               <TableDinamic
//               columns={columnsRollen}
//               data={businessData}
//               pagination={paginationBusiness}
//               onPageChange={handleRollenBusinessChange}
//               barraBusqueda={handlebusinessSearch}
//               searchPlaceholder="Buscar rol..."
//               emptyContent={<div className="py-8 text-center">{isLoadingBusiness ? <Spinner /> : "No se encontraron roles"}</div>}
//               isLoading={isLoadingBusiness}
//               />
//             </div>
//           )}
//         </div>
//       </LayoutDefault>
//     </>
//   );
// };

// export default UsersPage;

import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import { TableDinamic } from "@/components/DYNAMIC_COMPONENTS/TableDinamic";
import RegisterRollenComponent from "@/components/usersComponents/RegisterBusinessComponent";
import RegisterUserComponent from "@/components/usersComponents/RegisterUserComponent";
import { useListBusinessHook } from "@/hooks/usersHooks/useListBusinessHook";
import { useListUsersHook } from "@/hooks/usersHooks/useListUsersHook";
import LayoutDefault from "@/layouts/Layoutdefault";
import { selectUserRole } from "@/store/slice/authSlice";
import { useAppSelector } from "@/store/store";
import { columnsBusiness, columnsUsers } from "@/utils/usersUtils/listUsersUtils";
import { Spinner } from "@heroui/react";
import { Building2, User } from "lucide-react";
import { useState } from "react";

const UsersPage = () => {
  const userRole = useAppSelector(selectUserRole);
  const isSuperAdmin = userRole === "super_admin";

  // Forzar el contenido a "users" si no es super_admin
  const [contenido, setContenido] = useState<"users" | "business">(isSuperAdmin ? "users" : "users");

  // Estados para la tabla de usuarios
  const [usersSearch, setUsersSearch] = useState("");
  const [usersPage, setUsersPage] = useState(1);
  const [usersLimit, setUsersLimit] = useState(4);

  // Estados para la tabla de roles
  const [businessSearch, setbusinessSearch] = useState("");
  const [rollenBusiness, setRollenBusiness] = useState(1);
  const [businessLimit, setBusinessLimit] = useState(4);

  // Hook para usuarios - solo se ejecuta cuando contenido === "users"
  const { usersData, pagination, isLoading } = useListUsersHook({
    page: usersPage,
    search: usersSearch,
    limit: usersLimit,
    enabled: contenido === "users",
  });

  // Hook para roles - solo se ejecuta cuando contenido === "business"
  const { businessData, paginationBusiness, isLoadingBusiness } = useListBusinessHook({
    page: rollenBusiness,
    search: businessSearch,
    limit: businessLimit,
    enabled: contenido === "business" && isSuperAdmin, // Solo habilitar si es super_admin
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
  const handleRollenBusinessChange = (newPage: number) => {
    setRollenBusiness(newPage);
  };

  const handlebusinessSearch = (searchText: string) => {
    setbusinessSearch(searchText);
    setRollenBusiness(1);
  };

  // Función para cambiar de pestaña (solo permitido para super_admin)
  const handleTabChange = (tab: "users" | "business") => {
    if (!isSuperAdmin && tab === "business") return;
    setContenido(tab);

    // Opcional: Reset de página cuando cambias de pestaña
    if (tab === "users") {
      setUsersPage(1);
    } else {
      setRollenBusiness(1);
    }
  };

  return (
    <>
      <LayoutDefault>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl text-primarys-500 font-roboto">Gestión de Usuarios</h1>
          </div>

          {/* Mostrar cards solo si es super_admin */}
          {isSuperAdmin && (
            <div className="grid grid-cols-2 gap-6 mb-6 sm:grid-cols-2">
              {/* cart usuario */}
              <div className={`cursor-pointer p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition-all ease-in-out duration-300 ${contenido === "users" ? "bg-primarys-700 text-accents-400 shadow-xl" : "bg-gray-100 text-primarys-700 hover:shadow-xl"}`} onClick={() => handleTabChange("users")}>
                <User className="w-12 h-12 mb-3" />
                <h3 className="text-xl font-roboto">Usuarios</h3>
              </div>
              {/* cart rol */}
              <div className={`cursor-pointer p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition-all ease-in-out duration-300 ${contenido === "business" ? "bg-primarys-700 text-accents-400 shadow-xl" : "bg-gray-100 text-primarys-700 hover:shadow-xl"}`} onClick={() => handleTabChange("business")}>
                <Building2 className="w-12 h-12 mb-3" />
                <h3 className="text-xl font-roboto">Administrar Negocios</h3>
              </div>
            </div>
          )}

          {/* Contenido principal */}
          {contenido === "users" ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-primarys-700">Lista de Usuarios</h2>
                <div className="flex justify-end">
                  <ModalDinamic titleModal="Registro de Usuario" titleButon="Nuevo Usuario" sizeModal="5xl" backdrop="opaque" className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium whitespace-nowrap" children={(onclose) => <RegisterUserComponent onClose={onclose} />} />
                </div>
              </div>

              <TableDinamic columns={columnsUsers} data={usersData || []} pagination={pagination} onPageChange={handleUsersPageChange} barraBusqueda={handleUsersSearch} searchPlaceholder="Buscar usuarios..." emptyContent={<div className="py-8 text-center">{isLoading ? <Spinner /> : "No se encontraron usuarios"}</div>} isLoading={isLoading} />
            </div>
          ) : (
            isSuperAdmin && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-primarys-700">Lista de Negocios</h2>
                  <div className="flex justify-end">
                    <ModalDinamic 
                    titleModal="Registro de Negocio" 
                    titleButon="Nuevo Negocio" 
                    sizeModal="5xl" 
                    backdrop="opaque" 
                    className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium whitespace-nowrap" children={(onclose) => <RegisterRollenComponent onClose={onclose} />} />
                  </div>
                </div>

                <TableDinamic 
                columns={columnsBusiness} 
                data={businessData || []} 
                pagination={paginationBusiness} 
                onPageChange={handleRollenBusinessChange} 
                barraBusqueda={handlebusinessSearch} 
                searchPlaceholder="Buscar negocio..." 
                emptyContent={<div className="py-8 text-center">{isLoadingBusiness ? <Spinner /> : "No se encontraron negocios"}</div>} 
                isLoading={isLoadingBusiness} />
              </div>
            )
          )}
        </div>
      </LayoutDefault>
    </>
  );
};

export default UsersPage;
