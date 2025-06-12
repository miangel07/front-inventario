// import { TableDinamic } from "@/components/DYNAMIC_COMPONENTS/TableDinamic";
// import { useListUsersHook } from "@/hooks/usersHooks/useListUsersHook";
// import LayoutDefault from "@/layouts/Layoutdefault";
// import { columnsUsers } from "@/utils/usersUtils/listUsersUtils";
// import { Spinner } from "@heroui/react";
// import { useState } from "react";
// import { ModalDinamic } from '@/components/DYNAMIC_COMPONENTS/ModalDinamic';
// import RegisterUserComponent from '@/components/usersComponents/RegisterUserComponent';

// type Props = {};

// const UsersPage = (props: Props) => {

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   const {    usersData,
//     pagination,
//     isLoading,
//     handlePageChange,
//     handleSearch,} = useListUsersHook({})

//   console.log('datos',usersData)


//   return (
//     <>
//       <LayoutDefault>
//           {/* <h1 className="">Gestión de Usuarios</h1>
//           <RegistrationForm /> */}

//           <ModalDinamic
//           titleModal='Registro de Usuario'
//           titleButon='Nuevo Usuario'
//           sizeModal='5xl'
//           backdrop='opaque'
//           className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg  transition-colors font-medium"
//           children={(onclose) => <RegisterUserComponent onClose={onclose} />}
//           />

//           <TableDinamic
//           columns={columnsUsers}
//           data={usersData} 
//           pagination={pagination} 
//           onPageChange={handlePageChange}
//           barraBusqueda={handleSearch}
//           searchPlaceholder="Buscar usuarios..."
//           emptyContent={<>{isLoading && <Spinner />}</>}
//           isLoading={isLoading}
//           />


//       </LayoutDefault>
//     </>
//   );
// };

// export default UsersPage;



import { useListUsersHook } from "@/hooks/usersHooks/useListUsersHook";
import LayoutDefault from "@/layouts/Layoutdefault";
import { columnsUsers } from "@/utils/usersUtils/listUsersUtils";
import { Spinner } from "@heroui/react";
import { useState } from "react";
import { ModalDinamic } from '@/components/DYNAMIC_COMPONENTS/ModalDinamic';
import RegisterUserComponent from '@/components/usersComponents/RegisterUserComponent';
import { TableDinamic } from "@/components/DYNAMIC_COMPONENTS/TableDinamic";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Puedes hacer esto configurable

  const { 
    usersData,
    pagination,
    isLoading
  } = useListUsersHook({ 
    page, 
    search, 
    limit 
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (searchText: string) => {
    setSearch(searchText);
    setPage(1); // Resetear a la primera página al buscar
  };

  return (
    <LayoutDefault>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
          
          <ModalDinamic
            titleModal='Registro de Usuario'
            titleButon='Nuevo Usuario'
            sizeModal='5xl'
            backdrop='opaque'
            className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg transition-colors font-medium"
            children={(onclose) => <RegisterUserComponent onClose={onclose} />}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <TableDinamic
            columns={columnsUsers}
            data={usersData} 
            pagination={pagination}
            onPageChange={handlePageChange}
            barraBusqueda={handleSearch}
            searchPlaceholder="Buscar usuarios..."
            emptyContent={
              <div className="py-8 text-center">
                {isLoading ? <Spinner /> : "No se encontraron usuarios"}
              </div>
            }
            isLoading={isLoading}
          />
        </div>
      </div>
    </LayoutDefault>
  );
};

export default UsersPage;