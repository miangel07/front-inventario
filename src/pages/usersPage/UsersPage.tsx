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
//   const [rollenSearch, setRollenSearch] = useState("");
//   const [rollenPage, setRollenPage] = useState(1);
//   const [rollenLimit, setRollenLimit] = useState(4);

//   // Hooks con estados separados
//   const { usersData, pagination, isLoading } = useListUsersHook({
//     page: usersPage,
//     search: usersSearch,
//     limit: usersLimit,
//     enabled: contenido === "users"
//   });

//   const { rollenData, paginationRollen, isLoadingRollen } = useListRollenHook({
//     page: rollenPage,
//     search: rollenSearch,
//     limit: rollenLimit,
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
//   const handleRollenPageChange = (newPage: number) => {
//     setRollenPage(newPage);
//   };

//   const handleRollenSearch = (searchText: string) => {
//     setRollenSearch(searchText);
//     setRollenPage(1); 
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
//               data={rollenData} 
//               pagination={paginationRollen} 
//               onPageChange={handleRollenPageChange} 
//               barraBusqueda={handleRollenSearch}    
//               searchPlaceholder="Buscar rol..." 
//               emptyContent={<div className="py-8 text-center">{isLoadingRollen ? <Spinner /> : "No se encontraron roles"}</div>} 
//               isLoading={isLoadingRollen} 
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
import RegisterRollenComponent from "@/components/usersComponents/RegisterRollenComponent";
import RegisterUserComponent from "@/components/usersComponents/RegisterUserComponent";
import { useListRollenHook } from "@/hooks/usersHooks/useListRollenHook";
import { useListUsersHook } from "@/hooks/usersHooks/useListUsersHook";
import LayoutDefault from "@/layouts/Layoutdefault";
import { columnsRollen, columnsUsers } from "@/utils/usersUtils/listUsersUtils";
import { Spinner } from "@heroui/react";
import { Crown, User } from "lucide-react";
import { useState } from "react";

const UsersPage = () => {
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
    enabled: contenido === "users" // Parámetro para habilitar/deshabilitar el hook
  });

  // Hook para roles - solo se ejecuta cuando contenido === "rols"
  const { rollenData, paginationRollen, isLoadingRollen } = useListRollenHook({
    page: rollenPage,
    search: rollenSearch,
    limit: rollenLimit,
    enabled: contenido === "rols" // Parámetro para habilitar/deshabilitar el hook
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
              <Crown className="w-12 h-12 mb-3" />
              <h3 className="text-xl font-roboto">Administrar roles</h3>
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