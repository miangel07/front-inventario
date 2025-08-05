import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import RegisterBusinessComponent from "@/components/usersComponents/RegisterBusinessComponent";
import { useGetBusinessQuery } from "@/store/slice/businessSlice";
import { Checkbox } from "@heroui/react";
import { Edit } from "lucide-react";
import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";

export const useListBusinessHook = ({ page = 1, search = "", limit = 10, enabled = true }: { page?: number; search?: string; limit?: number; enabled: boolean }) => {

  const toastRefListar = useRef<Id | null>(null);

  //   const referenciaIdtostat = useRef<Id | null>(null);

  const {
    data,
    isLoading: isLoadingBusiness,
    isError: isErrorBusiness,
    error: errorBusiness,
  } = useGetBusinessQuery(
    {
      page,
      search,
      limit,
    },
    { skip: !enabled }
  );

  
  const paginationBusiness = data?.meta;

  

  useEffect(() => {
    if (isLoadingBusiness && !toastRefListar.current) {
      toastRefListar.current = toast.loading("Cargando negocios...");
    }

    if (!isLoadingBusiness && toastRefListar.current) {
      toast.dismiss(toastRefListar.current);
      toastRefListar.current = null;
    }

    if (isErrorBusiness) {
      toast.error("Error al cargar los roles");
    }
  }, [isLoadingBusiness, isErrorBusiness]);

const businessData = data?.data?.map((business) => ({
  id: business.id,
  active: (
    <Checkbox
      radius="full"
      size="lg"
      color="secondary"
      isSelected={business.status === "active"}
    />
  ),
  name: business.name,
  address: business.address,
  createdAt: new Date(business.createdAt).toLocaleDateString(), 
  planRenewalDate: new Date(business.planRenewalDate).toLocaleDateString(), 
  typeBusiness: business.typeBusiness,
  status: (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        business.status === "active"
          ? "bg-accents-100 text-accents-800"
          : "bg-dangers-100 text-dangers-800"
      }`}
    >
      {business.status === "active" ? "Activo" : "Inactivo"}
    </span>
  ),
  maxStorage: business.config?.[0]?.maxStorage,
  cuantityUsers: business.config?.[0]?.cuantityUsers,
  infinty: business.config?.[0]?.infinty === true ? "Si" : "No",
  actions: (
    <ModalDinamic
      titleButon={<Edit size={15} className="cursor-pointer" />}
      sizeModal="4xl"
      titleModal="Actualizar Rol"
      dataToEdit={business}
      children={(onClose) => (
        <RegisterBusinessComponent onClose={onClose} business={business} />
      )}
      className="bg-white font-roboto"
    />
  )
})) || [];


  return {
    businessData,
    paginationBusiness,
    isLoadingBusiness,
    isErrorBusiness,
    errorBusiness,
  };
};
