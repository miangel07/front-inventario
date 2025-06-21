import RegisterCategoriesComponent from '@/components/CategoriesComponents/RegisterCategoriesComponent';
import { ModalDinamic } from '@/components/DYNAMIC_COMPONENTS/ModalDinamic';
import { useGetCategoriesQuery, useUpdateCategoryStateMutation } from '@/store/slice/categoriesSlice';
import { Checkbox } from '@heroui/react';
import { Edit } from 'lucide-react';
import { useEffect, useRef } from 'react'
import { Id, toast } from 'react-toastify';



const useListCategoriesHook = ({ page = 1, search = "", limit = 10 }: { page?: number; search?: string; limit?: number }) => {

    const toastRefListar = useRef<Id | null>(null);

    const referenciaIdtostat = useRef<Id | null>(null);

            const { data, isLoading, isError, error } = useGetCategoriesQuery({
              page,
              search,
              limit
            });


                const [updateCategoryStatus, { data: dataUpdateCategoryStatus, isSuccess: isSuccessUpdateCategoryStatus, isError: isErrorUpdateCategoryStatus, error: errorUpdateCategoryStatus }] = useUpdateCategoryStateMutation();


              const pagination = data?.meta; 

                  useEffect(() => {
                    if (isLoading && !toastRefListar.current) {
                      toastRefListar.current = toast.loading("Cargando categorias...");
                    }
                
                    if (!isLoading && toastRefListar.current) {
                      toast.dismiss(toastRefListar.current);
                      toastRefListar.current = null;
                    }
                
                    if (isError) {
                      toast.error("Error al cargar las categorias");
                    }
                  }, [isLoading, isError]);


                      useEffect(() => {
                      if (isSuccessUpdateCategoryStatus) {
                        toast.dismiss(referenciaIdtostat.current!);
                        toast.success(`${dataUpdateCategoryStatus}`);
                      }
                  
                      if (isErrorUpdateCategoryStatus && Array.isArray(errorUpdateCategoryStatus)) {
                        toast.dismiss(referenciaIdtostat.current!);
                        errorUpdateCategoryStatus.map((e) => toast.error(`${e.message}`));
                      }
                    }, [isSuccessUpdateCategoryStatus, isErrorUpdateCategoryStatus, errorUpdateCategoryStatus]);


                        const CategoryStatus = (id: number, NameCategory: string, currentStatus: string) => {
                        try {
                          if (id === 0) {
                            return toast.error("Categorya no seleccionada");
                          }
                    
                          // Determinar el nuevo estado (toggle)
                          const newStatus = currentStatus === "active" ? "inactive" : "active";
                    
                          const confirmId = toast(
                            () => (
                              <div>
                                <p>
                                  ¿Está seguro de cambiar el estado del usuario <strong>{NameCategory}</strong>?
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
                                        await updateCategoryStatus({ id, status: newStatus }).unwrap();
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


                        const categoriesData = data?.data?.map((category) => ({
                          id: category.id,
                          active: (
                            <Checkbox 
                              radius="full" 
                              size="lg" 
                              color="secondary" 
                              isSelected={category.Status === "active"} 
                                      onChange={() => CategoryStatus(category.id as number, category.NameCategory, category.Status as string)}
                            />
                          ),
                          NameCategory: category.NameCategory,
                          Status: (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              category.Status === 'active' 
                                ? 'bg-accents-100 text-accents-800' 
                                : 'bg-dangers-100 text-dangers-800'
                            }`}>
                              {category.Status === 'active' ? 'Activo' : 'Inactivo'}
                            </span>
                          ),
                       actions: (
                        <>
                      
{/*                             <ModalDinamic 
                              titleButon={<Eye size={15} className="cursor-pointer" />}
                              sizeModal="5xl" 
                              titleModal="Detalles de usuario" 
                              dataToEdit={category}
                              children={() => (<DetailsWineriesComponent  category={category}/>)}
                              className="bg-white font-roboto"
                            />  */}
                      
                            <ModalDinamic 
                              titleButon={<Edit size={15} className="cursor-pointer" />}
                              sizeModal="4xl" 
                              titleModal="Actualizar categoria" 
                              dataToEdit={category}
                              children={(onClose) => <RegisterCategoriesComponent onClose={onClose} category={category} />}
                              className="bg-white font-roboto"
                            /> 
                        </>
                      ),
                        })) || [];


  return {
    categoriesData,
    pagination,
        isLoading,
    isError,
    error
}
}

export default useListCategoriesHook