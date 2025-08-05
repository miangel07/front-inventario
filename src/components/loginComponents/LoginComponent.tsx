// import { useLoginUserMutation } from "@/store/slice/loginSlice";
// import { LoginType, RegisterLoginProps } from "@/types/login/loginType";
// import { LoginTypeSchema } from "@/validations/loginValidation/loginSchemaZod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Id, toast } from "react-toastify";
// import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";
// import { Eye, EyeOff, User } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button, Card, CardBody, Divider, Input } from "@heroui/react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/authenticationHook/authenticationGlobalHook";

// interface Props extends RegisterLoginProps {
//   isLoginAction?: boolean;
//   initialDirection?: number;
// }

// const LoginComponent = ({ isLoginAction = true, initialDirection = 1 }: Props) => {
//   const navigate = useNavigate();
//   const referenciaIdtostat = useRef<Id | null>(null);

//   const [loginUser, { isLoading, isSuccess, isError, error, data }] = useLoginUserMutation();
//   const { login } = useAuth();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<LoginType>({
//     resolver: zodResolver(LoginTypeSchema),
//     defaultValues: {},
//   });

//   const [isLogin, setIsLogin] = useState(isLoginAction);
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const [direction, setDirection] = useState(initialDirection);

//   const pageVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 300 : -300,
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.3,
//       },
//     },
//     exit: (direction: number) => ({
//       x: direction > 0 ? -300 : 300,
//       opacity: 0,
//       transition: {
//         duration: 0.3,
//       },
//     }),
//   };

//   const handleFlip = (loginAction: boolean) => {
//     setDirection(loginAction ? -1 : 1);
//     setIsLogin(loginAction);
//   };

//   useEffect(() => {
//     if (isLoading) {
//       referenciaIdtostat.current = toast.loading("Iniciando sesión...");
//     }

//     if (isSuccess && data) {
//       toast.dismiss(referenciaIdtostat.current!);
//       setTimeout(() => {
//         toast.success(data.message);       
//         login(data.user, data.access_token);
//         navigate('/home');
//       }, 100);
//     }

//     if (isError) {
//       toast.dismiss(referenciaIdtostat.current!);

//       if (Array.isArray(error)) {
//         error.forEach((err) => toast.error(err.message));
//       } else if (error && typeof error === "object" && "message" in error) {
//         toast.error(error.message);
//       } else {
//         toast.error("Error de conexión o servidor");
//       }
//     }
//   }, [isLoading, isSuccess, isError, error, data, login, navigate]);

//   const onSubmit = async (data: LoginType) => {
//     try {
//       await loginUser(data).unwrap();
//     } catch (error) {
//       console.error("Error: ", error);
//     }
//   };

//   return (
//     <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//       <div className="w-full max-w-md">
//         <div className="mb-8 text-center">
//           <AnimatePresence mode="wait">
//             <motion.div 
//               key={isLogin ? "login-title" : "register-title"} 
//               initial={{ y: -20, opacity: 0 }} 
//               animate={{ y: 0, opacity: 1 }} 
//               exit={{ y: 20, opacity: 0 }} 
//               transition={{ duration: 0.2 }}
//             >
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {isLogin ? "Bienvenido" : "Recuperar contraseña"}
//               </h1>
//               <p className="text-gray-600">
//                 {isLogin ? "Inicia sesión en tu cuenta" : "Completa tus datos para recuperar contraseña"}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//         <div className="relative h-[28rem] overflow-hidden">
//           <AnimatePresence custom={direction} mode="wait">
//             <motion.div 
//               key={isLogin ? "login" : "register"} 
//               custom={direction} 
//               variants={pageVariants} 
//               initial="enter" 
//               animate="center" 
//               exit="exit" 
//               className="absolute w-full h-full"
//             >
//               <Card shadow="lg" className="w-full h-full overflow-hidden">
//                 <CardBody className="p-8 h-full overflow-y-auto">
//                   <div className="space-y-6">
//                     {isLogin ? (
//                       <form onSubmit={handleSubmit(onSubmit)}>
//                         <InputDinamic 
//                           errors={errors} 
//                           control={control} 
//                           id="email" 
//                           type="text" 
//                           name="email" 
//                           placeholder="ingrese su correo" 
//                         />

//                         <InputDinamic
//                           errors={errors}
//                           control={control}
//                           id="password"
//                           type={isVisible ? "text" : "password"}
//                           name="password"
//                           placeholder="Contraseña "
//                           icon={
//                             <button 
//                               aria-label="toggle password visibility" 
//                               type="button" 
//                               onClick={() => setIsVisible(!isVisible)} 
//                               className="focus:outline-none p-1 hover:bg-gray-100 rounded-md transition-colors"
//                             >
//                               {isVisible ? 
//                                 <EyeOff className="w-4 h-4 text-gray-400" /> : 
//                                 <Eye className="w-4 h-4 text-gray-400" />
//                               }
//                             </button>
//                           }
//                         />

//                         <button 
//                           type="submit" 
//                           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                           Enviar
//                         </button>
//                       </form>
//                     ) : (
//                       <Input 
//                         type="text" 
//                         label="Nombre completo" 
//                         placeholder="Ingresa tu nombre" 
//                         startContent={<User className="w-4 h-4 text-gray-400" />} 
//                         variant="bordered" 
//                         size="lg" 
//                         required 
//                       />
//                     )}
//                     <Divider className="my-6" />
//                     <div className="text-center">
//                       <span className="text-gray-600 text-sm">
//                         {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
//                       </span>
//                       <Button 
//                         variant="light" 
//                         color="primary" 
//                         size="sm" 
//                         className="ml-2 text-blue-600 hover:text-blue-800" 
//                         onClick={() => handleFlip(!isLogin)}
//                       >
//                         {isLogin ? "Recuperar contraseña" : "Iniciar Sesión"}
//                       </Button>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginComponent;


import { useLoginUserConfirmMutation, useLoginUserMutation } from "@/store/slice/loginSlice";
import { LoginType, RegisterLoginProps } from "@/types/login/loginType";
import { LoginTypeSchema } from "@/validations/loginValidation/loginSchemaZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Id, toast } from "react-toastify";
import { InputDinamic } from "../DYNAMIC_COMPONENTS/InputDinamic";
import { Eye, EyeOff, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardBody, Divider, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/authenticationHook/authenticationGlobalHook";
import { SelectStorageModal } from "./SelectStorageModal";


interface Props extends RegisterLoginProps {
  isLoginAction?: boolean;
  initialDirection?: number;
}

const LoginComponent = ({ isLoginAction = true, initialDirection = 1 }: Props) => {
  const navigate = useNavigate();
  const referenciaIdtostat = useRef<Id | null>(null);

  const [loginUser, { isLoading, isSuccess, isError, error, data }] = useLoginUserMutation();
  const [loginUserConfirm] = useLoginUserConfirmMutation();
  const {tempUser, login, setTempUser, clearTempUser } = useAuth();

  const [showStorageModal, setShowStorageModal] = useState(false);
  const [isLogin, setIsLogin] = useState(isLoginAction);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState(initialDirection);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(LoginTypeSchema),
    defaultValues: {},
  });

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const handleFlip = (loginAction: boolean) => {
    setDirection(loginAction ? -1 : 1);
    setIsLogin(loginAction);
  };


useEffect(() => {
  if (isSuccess && data) {
    const toastId = referenciaIdtostat.current;
    
    // Cierra el toast de carga primero
    if (toastId) toast.dismiss(toastId);

    // Caso 1: Usuario con múltiples storages
    if (data.user.storages && data.user.storages.length > 1) {
      setTempUser(data.user);
      setShowStorageModal(true);
      toast.info("Selecciona una bodega para continuar");
      return; // Salir temprano
    } 
    
    // Caso 2: Usuario con acceso directo
    if (data.access_token) {
      login(data.user, data.access_token);
      toast.success(data.message);
      navigate('/home');
      return;
    }

    // Caso 3: Respuesta inesperada
    toast.error("Error en la respuesta del servidor");
  }

  if (isError) {
    const toastId = referenciaIdtostat.current;
    if (toastId) toast.dismiss(toastId);
    
    if (Array.isArray(error)) {
      error.forEach((err) => toast.error(`${err.field}: ${err.message}`));
    } else {
      toast.error("Error de autenticación");
    }
  }
}, [isSuccess, isError, error, data]);


  const onSubmit = async (data: LoginType) => {
  try {
    referenciaIdtostat.current = toast.loading("Iniciando sesión...");
    await loginUser(data).unwrap();
  } catch (error) {
    if (referenciaIdtostat.current) {
      toast.dismiss(referenciaIdtostat.current);
    }
    console.error("Error en login:", error);
  }
};


  const handleCloseModal = () => {
    setShowStorageModal(false);
    clearTempUser(); // Limpiar usuario temporal si cancela
  };


  const handleStorageSelect = async (storageId: number) => {
  if (!tempUser?.email) return;
  
  try {
    const response = await loginUserConfirm({
      email: tempUser.email,
      storageId
    }).unwrap();
    
    if (response.access_token) {
      login(response.user, response.access_token);
      setShowStorageModal(false);
      navigate('/home');
    }
  } catch (error) {
    console.error("Error al confirmar storage:", error);
    toast.error("Error al seleccionar bodega");
  }
};



  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={isLogin ? "login-title" : "register-title"} 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 20, opacity: 0 }} 
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? "Bienvenido" : "Recuperar contraseña"}
              </h1>
              <p className="text-gray-600">
                {isLogin ? "Inicia sesión en tu cuenta" : "Completa tus datos para recuperar contraseña"}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="relative h-[28rem] overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div 
              key={isLogin ? "login" : "register"} 
              custom={direction} 
              variants={pageVariants} 
              initial="enter" 
              animate="center" 
              exit="exit" 
              className="absolute w-full h-full"
            >
              <Card shadow="lg" className="w-full h-full overflow-hidden">
                <CardBody className="p-8 h-full overflow-y-auto">
                  <div className="space-y-6">
                    {isLogin ? (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <InputDinamic 
                          errors={errors} 
                          control={control} 
                          id="email" 
                          type="text" 
                          name="email" 
                          placeholder="Ingrese su correo" 
                        />

                        <InputDinamic
                          errors={errors}
                          control={control}
                          id="password"
                          type={isVisible ? "text" : "password"}
                          name="password"
                          placeholder="Contraseña"
                          icon={
                            <button 
                              type="button" 
                              onClick={() => setIsVisible(!isVisible)}
                              className="focus:outline-none p-1 hover:bg-gray-100 rounded-md transition-colors"
                            >
                              {isVisible ? 
                                <EyeOff className="w-4 h-4 text-gray-400" /> : 
                                <Eye className="w-4 h-4 text-gray-400" />
                              }
                            </button>
                          }
                        />

                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {isLoading ? "Iniciando..." : "Iniciar sesión"}
                        </button>
                      </form>
                    ) : (
                      <Input 
                        type="text" 
                        label="Nombre completo" 
                        placeholder="Ingresa tu nombre" 
                        startContent={<User className="w-4 h-4 text-gray-400" />} 
                        variant="bordered" 
                        size="lg" 
                        required 
                      />
                    )}
                    
                    <Divider className="my-6" />
                    
                    <div className="text-center">
                      <span className="text-gray-600 text-sm">
                        {isLogin ? "¿Olvidaste tu contraseña?" : "¿Ya tienes una cuenta?"}
                      </span>
                      <Button 
                        variant="light" 
                        color="primary" 
                        size="sm" 
                        className="ml-2 text-blue-600 hover:text-blue-800" 
                        onClick={() => handleFlip(!isLogin)}
                      >
                        {isLogin ? "Recuperar contraseña" : "Iniciar Sesión"}
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Modal para selección de storage */}
      {/* {showStorageModal && tempUser && (
        <SelectStorageModal
          user={tempUser}
          onClose={handleCloseModal}
          onSelect={handleStorageSelect}
        />
      )} */}
{showStorageModal && tempUser && tempUser.storages && (
  <SelectStorageModal
    user={{ ...tempUser, storages: tempUser.storages }}
    onClose={handleCloseModal}
    onSelect={handleStorageSelect}
  />
)}

    </div>
  );
};

export default LoginComponent;