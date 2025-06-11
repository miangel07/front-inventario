import { useGetUsersQuery, useUpdateUsersStateMutation } from "@/store/slice/usersSlice";
import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Edit, Eye, MoreVertical } from "lucide-react";


type Props = {};

export const useListUsersHook = (props: Props) => {
  const toastRefListar = useRef<Id | null>(null);

  const referenciaIdtostat = useRef<Id | null>(null);

  const { data, isLoading, isError, error } = useGetUsersQuery({});

  const pagination = data;

  const [updateUserStatus, { data: dataUpdateUserStatus, isSuccess: isSuccessUpdateUserStatus, isError: isErrorUpdateUserStatus, error: errorUpdateUserStatus }] = useUpdateUsersStateMutation();

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
                  try {
                    await updateUserStatus({ id, status: newStatus }).unwrap();
                    toast.success("Estado actualizado correctamente", {
                      position: "top-center",
                    });
                  } catch (error) {
                    console.error("Error:", error);
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


  //   try {
  //     if (id === 0) {
  //       return toast.error("Usuario no seleccionado");
  //     }

  //     const confirmId = toast(
  //       () => (
  //         <div>
  //           <p>
  //             ¿Está seguro de cambiar el estado del usuario <strong>{username}</strong>?
  //           </p>
  //           <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
  //             <button
  //               onClick={async () => {
  //                 toast.dismiss(confirmId);
  //                 referenciaIdtostat.current = toast.loading("Actualizando estado...");
  //                 try {
  //                   const currentUser = data?.data?.find(u => u.id === id);
  //                   const newStatus = currentUser?.Status === 'active' ? 'inactive' : 'active';
  //                   await updateUserStatus({ id, status: newStatus }).unwrap();
  //                 } catch {
  //                   toast.error("No se pudo actualizar el estado", { position: "top-center" });
  //                 }
  //               }}
  //               style={{ background: "green", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}
  //             >
  //               Sí
  //             </button>
  //             <button
  //               onClick={() => toast.dismiss(confirmId)}
  //               style={{ background: "gray", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}
  //             >
  //               No
  //             </button>
  //           </div>
  //         </div>
  //       ),
  //       { autoClose: false, position: "top-center" }
  //     );
  //   } catch (error) {
  //     console.error("Error al intentar mostrar la confirmación:", error);
  //     toast.error("Ocurrió un error al mostrar la confirmación", { position: "top-center" });
  //   }
  // };

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

  const usersData =
    data?.data?.map((user) => ({
      active: <Checkbox radius="full" size="lg" isSelected={user.Status === "active"} onChange={() => UserStatus(user.id as number, user.username, user.Status as string)} />,

      username: user.username,
      lastname: user.lastname,
      phone: user.phone,
      Status: user.Status,
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
            onPress={() => handleViewDetails(user.id)}
          >
            Detalles
          </DropdownItem>
          <DropdownItem
            key="edit"
            startContent={<Edit className="h-4 w-4" />}
            onPress={() => handleEditUser(user.id)}
          >
            Editar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    ),

      // identificationNumber: user.identificationNumber,
      // address: user.address,
      // typeDocument: user.typeDocument,
    })) || [];

    // Funciones para manejar las acciones
const handleViewDetails = (userId) => {
  console.log("Ver detalles del usuario:", userId);
  // Aquí puedes agregar la lógica para mostrar los detalles
  // Por ejemplo: navegar a una página de detalles o abrir un modal
};

const handleEditUser = (userId) => {
  console.log("Editar usuario:", userId);
  // Aquí puedes agregar la lógica para editar el usuario
  // Por ejemplo: navegar a un formulario de edición o abrir un modal
};

  return {
    usersData,
    pagination,
    isLoading,
    isError,
    error,
  };
};
