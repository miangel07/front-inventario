import LayoutDefault from "@/layouts/Layoutdefault";
import { Checkbox } from "@heroui/react";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <LayoutDefault>
        <div>HOme page</div>
        <Checkbox  />
      </LayoutDefault>
    </>
  );
};

export default HomePage;
