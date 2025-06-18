import { ModalDinamic } from '@/components/DYNAMIC_COMPONENTS/ModalDinamic'
import { TableDinamic } from '@/components/DYNAMIC_COMPONENTS/TableDinamic'
import RegisterWineriesComponent from '@/components/wineriesComponents/RegisterWineriesComponent'
import { useListWineriesHook } from '@/hooks/wineriesHooks/useListWineriesHook'
import LayoutDefault from '@/layouts/Layoutdefault'
import { columnsWineries } from '@/utils/wineriesUtils/listWineriesUtils'
import { Spinner } from '@heroui/react'
import { useState } from 'react'



const WineriesPage = () => {

      const [search, setSearch] = useState("");
      const [page, setPage] = useState(1);
      const [limit, setLimit] = useState(4); 


    const {
        wineriesData,
        pagination,
        isLoading,
    } = useListWineriesHook({
            page, 
    search, 
    limit 
    })

      const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (searchText: string) => {
    setSearch(searchText);
    setPage(1); // Resetear a la primera página al buscar
  };




  return (
    <>
    <LayoutDefault>
              <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl  text-primarys-500 font-roboto">Gestión de Bodegas</h1>
                  
                  <ModalDinamic
                    titleModal='Registro Bodega'
                    titleButon='Nueva Bodega'
                    sizeModal='5xl'
                    backdrop='blur'
                    className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium"
                    children={(onclose) => <RegisterWineriesComponent onClose={onclose} />}
                  />
                </div>
        
                <div className="bg-white rounded-lg shadow p-6">
                  <TableDinamic
                    columns={columnsWineries}
                    data={wineriesData} 
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    barraBusqueda={handleSearch}
                    searchPlaceholder="Buscar bodegas..."
                    emptyContent={
                      <div className="py-8 text-center">
                        {isLoading ? <Spinner /> : "No se encontraron bodegas"}
                      </div>
                    }
                    isLoading={isLoading}
                  />
                </div>
              </div>
    </LayoutDefault>
    </>
  )
}

export default WineriesPage