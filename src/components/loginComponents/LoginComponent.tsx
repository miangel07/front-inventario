// import React, { useState, useEffect } from 'react';
// import { Card, CardBody, Input, Button, Link, Divider } from '@heroui/react';
// import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

// const LoginInterface = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFlipping, setIsFlipping] = useState(false);

//   // Imágenes de fondo que van rotando
//   const backgroundImages = [
//     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
//   ];

//   // Cambiar imagen cada 4 segundos
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         (prevIndex + 1) % backgroundImages.length
//       );
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const handleFlip = () => {
//     setIsFlipping(true);
//     setTimeout(() => {
//       setIsLogin(!isLogin);
//       setIsFlipping(false);
//     }, 300);
//   };

//   const handleSubmit = () => {
//     console.log(isLogin ? 'Login submitted' : 'Register submitted');
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Panel Izquierdo - Formulario */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
//             </h1>
//             <p className="text-gray-600">
//               {isLogin 
//                 ? 'Inicia sesión en tu cuenta' 
//                 : 'Completa tus datos para registrarte'
//               }
//             </p>
//           </div>

//           {/* Card con animación de flip */}
//           <div className="relative perspective-1000">
//             <Card 
//               className={`w-full transition-all duration-300 transform-gpu ${
//                 isFlipping ? 'rotate-y-180' : ''
//               }`}
//               shadow="lg"
//             >
//               <CardBody className="p-8">
//                 <div className="space-y-6">
//                   {!isLogin && (
//                     <>
//                       <Input
//                         type="text"
//                         label="Nombre completo"
//                         placeholder="Ingresa tu nombre"
//                         startContent={<User className="w-4 h-4 text-gray-400" />}
//                         variant="bordered"
//                         size="lg"
//                         required
//                       />
//                       <Input
//                         type="tel"
//                         label="Teléfono"
//                         placeholder="Ingresa tu teléfono"
//                         startContent={<Phone className="w-4 h-4 text-gray-400" />}
//                         variant="bordered"
//                         size="lg"
//                         required
//                       />
//                     </>
//                   )}

//                   <Input
//                     type="email"
//                     label="Correo electrónico"
//                     placeholder="correo@ejemplo.com"
//                     startContent={<Mail className="w-4 h-4 text-gray-400" />}
//                     variant="bordered"
//                     size="lg"
//                     required
//                   />

//                   <Input
//                     label="Contraseña"
//                     placeholder="Ingresa tu contraseña"
//                     startContent={<Lock className="w-4 h-4 text-gray-400" />}
//                     endContent={
//                       <button
//                         className="focus:outline-none"
//                         type="button"
//                         onClick={toggleVisibility}
//                       >
//                         {isVisible ? (
//                           <EyeOff className="w-4 h-4 text-gray-400" />
//                         ) : (
//                           <Eye className="w-4 h-4 text-gray-400" />
//                         )}
//                       </button>
//                     }
//                     type={isVisible ? "text" : "password"}
//                     variant="bordered"
//                     size="lg"
//                     required
//                   />

//                   {!isLogin && (
//                     <Input
//                       label="Confirmar contraseña"
//                       placeholder="Confirma tu contraseña"
//                       startContent={<Lock className="w-4 h-4 text-gray-400" />}
//                       type={isVisible ? "text" : "password"}
//                       variant="bordered"
//                       size="lg"
//                       required
//                     />
//                   )}

//                   {isLogin && (
//                     <div className="flex justify-end">
//                       <Link 
//                         href="#" 
//                         size="sm" 
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         ¿Olvidaste tu contraseña?
//                       </Link>
//                     </div>
//                   )}

//                   <Button
//                     color="primary"
//                     size="lg"
//                     className="w-full bg-blue-600 hover:bg-blue-700"
//                     onClick={handleSubmit}
//                   >
//                     {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
//                   </Button>

//                   <Divider className="my-6" />

//                   <div className="text-center">
//                     <span className="text-gray-600 text-sm">
//                       {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
//                     </span>
//                     <Button
//                       variant="light"
//                       color="primary"
//                       size="sm"
//                       className="ml-2 text-blue-600 hover:text-blue-800"
//                       onClick={handleFlip}
//                       disabled={isFlipping}
//                     >
//                       {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
//                     </Button>
//                   </div>
//                 </div>
//               </CardBody>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Panel Derecho - Imágenes */}
//       <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
//         <div className="absolute inset-0">
//           {backgroundImages.map((image, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                 index === currentImageIndex ? 'opacity-100' : 'opacity-0'
//               }`}
//               style={{
//                 backgroundImage: `url(${image})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             />
//           ))}
//         </div>
        
//         {/* Overlay con contenido */}
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="text-center text-white p-8">
//             <h2 className="text-4xl font-bold mb-4">
//               {isLogin ? 'Conecta con tu equipo' : 'Únete a nosotros'}
//             </h2>
//             <p className="text-xl opacity-90 max-w-md">
//               {isLogin 
//                 ? 'Accede a todas las herramientas que necesitas para colaborar de manera efectiva'
//                 : 'Forma parte de una comunidad que está transformando la manera de trabajar'
//               }
//             </p>
//           </div>
//         </div>

//         {/* Indicadores de imagen */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {backgroundImages.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentImageIndex 
//                   ? 'bg-white' 
//                   : 'bg-white bg-opacity-50 hover:bg-opacity-75'
//               }`}
//               onClick={() => setCurrentImageIndex(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginInterface;

// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

// const LoginInterface = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFlipping, setIsFlipping] = useState(false);

//   // Imágenes de fondo que van rotando
//   const backgroundImages = [
//     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
//   ];

//   // Cambiar imagen cada 4 segundos
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         (prevIndex + 1) % backgroundImages.length
//       );
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const handleFlip = () => {
//     setIsFlipping(true);
//     setTimeout(() => {
//       setIsLogin(!isLogin);
//     }, 350); // Medio punto de la animación
//     setTimeout(() => {
//       setIsFlipping(false);
//     }, 700); // Final de la animación
//   };

//   const handleSubmit = () => {
//     console.log(isLogin ? 'Login submitted' : 'Register submitted');
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Panel Izquierdo - Formulario */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
//             </h1>
//             <p className="text-gray-600">
//               {isLogin 
//                 ? 'Inicia sesión en tu cuenta' 
//                 : 'Completa tus datos para registrarte'
//               }
//             </p>
//           </div>

//           {/* Card con animación de flip 3D */}
//           <div className="relative w-full h-auto" style={{ perspective: '1000px' }}>
//             <div 
//               className={`relative w-full transition-transform duration-700 transform-style-preserve-3d ${
//                 isFlipping ? 'rotate-y-180' : ''
//               }`}
//               style={{ transformStyle: 'preserve-3d' }}
//             >
//               {/* Cara frontal - Login */}
//               <div 
//                 className={`absolute inset-0 w-full bg-white rounded-xl shadow-lg border border-gray-200 backface-hidden ${
//                   !isLogin ? 'rotate-y-180' : ''
//                 }`}
//                 style={{ 
//                   backfaceVisibility: 'hidden',
//                   transform: !isLogin ? 'rotateY(180deg)' : 'rotateY(0deg)'
//                 }}
//               >
//                 <div className="p-8">
//                   {isLogin && (
//                     <div className="space-y-6">
//                       {/* Email */}
//                       <div className="relative">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Correo electrónico
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type="email"
//                             placeholder="correo@ejemplo.com"
//                             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Contraseña */}
//                       <div className="relative">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Contraseña
//                         </label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type={isVisible ? "text" : "password"}
//                             placeholder="Ingresa tu contraseña"
//                             className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={toggleVisibility}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
//                           >
//                             {isVisible ? (
//                               <EyeOff className="w-5 h-5" />
//                             ) : (
//                               <Eye className="w-5 h-5" />
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex justify-end">
//                         <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline focus:outline-none transition-colors">
//                           ¿Olvidaste tu contraseña?
//                         </button>
//                       </div>

//                       {/* Botón principal */}
//                       <button
//                         onClick={handleSubmit}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                       >
//                         Iniciar Sesión
//                       </button>

//                       {/* Divider */}
//                       <div className="relative my-6">
//                         <div className="absolute inset-0 flex items-center">
//                           <div className="w-full border-t border-gray-300" />
//                         </div>
//                         <div className="relative flex justify-center text-sm">
//                           <span className="px-2 bg-white text-gray-500">o</span>
//                         </div>
//                       </div>

//                       {/* Toggle entre login/registro */}
//                       <div className="text-center">
//                         <span className="text-gray-600 text-sm">
//                           ¿No tienes una cuenta?
//                         </span>
//                         <button
//                           onClick={handleFlip}
//                           disabled={isFlipping}
//                           className="ml-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline focus:outline-none transition-colors disabled:opacity-50"
//                         >
//                           Registrarse
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Cara trasera - Registro */}
//               <div 
//                 className={`absolute inset-0 w-full bg-white rounded-xl shadow-lg border border-gray-200 backface-hidden ${
//                   isLogin ? 'rotate-y-180' : ''
//                 }`}
//                 style={{ 
//                   backfaceVisibility: 'hidden',
//                   transform: isLogin ? 'rotateY(-180deg)' : 'rotateY(0deg)'
//                 }}
//               >
//                 <div className="p-8">
//                   {!isLogin && (
//                     <div className="space-y-6">
//                       {/* Nombre completo */}
//                       <div className="relative">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Nombre completo
//                         </label>
//                         <div className="relative">
//                           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type="text"
//                             placeholder="Ingresa tu nombre"
//                             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Teléfono */}
//                       <div className="relative">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Teléfono
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type="tel"
//                             placeholder="Ingresa tu teléfono"
//                             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Email */}
//                       <div className="relative">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Correo electrónico
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type="email"
//                             placeholder="correo@ejemplo.com"
//                             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Contraseña */}
//                       <div className="relative">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Contraseña
//                         </label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type={isVisible ? "text" : "password"}
//                             placeholder="Ingresa tu contraseña"
//                             className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             required
//                           />
//                           <button
//                             type="button"
//                             onClick={toggleVisibility}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
//                           >
//                             {isVisible ? (
//                               <EyeOff className="w-5 h-5" />
//                             ) : (
//                               <Eye className="w-5 h-5" />
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       {/* Confirmar contraseña */}
//                       <div className="relative">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Confirmar contraseña
//                         </label>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <input
//                             type={isVisible ? "text" : "password"}
//                             placeholder="Confirma tu contraseña"
//                             className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Botón principal */}
//                       <button
//                         onClick={handleSubmit}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                       >
//                         Crear Cuenta
//                       </button>

//                       {/* Divider */}
//                       <div className="relative my-6">
//                         <div className="absolute inset-0 flex items-center">
//                           <div className="w-full border-t border-gray-300" />
//                         </div>
//                         <div className="relative flex justify-center text-sm">
//                           <span className="px-2 bg-white text-gray-500">o</span>
//                         </div>
//                       </div>

//                       {/* Toggle entre login/registro */}
//                       <div className="text-center">
//                         <span className="text-gray-600 text-sm">
//                           ¿Ya tienes una cuenta?
//                         </span>
//                         <button
//                           onClick={handleFlip}
//                           disabled={isFlipping}
//                           className="ml-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline focus:outline-none transition-colors disabled:opacity-50"
//                         >
//                           Iniciar Sesión
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Panel Derecho - Imágenes */}
//       <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
//         <div className="absolute inset-0">
//           {backgroundImages.map((image, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                 index === currentImageIndex ? 'opacity-100' : 'opacity-0'
//               }`}
//               style={{
//                 backgroundImage: `url(${image})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             />
//           ))}
//         </div>
        
//         {/* Overlay con contenido */}
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="text-center text-white p-8">
//             <h2 className="text-4xl font-bold mb-4">
//               {isLogin ? 'Conecta con tu equipo' : 'Únete a nosotros'}
//             </h2>
//             <p className="text-xl opacity-90 max-w-md">
//               {isLogin 
//                 ? 'Accede a todas las herramientas que necesitas para colaborar de manera efectiva'
//                 : 'Forma parte de una comunidad que está transformando la manera de trabajar'
//               }
//             </p>
//           </div>
//         </div>

//         {/* Indicadores de imagen */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {backgroundImages.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
//                 index === currentImageIndex 
//                   ? 'bg-white' 
//                   : 'bg-white bg-opacity-50 hover:bg-opacity-75'
//               }`}
//               onClick={() => setCurrentImageIndex(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginInterface;

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Input, Button, Link, Divider } from '@heroui/react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginInterface = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 para derecha, -1 para izquierda

  const backgroundImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleFlip = (isLoginAction) => {
    setDirection(isLoginAction ? -1 : 1);
    setIsLogin(isLoginAction);
  };

  const handleSubmit = () => {
    console.log(isLogin ? 'Login submitted' : 'Register submitted');
  };

  // Variantes de animación
  const pageVariants = {
    enter: (direction) => ({
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
    exit: (direction) => ({
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

export default LoginInterface;