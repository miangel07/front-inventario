import { ModalDinamic } from "@/components/DYNAMIC_COMPONENTS/ModalDinamic";
import RegisterProductsComponent from "@/components/productsComponents/RegisterProductsComponent";
import LayoutDefault from "@/layouts/Layoutdefault";
import { useState } from "react";


const ProductsPage = () => {

          const [search, setSearch] = useState("");
          const [page, setPage] = useState(1);
          const [limit, setLimit] = useState(4); 


        //   const {
        //       categoriesData,
        //       pagination,
        //       isLoading,
        //   } = useListCategoriesHook({
        //           page, 
        //   search, 
        //   limit 
        //   })    

//                 const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleSearch = (searchText: string) => {
//     setSearch(searchText);
//     setPage(1); // Resetear a la primera página al buscar
//   };


  return (
    <LayoutDefault>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl  text-primarys-500 font-roboto">Gestión de Productos</h1>

          <ModalDinamic 
          titleModal="Registro Categoria" 
          titleButon="Nuevo Producto" 
          sizeModal="5xl" 
          backdrop="blur" 
          className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium" 
          children={(onclose) => <RegisterProductsComponent onClose={onclose} />} />
        </div>

        {/* <div className="bg-white rounded-lg shadow p-6">
          <TableDinamic 
          columns={columnsCategories} 
          data={categoriesData} 
          pagination={pagination} 
          onPageChange={handlePageChange} 
          barraBusqueda={handleSearch} 
          searchPlaceholder="Buscar bodegas..." 
          emptyContent={<div className="py-8 text-center">{isLoading ? <Spinner /> : "No se encontraron bodegas"}</div>} 
          isLoading={isLoading} 
          />
        </div> */}
      </div>
    </LayoutDefault>
  );
};

export default ProductsPage;
