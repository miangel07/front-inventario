import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import { TableDinamic } from "@/components/DYNAMIC_COMPONENTS/TableDinamic";
import RegisterUnitOfMeasurementComponent from "@/components/unitOfMeasurementsComponents/RegisterUnitOfMeasurementComponent";
import useListUnitOfMeasurementHook from "@/hooks/unitOfMeaserementHook/useListUnitOfMeasurementHook";
import LayoutDefault from "@/layouts/Layoutdefault";
import { columnsUnitOf } from "@/utils/unitOfMeasurementUtils/listUnitOfMeasurement";
import { Spinner } from "@heroui/react";
import { useState } from "react";

const UnitOfMeasurementPage = () => {

              const [search, setSearch] = useState("");
              const [page, setPage] = useState(1);
              const [limit, setLimit] = useState(4); 
    
    
              const {
                  unitData,
                  pagination,
                  isLoading,
              } = useListUnitOfMeasurementHook({
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
            <h1 className="text-2xl  text-primarys-500 font-roboto">Gestión de unidades de medida</h1>

            <ModalDinamic titleModal="Registro unidad de medida" titleButon="Nueva Unidad" sizeModal="5xl" backdrop="blur" className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium" children={(onclose) => <RegisterUnitOfMeasurementComponent onClose={onclose} />} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <TableDinamic columns={columnsUnitOf} data={unitData} pagination={pagination} onPageChange={handlePageChange} barraBusqueda={handleSearch} searchPlaceholder="Buscar unidad..." emptyContent={<div className="py-8 text-center">{isLoading ? <Spinner /> : "No se encontraron unidades de medida"}</div>} isLoading={isLoading} />
          </div>
        </div>
      </LayoutDefault>
    </>
  );
};

export default UnitOfMeasurementPage;
