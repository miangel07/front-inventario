import { HeroUIProvider } from "@heroui/system";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";



export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <>
      <Provider store ={store}>
        <HeroUIProvider navigate={navigate}>{children}</HeroUIProvider>
      </Provider>
    </>
  )
}