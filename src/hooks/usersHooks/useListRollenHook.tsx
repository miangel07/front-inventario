import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import RegisterRollenComponent from "@/components/usersComponents/RegisterRollenComponent";
import { useGetRollenQuery } from "@/store/slice/usersSlice";
import { Checkbox } from "@heroui/react";
import { Edit } from "lucide-react";
import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";



export const useListRollenHook = ({ page = 1, search = "", limit = 10, enabled = true }: { page?: number; search?: string; limit?: number; enabled:boolean }) => {

  const toastRefListar = useRef<Id | null>(null);

//   const referenciaIdtostat = useRef<Id | null>(null);

  const { data, isLoading:isLoadingRollen, isError:isErrorRollen, error:errorRollen } = useGetRollenQuery({
    page,
    search,
    limit,
  },{ skip: !enabled });

  const paginationRollen = data?.meta;

    useEffect(() => {
      if (isLoadingRollen && !toastRefListar.current) {
        toastRefListar.current = toast.loading("Cargando roles...");
      }
  
      if (!isLoadingRollen && toastRefListar.current) {
        toast.dismiss(toastRefListar.current);
        toastRefListar.current = null;
      }
  
      if (isErrorRollen) {
        toast.error("Error al cargar los roles");
      }
    }, [isLoadingRollen, isErrorRollen]);


    const roleNameMapping = {
  admin: 'Administrador',
  storage_admin: 'Administrador de bodega',
  super_admin: 'Administrador superior'
};





  const rollenData = data?.data?.map((rolle) => ({
    id: rolle.id,
    active: (
      <Checkbox
        radius="full"
        size="lg"
        color="secondary"
        isSelected={rolle.Status === "active"}
        // onChange={() => UserStatus(rolle.id as number, rolle.nameRole, user.Status as string)}
      />
    ),
    nameRole: roleNameMapping[rolle.nameRol as keyof typeof roleNameMapping] || rolle.nameRol,
    Status: (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rolle.Status === "active" ? "bg-accents-100 text-accents-800" : "bg-dangers-100 text-dangers-800"}`}>
        {rolle.Status === "active" ? "Activo" : "Inactivo"}
        </span>
        ),
        // actions:(
        //     <>
        //           <ModalDinamic 
        //             titleButon={<Edit size={15} className="cursor-pointer" />}
        //             sizeModal="4xl" 
        //             titleModal="Actualizar Rol" 
        //             dataToEdit={rolle}
        //             children={(onClose) => <RegisterRollenComponent onClose={onClose} rolle={rolle} />}
        //             className="bg-white font-roboto"
        //           /> 
        //     </>
        // )
  }))|| [];

  return {
    rollenData,
    paginationRollen,
    isLoadingRollen,
    isErrorRollen,
    errorRollen
  }
};


