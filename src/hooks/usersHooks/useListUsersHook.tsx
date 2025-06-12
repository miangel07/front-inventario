// import { useGetUsersQuery, useUpdateUsersStateMutation } from "@/store/slice/usersSlice";
// import { useEffect, useRef } from "react";
// import { Id, toast } from "react-toastify";
// import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
// import { Edit, Eye, MoreVertical } from "lucide-react";


// type Props = {};

// export const useListUsersHook = (props: Props) => {
//   const toastRefListar = useRef<Id | null>(null);

//   const referenciaIdtostat = useRef<Id | null>(null);

//   const { data, isLoading, isError, error } = useGetUsersQuery({});

//   const pagination = data;

//   const [updateUserStatus, { data: dataUpdateUserStatus, isSuccess: isSuccessUpdateUserStatus, isError: isErrorUpdateUserStatus, error: errorUpdateUserStatus }] = useUpdateUsersStateMutation();

//   const UserStatus = (id: number, username: string, currentStatus: string) => {
//     try {
//       if (id === 0) {
//         return toast.error("Usuario no seleccionado");
//       }

//       // Determinar el nuevo estado (toggle)
//       const newStatus = currentStatus === "active" ? "inactive" : "active";

//       const confirmId = toast(
//         () => (
//           <div>
//             <p>
//               ¿Está seguro de cambiar el estado del usuario <strong>{username}</strong>?
//             </p>
//             <div
//               style={{
//                 marginTop: "10px",
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 gap: "10px",
//               }}
//             >
//               <button
//                 onClick={async () => {
//                   toast.dismiss(confirmId);
//                   try {
//                     await updateUserStatus({ id, status: newStatus }).unwrap();
//                     toast.success("Estado actualizado correctamente", {
//                       position: "top-center",
//                     });
//                   } catch (error) {
//                     console.error("Error:", error);
//                     toast.error("No se pudo actualizar el estado", {
//                       position: "top-center",
//                     });
//                   }
//                 }}
//                 style={{
//                   background: "green",
//                   color: "white",
//                   border: "none",
//                   padding: "5px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 Sí
//               </button>
//               <button
//                 onClick={() => toast.dismiss(confirmId)}
//                 style={{
//                   background: "gray",
//                   color: "white",
//                   border: "none",
//                   padding: "5px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         ),
//         {
//           autoClose: false,
//           position: "top-center",
//         }
//       );
//     } catch (error) {
//       console.error("Error al intentar mostrar la confirmación:", error);
//       toast.error("Ocurrió un error al mostrar la confirmación", {
//         position: "top-center",
//       });
//     }
//   };


//   //   try {
//   //     if (id === 0) {
//   //       return toast.error("Usuario no seleccionado");
//   //     }

//   //     const confirmId = toast(
//   //       () => (
//   //         <div>
//   //           <p>
//   //             ¿Está seguro de cambiar el estado del usuario <strong>{username}</strong>?
//   //           </p>
//   //           <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//   //             <button
//   //               onClick={async () => {
//   //                 toast.dismiss(confirmId);
//   //                 referenciaIdtostat.current = toast.loading("Actualizando estado...");
//   //                 try {
//   //                   const currentUser = data?.data?.find(u => u.id === id);
//   //                   const newStatus = currentUser?.Status === 'active' ? 'inactive' : 'active';
//   //                   await updateUserStatus({ id, status: newStatus }).unwrap();
//   //                 } catch {
//   //                   toast.error("No se pudo actualizar el estado", { position: "top-center" });
//   //                 }
//   //               }}
//   //               style={{ background: "green", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}
//   //             >
//   //               Sí
//   //             </button>
//   //             <button
//   //               onClick={() => toast.dismiss(confirmId)}
//   //               style={{ background: "gray", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}
//   //             >
//   //               No
//   //             </button>
//   //           </div>
//   //         </div>
//   //       ),
//   //       { autoClose: false, position: "top-center" }
//   //     );
//   //   } catch (error) {
//   //     console.error("Error al intentar mostrar la confirmación:", error);
//   //     toast.error("Ocurrió un error al mostrar la confirmación", { position: "top-center" });
//   //   }
//   // };

//   useEffect(() => {
//     if (isLoading && !toastRefListar.current) {
//       toastRefListar.current = toast.loading("Cargando usuarios...");
//     }

//     if (!isLoading && toastRefListar.current) {
//       toast.dismiss(toastRefListar.current);
//       toastRefListar.current = null;
//     }

//     if (isError) {
//       toast.error("Error al cargar los usuarios");
//     }
//   }, [isLoading, isError]);

//   useEffect(() => {
//     if (isSuccessUpdateUserStatus) {
//       toast.dismiss(referenciaIdtostat.current!);
//       toast.success(`${dataUpdateUserStatus}`);
//     }

//     if (isErrorUpdateUserStatus && Array.isArray(errorUpdateUserStatus)) {
//       toast.dismiss(referenciaIdtostat.current!);
//       errorUpdateUserStatus.map((e) => toast.error(`${e.message}`));
//     }
//   }, [isSuccessUpdateUserStatus, isErrorUpdateUserStatus, errorUpdateUserStatus]);

//   const usersData =
//     data?.data?.map((user) => ({
//       active: <Checkbox radius="full" size="lg" isSelected={user.Status === "active"} onChange={() => UserStatus(user.id as number, user.username, user.Status as string)} />,

//       username: user.username,
//       lastname: user.lastname,
//       phone: user.phone,
//       Status: user.Status,
//       email: user.email,
//           actions: (
//       <Dropdown>
//         <DropdownTrigger>
//           <Button
//             isIconOnly
//             size="sm"
//             variant="light"
//             className="text-default-400"
//           >
//             <MoreVertical className="h-4 w-4" />
//           </Button>
//         </DropdownTrigger>
//         <DropdownMenu aria-label="Acciones del usuario">
//           <DropdownItem
//             key="details"
//             startContent={<Eye className="h-4 w-4" />}
//             // onPress={() => handleViewDetails(user.id)}
//           >
//             Detalles
//           </DropdownItem>
//           <DropdownItem
//             key="edit"
//             startContent={<Edit className="h-4 w-4" />}
//             // onPress={() => handleEditUser(user.id)}
//           >
//             Editar
//           </DropdownItem>
//         </DropdownMenu>
//       </Dropdown>
//     ),

//       // identificationNumber: user.identificationNumber,
//       // address: user.address,
//       // typeDocument: user.typeDocument,
//     })) || [];

//     // Funciones para manejar las acciones
// // const handleViewDetails = (userId ) => {
// //   console.log("Ver detalles del usuario:", userId);
// //   // Aquí puedes agregar la lógica para mostrar los detalles
// //   // Por ejemplo: navegar a una página de detalles o abrir un modal
// // };

// // const handleEditUser = (userId) => {
// //   console.log("Editar usuario:", userId);
// //   // Aquí puedes agregar la lógica para editar el usuario
// //   // Por ejemplo: navegar a un formulario de edición o abrir un modal
// // };

//   return {
//     usersData,
//     pagination,
//     isLoading,
//     isError,
//     error,
//   };
// };


// import { useGetUsersQuery, useUpdateUsersStateMutation } from "@/store/slice/usersSlice";
// import { useEffect, useRef, useState } from "react";
// import { Id, toast } from "react-toastify";
// import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
// import { Edit, Eye, MoreVertical } from "lucide-react";
// import { GetUsersParams } from "@/types/usersTypes/usersTypes";


// type Props = {};

// export const useListUsersHook = (props: Props) => {
//   const toastRefListar = useRef<Id | null>(null);
//   const referenciaIdtostat = useRef<Id | null>(null);

//   // Estados para manejar la paginación y búsqueda
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [pageSize, setPageSize] = useState<number>(10);

//   // Parámetros de consulta que se envían a la API
//   const queryParams: GetUsersParams = {
//     page: currentPage,
//     limit: pageSize,
//     ...(searchTerm && { search: searchTerm }),
//   };

//   // Query con parámetros dinámicos
//   const { data, isLoading, isError, error, refetch } = useGetUsersQuery(queryParams);

//   const [updateUserStatus, { 
//     data: dataUpdateUserStatus, 
//     isSuccess: isSuccessUpdateUserStatus, 
//     isError: isErrorUpdateUserStatus, 
//     error: errorUpdateUserStatus 
//   }] = useUpdateUsersStateMutation();

//   const UserStatus = (id: number, username: string, currentStatus: string) => {
//     try {
//       if (id === 0) {
//         return toast.error("Usuario no seleccionado");
//       }

//       // Determinar el nuevo estado (toggle)
//       const newStatus = currentStatus === "active" ? "inactive" : "active";

//       const confirmId = toast(
//         () => (
//           <div>
//             <p>
//               ¿Está seguro de cambiar el estado del usuario <strong>{username}</strong>?
//             </p>
//             <div
//               style={{
//                 marginTop: "10px",
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 gap: "10px",
//               }}
//             >
//               <button
//                 onClick={async () => {
//                   toast.dismiss(confirmId);
//                   referenciaIdtostat.current = toast.loading("Actualizando estado...");
//                   try {
//                     await updateUserStatus({ id, status: newStatus }).unwrap();
//                   } catch (error) {
//                     console.error("Error:", error);
//                     toast.dismiss(referenciaIdtostat.current!);
//                     toast.error("No se pudo actualizar el estado", {
//                       position: "top-center",
//                     });
//                   }
//                 }}
//                 style={{
//                   background: "green",
//                   color: "white",
//                   border: "none",
//                   padding: "5px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 Sí
//               </button>
//               <button
//                 onClick={() => toast.dismiss(confirmId)}
//                 style={{
//                   background: "gray",
//                   color: "white",
//                   border: "none",
//                   padding: "5px 10px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         ),
//         {
//           autoClose: false,
//           position: "top-center",
//         }
//       );
//     } catch (error) {
//       console.error("Error al intentar mostrar la confirmación:", error);
//       toast.error("Ocurrió un error al mostrar la confirmación", {
//         position: "top-center",
//       });
//     }
//   };

//   // Funciones para manejar cambios de página y búsqueda
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleSearch = (searchText: string) => {
//     setSearchTerm(searchText);
//     setCurrentPage(1); // Resetear a la primera página cuando se busca
//   };

//   const handlePageSizeChange = (newPageSize: number) => {
//     setPageSize(newPageSize);
//     setCurrentPage(1); // Resetear a la primera página cuando cambia el tamaño
//   };

//   // Funciones para manejar las acciones de los usuarios
//   const handleViewDetails = (userId: number) => {
//     console.log("Ver detalles del usuario:", userId);
//     // Aquí puedes agregar la lógica para mostrar los detalles
//     // Por ejemplo: navegar a una página de detalles o abrir un modal
//   };

//   const handleEditUser = (userId: number) => {
//     console.log("Editar usuario:", userId);
//     // Aquí puedes agregar la lógica para editar el usuario
//     // Por ejemplo: navegar a un formulario de edición o abrir un modal
//   };

//   // Effect para manejar el loading toast
//   useEffect(() => {
//     if (isLoading && !toastRefListar.current) {
//       toastRefListar.current = toast.loading("Cargando usuarios...");
//     }

//     if (!isLoading && toastRefListar.current) {
//       toast.dismiss(toastRefListar.current);
//       toastRefListar.current = null;
//     }

//     if (isError) {
//       if (toastRefListar.current) {
//         toast.dismiss(toastRefListar.current);
//         toastRefListar.current = null;
//       }
//       toast.error("Error al cargar los usuarios");
//     }
//   }, [isLoading, isError]);

//   // Effect para manejar las respuestas de actualización de estado
//   useEffect(() => {
//     if (isSuccessUpdateUserStatus) {
//       if (referenciaIdtostat.current) {
//         toast.dismiss(referenciaIdtostat.current);
//         referenciaIdtostat.current = null;
//       }
//       toast.success(dataUpdateUserStatus || "Estado actualizado correctamente", {
//         position: "top-center",
//       });
//     }

//     if (isErrorUpdateUserStatus) {
//       if (referenciaIdtostat.current) {
//         toast.dismiss(referenciaIdtostat.current);
//         referenciaIdtostat.current = null;
//       }
      
//       // Manejar errores de diferentes tipos
//       if (Array.isArray(errorUpdateUserStatus)) {
//         errorUpdateUserStatus.forEach((e: any) => toast.error(`${e.message}`));
//       } else if (errorUpdateUserStatus && typeof errorUpdateUserStatus === 'object' && 'data' in errorUpdateUserStatus) {
//         const error = errorUpdateUserStatus as any;
//         toast.error(error.data?.message || "Error al actualizar el estado");
//       } else {
//         toast.error("Error al actualizar el estado");
//       }
//     }
//   }, [isSuccessUpdateUserStatus, isErrorUpdateUserStatus, errorUpdateUserStatus, dataUpdateUserStatus]);

//   // Mapear los datos de usuarios para la tabla
//   const usersData = data?.data?.map((user) => ({
//     id: user.id,
//     active: (
//       <Checkbox 
//         radius="full" 
//         size="lg" 
//         isSelected={user.Status === "active"} 
//         onChange={() => UserStatus(user.id as number, user.username, user.Status as string)} 
//       />
//     ),
//     username: user.username,
//     lastname: user.lastname,
//     phone: user.phone,
//     Status: (
//       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//         user.Status === 'active' 
//           ? 'bg-green-100 text-green-800' 
//           : 'bg-red-100 text-red-800'
//       }`}>
//         {user.Status === 'active' ? 'Activo' : 'Inactivo'}
//       </span>
//     ),
//     email: user.email,
//     actions: (
//       <Dropdown>
//         <DropdownTrigger>
//           <Button
//             isIconOnly
//             size="sm"
//             variant="light"
//             className="text-default-400"
//           >
//             <MoreVertical className="h-4 w-4" />
//           </Button>
//         </DropdownTrigger>
//         <DropdownMenu aria-label="Acciones del usuario">
//           <DropdownItem
//             key="details"
//             startContent={<Eye className="h-4 w-4" />}
//             onPress={() => handleViewDetails(user.id as number)}
//           >
//             Detalles
//           </DropdownItem>
//           <DropdownItem
//             key="edit"
//             startContent={<Edit className="h-4 w-4" />}
//             onPress={() => handleEditUser(user.id as number)}
//           >
//             Editar
//           </DropdownItem>
//         </DropdownMenu>
//       </Dropdown>
//     ),
//   })) || [];

//   return {
//     // Datos para la tabla
//     usersData,
//     pagination: data?.meta, // Metadata de paginación de Nest.js
//     isLoading,
//     isError,
//     error,
    
//     // Funciones para manejar la paginación y búsqueda
//     handlePageChange,
//     handleSearch,
//     handlePageSizeChange,
    
//     // Estados actuales
//     currentPage,
//     searchTerm,
//     pageSize,
    
//     // Funciones adicionales
//     refetch,
//     handleViewDetails,
//     handleEditUser,
    
//     // Datos de respuesta completos
//     totalUsers: data?.meta?.total || 0,
//     hasData: data?.data && data.data.length > 0,
//   };
// };



import { useGetUsersQuery, useUpdateUsersStateMutation } from "@/store/slice/usersSlice";
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Edit, Eye, MoreVertical } from "lucide-react";
import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";

export const useListUsersHook = ({ page = 1, search = "", limit = 10 }: { page?: number; search?: string; limit?: number }) => {
  const toastRefListar = useRef<Id | null>(null);

  const referenciaIdtostat = useRef<Id | null>(null);

  const { data, isLoading, isError, error } = useGetUsersQuery({
    page,
    search,
    limit
  });

    const [updateUserStatus, { data: dataUpdateUserStatus, isSuccess: isSuccessUpdateUserStatus, isError: isErrorUpdateUserStatus, error: errorUpdateUserStatus }] = useUpdateUsersStateMutation();

  const pagination = data?.meta; // Nest.js usa "meta" en lugar de "pagination"

  useEffect(() => {
    if (isLoading && !toastRefListar.current) {
      toastRefListar.current = toast.loading("Cargando usuarios...");
    }

    if (!isLoading && toastRefListar.current) {
      toast.dismiss(toastRefListar.current);
      toastRefListar.current = null;
    }

    if (isError) {
      toast.error("Error al cargar los usuarios");
    }
  }, [isLoading, isError]);

    useEffect(() => {
    if (isSuccessUpdateUserStatus) {
      toast.dismiss(referenciaIdtostat.current!);
      toast.success(`${dataUpdateUserStatus}`);
    }

    if (isErrorUpdateUserStatus && Array.isArray(errorUpdateUserStatus)) {
      toast.dismiss(referenciaIdtostat.current!);
      errorUpdateUserStatus.map((e) => toast.error(`${e.message}`));
    }
  }, [isSuccessUpdateUserStatus, isErrorUpdateUserStatus, errorUpdateUserStatus]);




  // const handlePageChange = (newPage: number) => {
  //   // Esta función será llamada por la tabla cuando cambie la página
  //   // Normalmente manejado por el componente padre
  // };

  // const handleSearch = (searchText: string) => {
  //   // Esta función será llamada por la tabla cuando se busque
  //   // Normalmente manejado por el componente padre
  // };

    const UserStatus = (id: number, username: string, currentStatus: string) => {
    try {
      if (id === 0) {
        return toast.error("Usuario no seleccionado");
      }

      // Determinar el nuevo estado (toggle)
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const confirmId = toast(
        () => (
          <div>
            <p>
              ¿Está seguro de cambiar el estado del usuario <strong>{username}</strong>?
            </p>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={async () => {
                  toast.dismiss(confirmId);
                  referenciaIdtostat.current = toast.loading("Actualizando estado...");
                  try {
                    await updateUserStatus({ id, status: newStatus }).unwrap();
                  } catch (error) {
                    console.error("Error:", error);
                    toast.dismiss(referenciaIdtostat.current!);
                    toast.error("No se pudo actualizar el estado", {
                      position: "top-center",
                    });
                  }
                }}
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                Sí
              </button>
              <button
                onClick={() => toast.dismiss(confirmId)}
                style={{
                  background: "gray",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                No
              </button>
            </div>
          </div>
        ),
        {
          autoClose: false,
          position: "top-center",
        }
      );
    } catch (error) {
      console.error("Error al intentar mostrar la confirmación:", error);
      toast.error("Ocurrió un error al mostrar la confirmación", {
        position: "top-center",
      });
    }
  };

  
  const usersData = data?.data?.map((user) => ({
    id: user.id,
    active: (
      <Checkbox 
        radius="full" 
        size="lg" 
        isSelected={user.Status === "active"} 
        onChange={() => UserStatus(user.id as number, user.username, user.Status as string)} 
      />
    ),
    username: user.username,
    lastname: user.lastname,
    phone: user.phone,
    Status: (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        user.Status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {user.Status === 'active' ? 'Activo' : 'Inactivo'}
      </span>
    ),
    email: user.email,
    actions: (
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-default-400"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Acciones del usuario">
          <DropdownItem
            key="details"
            startContent={<Eye className="h-4 w-4" />}
            // onPress={() => handleViewDetails(user.id as number)}
          >
            Detalles
          </DropdownItem>
          <DropdownItem
            key="edit"
            startContent={<Edit className="h-4 w-4" />}
            // onPress={() => handleEditUser(user.id as number)}
          >
            Editar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ),
  })) || [];

  return {
    usersData,
    pagination,
    isLoading,
    isError,
    error,
    // handlePageChange,
    // handleSearch
  };
};