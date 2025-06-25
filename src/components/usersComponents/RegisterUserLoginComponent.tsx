import { useState, useEffect } from 'react';
import { Card, CardBody, Input, Button, Link, Divider } from '@heroui/react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoginUserMutation } from '@/store/slice/loginSlice';
import { backgroundImages } from '@/utils/LoginUtils/loginUtils';

interface Props {
  isLoginAction: boolean; 
  initialDirection?: number; 
}


const LoginComponent = ({ isLoginAction, initialDirection = 1 }: Props) => {

    const [loginUser, { isLoading: isLoadingLogin, isSuccess: isSuccessLogin, isError: isErrorLogin, error: errorLogin }] = useLoginUserMutation();
  

  const [isLogin, setIsLogin] = useState(isLoginAction);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(initialDirection);



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleFlip = (loginAction: boolean) => {
    setDirection(loginAction ? -1 : 1);
    setIsLogin(loginAction);
  };

  const handleSubmit = () => {
    console.log(isLogin ? 'Login submitted' : 'Register submitted');
  };

  // Variantes de animación
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    })
  };

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Panel Izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login-title' : 'register-title'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
                </h1>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Inicia sesión en tu cuenta' 
                    : 'Completa tus datos para registrarte'
                  }
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Contenedor de formularios con animación */}
          <div className="relative h-[28rem] overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'register'}
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
                        <>
                          {/* Formulario de Login */}
                          <Input
                            type="email"
                            label="Correo electrónico"
                            placeholder="correo@ejemplo.com"
                            startContent={<Mail className="w-4 h-4 text-gray-400" />}
                            variant="bordered"
                            size="lg"
                            required
                          />

                          <Input
                            label="Contraseña"
                            placeholder="Ingresa tu contraseña"
                            startContent={<Lock className="w-4 h-4 text-gray-400" />}
                            endContent={
                              <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                              >
                                {isVisible ? (
                                  <EyeOff className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <Eye className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                            }
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                            size="lg"
                            required
                          />

                          <div className="flex justify-end">
                            <Link 
                              href="#" 
                              size="sm" 
                              className="text-blue-600 hover:text-blue-800"
                            >
                              ¿Olvidaste tu contraseña?
                            </Link>
                          </div>

                          <Button
                            color="primary"
                            size="lg"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={handleSubmit}
                          >
                            Iniciar Sesión
                          </Button>
                        </>
                      ) : (
                        <>
                          {/* Formulario de Registro */}
                          <Input
                            type="text"
                            label="Nombre completo"
                            placeholder="Ingresa tu nombre"
                            startContent={<User className="w-4 h-4 text-gray-400" />}
                            variant="bordered"
                            size="lg"
                            required
                          />
                          <Input
                            type="tel"
                            label="Teléfono"
                            placeholder="Ingresa tu teléfono"
                            startContent={<Phone className="w-4 h-4 text-gray-400" />}
                            variant="bordered"
                            size="lg"
                            required
                          />
                          <Input
                            type="email"
                            label="Correo electrónico"
                            placeholder="correo@ejemplo.com"
                            startContent={<Mail className="w-4 h-4 text-gray-400" />}
                            variant="bordered"
                            size="lg"
                            required
                          />
                          <Input
                            label="Contraseña"
                            placeholder="Ingresa tu contraseña"
                            startContent={<Lock className="w-4 h-4 text-gray-400" />}
                            endContent={
                              <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                              >
                                {isVisible ? (
                                  <EyeOff className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <Eye className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                            }
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                            size="lg"
                            required
                          />
                          <Input
                            label="Confirmar contraseña"
                            placeholder="Confirma tu contraseña"
                            startContent={<Lock className="w-4 h-4 text-gray-400" />}
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                            size="lg"
                            required
                          />

                          <Button
                            color="primary"
                            size="lg"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={handleSubmit}
                          >
                            Crear Cuenta
                          </Button>
                        </>
                      )}

                      <Divider className="my-6" />

                      <div className="text-center">
                        <span className="text-gray-600 text-sm">
                          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                        </span>
                        <Button
                          variant="light"
                          color="primary"
                          size="sm"
                          className="ml-2 text-blue-600 hover:text-blue-800"
                          onClick={() => handleFlip(!isLogin)}
                        >
                          {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Panel Derecho - Imágenes */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-content' : 'register-content'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-white p-8"
            >
              <h2 className="text-4xl font-bold mb-4">
                {isLogin ? 'Conecta con tu equipo' : 'Únete a nosotros'}
              </h2>
              <p className="text-xl opacity-90 max-w-md">
                {isLogin 
                  ? 'Accede a todas las herramientas que necesitas para colaborar de manera efectiva'
                  : 'Forma parte de una comunidad que está transformando la manera de trabajar'
                }
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;