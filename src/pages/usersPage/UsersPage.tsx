import { TableDinamic } from "@/components/DYNAMIC_COMPONENTS/TableDinamic";
import { useListUsersHook } from "@/hooks/usersHooks/useListUsersHook";
import LayoutDefault from "@/layouts/Layoutdefault";
import { columnsUsers } from "@/utils/usersUtils/listUsersUtils";
import { Spinner } from "@heroui/react";
import { useState } from "react";
import { ModalDinamic } from '@/components/DYNAMIC_COMPONENTS/ModalDinamic';
import RegisterUserComponent from '@/components/usersComponents/RegisterUserComponent';

type Props = {};

const UsersPage = (props: Props) => {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {usersData, pagination,isLoading} = useListUsersHook({})

  console.log('datos',usersData)


  return (
    <>
      <LayoutDefault>
          {/* <h1 className="">Gestión de Usuarios</h1>
          <RegistrationForm /> */}

          <ModalDinamic
          titleModal='Registro de Usuario'
          titleButon='Nuevo Usuario'
          sizeModal='5xl'
          backdrop='opaque'
          className="flex items-center gap-2 px-4 py-2 bg-accents-500 hover:bg-accents-600 text-white rounded-lg  transition-colors font-medium"
          children={(onclose) => <RegisterUserComponent onClose={onclose} />}
          />

          <TableDinamic
          barraBusqueda={(data)=>setSearch(data)}
          columns={columnsUsers}
          onPageChange={setPage} 
          // pagination={pagination} 
          data={usersData} 
          emptyContent={<>{isLoading && <Spinner />}</>}
          />


      </LayoutDefault>
    </>
  );
};

export default UsersPage;
