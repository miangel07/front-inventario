import RegisterCategoriesComponent from '@/components/CategoriesComponents/RegisterCategoriesComponent';
import { ModalDinamic } from '@/components/DYNAMIC_COMPONENTS/ModalDinamic';
import { useGetCategoriesQuery } from '@/store/slice/categoriesSlice';
import { Checkbox } from '@heroui/react';
import { Edit } from 'lucide-react';
import { useEffect, useRef } from 'react'
import { Id, toast } from 'react-toastify';



const useListCategoriesHook = ({ page = 1, search = "", limit = 10 }: { page?: number; search?: string; limit?: number }) => {

    const toastRefListar = useRef<Id | null>(null);

            const { data, isLoading, isError, error } = useGetCategoriesQuery({
              page,
              search,
              limit
            });

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



                        const categoriesData = data?.data?.map((category) => ({
                          id: category.id,
                          active: (
                            <Checkbox 
                              radius="full" 
                              size="lg" 
                              color="secondary" 
                              isSelected={category.Status === "active"} 
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