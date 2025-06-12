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
  };
};