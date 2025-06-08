import Router from "./routes/router";
import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "react-responsive";

function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <ToastContainer position={isMobile ? "top-center" : "bottom-right"} autoClose={4000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />
      <Router />
    </>
  );
}

export default App;
