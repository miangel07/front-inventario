import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import RegisterProductsComponent from "@/components/productsComponents/RegisterProductsComponent";
import { useGetProductsQuery, useUpdateProductStatusMutation } from "@/store/slice/productsSlice";
import { Checkbox } from "@heroui/react";
import { Edit } from "lucide-react";
import { useEffect, useRef } from "react";
import { Id, toast } from "react-toastify";

export const useListProductsHook = ({ page = 1, search = "", limit = 10 }: { page?: number; search?: string; limit?: number }) => {
  const toastRefListar = useRef<Id | null>(null);
  const referenciaIdtostat = useRef<Id | null>(null);

  const { data, isLoading, isError, error } = useGetProductsQuery({
    page,
    search,
    limit,
  });


    const [updateProductStatus, { data: dataUpdateProductStatus, isSuccess: isSuccessUpdateProductStatus, isError: isErrorUpdateProductStatus, error: errorUpdateProductStatus }] = useUpdateProductStatusMutation();

  const pagination = data?.meta;


    useEffect(() => {
      if (isLoading && !toastRefListar.current) {
        toastRefListar.current = toast.loading("Cargando productos...");
      }
  
      if (!isLoading && toastRefListar.current) {
        toast.dismiss(toastRefListar.current);
        toastRefListar.current = null;
      }
  
      if (isError) {
        toast.error("Error al cargar los productos");
      }
    }, [isLoading, isError]);
  
    useEffect(() => {
      if (isSuccessUpdateProductStatus) {
        toast.dismiss(referenciaIdtostat.current!);
        toast.success(`${dataUpdateProductStatus}`);
      }
  
      if (isErrorUpdateProductStatus && Array.isArray(errorUpdateProductStatus)) {
        toast.dismiss(referenciaIdtostat.current!);
        errorUpdateProductStatus.map((e) => toast.error(`${e.message}`));
      }
    }, [isSuccessUpdateProductStatus, isErrorUpdateProductStatus, errorUpdateProductStatus]);


    const productStatus = (id: number, nameProduct: string, currentStatus: string) => {
        try {
          if (id === 0) {
            return toast.error("Producto no seleccionado");
          }
    
          // Determinar el nuevo estado (toggle)
          const newStatus = currentStatus === "active" ? "inactive" : "active";
    
          const confirmId = toast(
            () => (
              <div>
                <p>
                  ¿Está seguro de cambiar el estado del producto <strong>{nameProduct}</strong>?
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
                        await updateProductStatus({ id, status: newStatus }).unwrap();
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



      const ProductsData =
          data?.data?.map((product) => ({
            id: product.id,
            active: (
              <Checkbox
                radius="full"
                size="lg"
                color="secondary"
                isSelected={product.Status === "active"}
                onChange={() => productStatus(product.id as number, product.nameProduct, product.Status as string)}
              />
            ),
            nameProduct: product.nameProduct,
            description: product.description,
            internalCode: product.internalCode,
            Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.Status === "active" ? "bg-accents-100 text-accents-800" : "bg-dangers-100 text-dangers-800"}`}>{product.Status === "active" ? "Activo" : "Inactivo"}</span>,
            brand:product.brand,
            stockMax:product.stockMax,
            stockMin:product.stockMin,
            img:product.img,
            observations:product.observations,
            location:product.location,
            expirationDate:product.expirationDate,
            measureUnitId:product.measureUnitId,
            categoryId:product.categoryId,
            actions: (
              <>
                <ModalDinamic titleButon={<Edit size={15} className="cursor-pointer" />} sizeModal="4xl" titleModal="Actualizar producto" dataToEdit={product} children={(onClose) => <RegisterProductsComponent onClose={onClose} product={product} />} className="bg-white font-roboto" />
              </>
            ),
          })) || [];

          return {
            ProductsData,
            pagination,
            isLoading,
            isError,
            error
          }



};
