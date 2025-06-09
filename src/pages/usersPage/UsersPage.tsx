import RegistrationForm from "@/components/usersComponents/RegisterUserComponent";
import LayoutDefault from "@/layouts/Layoutdefault";

type Props = {};

const UsersPage = (props: Props) => {
  return (
    <>
      <LayoutDefault>
          <h1 className="">Gestión de Usuarios</h1>
          <RegistrationForm /> 

      </LayoutDefault>
    </>
  );
};

export default UsersPage;
