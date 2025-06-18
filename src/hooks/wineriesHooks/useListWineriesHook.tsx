import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import DetailsWineriesComponent from "@/components/wineriesComponents/DetailsWineriesComponent";
import RegisterWineriesComponent from "@/components/wineriesComponents/RegisterWineriesComponent";
import { useGetWineriesQuery } from "@/store/slice/wineriesSlice";
import { Checkbox } from "@heroui/react";
import { Edit, Eye } from "lucide-react";
import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";


export const useListWineriesHook = ({ page = 1, search = "", limit = 10 }: { page?: number; search?: string; limit?: number }) => {

      const toastRefListar = useRef<Id | null>(null);
    
      // const referenciaIdtostat = useRef<Id | null>(null);

        const { data, isLoading, isError, error } = useGetWineriesQuery({
          page,
          search,
          limit
        });

        // const [updateUserStatus, { data: dataUpdateUserStatus, isSuccess: isSuccessUpdateUserStatus, isError: isErrorUpdateUserStatus, error: errorUpdateUserStatus }] = useUpdateWineriesStateMutation();

  const pagination = data?.meta; 

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


      const wineriesData = data?.cleanData?.map((winerie) => ({
        id: winerie.id,
        active: (
          <Checkbox 
            radius="full" 
            size="lg" 
            color="secondary" 
            isSelected={winerie.Status === "active"} 
            // onChange={() => UserStatus(winerie.id as number, winerie.username, winerie.Status as string)}
    
          />
        ),
        nameStorage: winerie.nameStorage,
        address: winerie.address,
        TypeStorage: winerie.TypeStorage,
        Status: (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            winerie.Status === 'active' 
              ? 'bg-accents-100 text-accents-800' 
              : 'bg-dangers-100 text-dangers-800'
          }`}>
            {winerie.Status === 'active' ? 'Activo' : 'Inactivo'}
          </span>
        ),
     actions: (
      <>
    
          <ModalDinamic 
            titleButon={<Eye size={15} className="cursor-pointer" />}
            sizeModal="5xl" 
            titleModal="Detalles de usuario" 
            dataToEdit={winerie}
            children={() => (<DetailsWineriesComponent  winerie={winerie}/>)}
            className="bg-white font-roboto"
          /> 
    
          <ModalDinamic 
            titleButon={<Edit size={15} className="cursor-pointer" />}
            sizeModal="4xl" 
            titleModal="Actualizar usuario" 
            dataToEdit={winerie}
            children={(onClose) => <RegisterWineriesComponent onClose={onClose} winerie={winerie} />}
            className="bg-white font-roboto"
          /> 
      </>
    ),
      })) || [];



  return {
    wineriesData,
    pagination,
    isLoading,
    isError,
    error
  }
}

