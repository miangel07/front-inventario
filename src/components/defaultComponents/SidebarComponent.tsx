// import { useState, useEffect } from 'react';
// import {
//   Button,
//   Divider,
//   Chip,
//   Badge
// } from '@heroui/react';
// import { ChevronRight, Bell } from 'lucide-react';
// import { bottomMenuItems, categoryLabels, menuItems, getDynamicBadges } from '@/utils/sidebarUtils/sidebarUtils';
// import { MenuItem, SidebarProps } from '@/types/sidebarTypes/sidebarTypes';
// import { Link } from 'react-router-dom';
// import { useAppSelector } from '@/store/store';
// import { selectUserRole } from '@/store/slice/authSlice';

// const SidebarComponent = ({
//   activeMenuItem,
//   onMenuItemClick,
//   onMobileClose,
//   isMobileOpen,
//   className,
//   // userRole = 'admin' // Prop para controlar permisos
// }: SidebarProps & { userRole?: string }) => {

//   const userRole = useAppSelector(selectUserRole);
  
  
//   const [isMobile, setIsMobile] = useState(false);
//   const [badges, setBadges] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Simulación de carga de badges dinámicos
//   useEffect(() => {
//     const dynamicBadges = getDynamicBadges();
//     setBadges(dynamicBadges);
//   }, []);

//   const handleMenuClick = (key: string) => {
//     onMenuItemClick?.(key);
//     if (isMobile) {
//       onMobileClose?.();
//     }
//   };

//   const sidebarClasses = `
//     fixed top-16 left-0 h-[calc(100vh-4rem)] w-64
//     ${isMobile && !isMobileOpen ? '-translate-x-full' : 'translate-x-0'}
//     bg-primarys-800/95 backdrop-blur-xl border-r border-primarys-700/50
//     transition-all duration-300 ease-in-out
//     shadow-2xl lg:shadow-xl
//     z-30 flex flex-col
//     ${className}
//   `;

//   const renderMenuItem = (item: MenuItem, isBottom = false) => {
//     const IconComponent = item.icon;
//     const isActive = activeMenuItem === item.key;
//     const dynamicBadge = badges[item.key] || item.badge;

//     return (
//       <Button
//         key={item.key}
//         as={Link}
//         to={item.href}
//         variant="light"
//         className={`
//           w-full h-12 px-4 mb-2 justify-start group rounded-xl
//           ${isActive ? 
//             'bg-accents-500/20 text-accents-400 font-semibold shadow-lg border-l-4 border-accents-400 backdrop-blur-sm' : 
//             'text-primarys-200 hover:bg-primarys-700/60 hover:text-white hover:shadow-md'
//           }
//           transition-all duration-300 ease-in-out
//           ${!isBottom ? 'hover:translate-x-2 hover:scale-105' : 'hover:translate-x-1'}
//           backdrop-blur-sm
//         `}
//         startContent={
//           <div className={`flex-shrink-0 transition-all duration-300 ${
//             isActive ? 'scale-110 text-accents-400' : 'group-hover:scale-110 group-hover:text-accents-300'
//           }`}>
//             <IconComponent size={20} />
//           </div>
//         }
//         endContent={
//           <div className="flex items-center gap-2 ml-auto">
//             {dynamicBadge && (
//               <Chip 
//                 size="sm" 
//                 color={item.key.includes('activos') || item.key.includes('pendientes') ? "warning" : "danger"} 
//                 variant="solid"
//                 className="animate-pulse shadow-sm"
//               >
//                 {dynamicBadge}
//               </Chip>
//             )}
//             {isActive && !isBottom && (
//               <ChevronRight 
//                 size={16} 
//                 className="flex-shrink-0 animate-pulse text-accents-400" 
//               />
//             )}
//           </div>
//         }
//         onPress={() => {
//           handleMenuClick(item.key);
//           if (isMobile) {
//             onMobileClose?.();
//           }
//         }}
//       >
//         <span className="flex-1 text-left truncate font-medium">
//           {item.label}
//         </span>
//       </Button>
//     );
//   };

//   // Filtrar menús según permisos (opcional)
//   const filteredMenuItems = userRole === 'admin' ? menuItems : 
//     menuItems.filter(item => !['usuarios', 'empresas'].includes(item.key));

//   const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
//     const category = item.category || 'other';
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(item);
//     return acc;
//   }, {} as Record<string, MenuItem[]>);

//   // Orden específico de categorías
//   const categoryOrder = ['main', 'inventario', 'prestamos', 'movimientos', 'reportes'];
//   const orderedCategories = categoryOrder.filter(cat => groupedMenuItems[cat]);

//   return (
//     <>
//       {/* Overlay para móvil - Mejorado */}
//       {isMobile && isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-primarys-900/40 backdrop-blur-sm z-20 transition-all duration-300"
//           onClick={onMobileClose}
//         />
//       )}

//       {/* Sidebar - Fondo oscuro elegante */}
//       <aside className={sidebarClasses}>
//         {/* Header del Sidebar - Mejorado */}
//         <div className="p-4 border-b border-primarys-700/50 bg-primarys-800/50 backdrop-blur-md">
//           <div className="flex items-center justify-between">
//             <div className="flex flex-col">
//               <h2 className="text-sm font-bold text-white">Sistema de Inventario</h2>
//               <span className="text-xs text-primarys-300">Panel de Control</span>
//             </div>
//             <Badge content="3" color="danger" size="sm" className="animate-pulse">
//               <Button 
//                 isIconOnly 
//                 size="sm" 
//                 variant="light" 
//                 className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
//               >
//                 <Bell size={16} />
//               </Button>
//             </Badge>
//           </div>
//         </div>

//         {/* Navigation Menu - Mejorado */}
//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
//           {orderedCategories.map((category, index) => {
//             const items = groupedMenuItems[category];
//             return (
//               <div key={category} className="mb-6">
//                 <div className="px-3 mb-3">
//                   <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
//                     {categoryLabels[category as keyof typeof categoryLabels] || category}
//                   </p>
//                 </div>
//                 <div className="space-y-1">
//                   {items.map(item => renderMenuItem(item))}
//                 </div>
//                 {index < orderedCategories.length - 1 && (
//                   <Divider className="my-4 bg-primarys-700/50" />
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         {/* Bottom Menu - Solo para administradores - Mejorado */}
// {userRole && ['admin', 'super_admin'].includes(userRole) && (
//   <div className="p-4 border-t border-primarys-700/50 bg-primarys-800/30 backdrop-blur-md">
//     <div className="px-3 mb-3">
//       <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
//         Administración
//       </p>
//     </div>
//     <div className="space-y-1">
//       {bottomMenuItems
//         .filter(item => !item.rolesPermitidos || item.rolesPermitidos.includes(userRole))
//         .map(item => renderMenuItem(item, true))}
//     </div>
//   </div>
// )}

//       </aside>
//     </>
//   );
// };

// export default SidebarComponent;

// import { useState, useEffect } from 'react';
// import {
//   Button,
//   Divider,
//   Chip,
//   Badge
// } from '@heroui/react';
// import { ChevronRight, Bell, Menu, X } from 'lucide-react';
// import { bottomMenuItems, categoryLabels, menuItems, getDynamicBadges } from '@/utils/sidebarUtils/sidebarUtils';
// import { MenuItem, SidebarProps } from '@/types/sidebarTypes/sidebarTypes';
// import { Link } from 'react-router-dom';
// import { useAppSelector } from '@/store/store';
// import { selectUserRole } from '@/store/slice/authSlice';

// const SidebarComponent = ({
//   activeMenuItem,
//   onMenuItemClick,
//   onMobileClose,
//   isMobileOpen,
//   className,
// }: SidebarProps & { userRole?: string }) => {
//   const userRole = useAppSelector(selectUserRole);
//   const [isMobile, setIsMobile] = useState(false);
//   const [badges, setBadges] = useState<Record<string, string>>({});
//   const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
//   const [hovering, setHovering] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       setSidebarOpen(!mobile);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     const dynamicBadges = getDynamicBadges();
//     setBadges(dynamicBadges);
//   }, []);

//   const handleMenuClick = (key: string) => {
//     onMenuItemClick?.(key);
//     if (isMobile) {
//       setSidebarOpen(false);
//       onMobileClose?.();
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//     if (isMobile && sidebarOpen) {
//       onMobileClose?.();
//     }
//   };

//   const sidebarWidth = sidebarOpen ? 'w-64' : 'w-20';
//   const sidebarTranslate = isMobile 
//     ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
//     : 'translate-x-0';

//   const sidebarClasses = `
//     fixed top-16 left-0 h-[calc(100vh-4rem)]
//     ${sidebarWidth}
//     ${sidebarTranslate}
//     bg-primarys-800/95 backdrop-blur-xl border-r border-primarys-700/50
//     transition-all duration-300 ease-in-out
//     shadow-2xl lg:shadow-xl
//     z-30 flex flex-col
//     ${className}
//     ${!sidebarOpen && 'overflow-hidden'}
//     ${!sidebarOpen && hovering && 'w-64'}
//   `;

//   const renderMenuItem = (item: MenuItem, isBottom = false) => {
//     const IconComponent = item.icon;
//     const isActive = activeMenuItem === item.key;
//     const dynamicBadge = badges[item.key] || item.badge;

//     return (
//       <Button
//         key={item.key}
//         as={Link}
//         to={item.href}
//         variant="light"
//         className={`
//           w-full h-12 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} mb-2 justify-start group rounded-xl
//           ${isActive ? 
//             'bg-accents-500/20 text-accents-400 font-semibold shadow-lg border-l-4 border-accents-400 backdrop-blur-sm' : 
//             'text-primarys-200 hover:bg-primarys-700/60 hover:text-white hover:shadow-md'
//           }
//           transition-all duration-300 ease-in-out
//           ${!isBottom && sidebarOpen ? 'hover:translate-x-2 hover:scale-105' : 'hover:translate-x-1'}
//           backdrop-blur-sm
//         `}
//         startContent={
//           <div className={`flex-shrink-0 transition-all duration-300 ${
//             isActive ? 'scale-110 text-accents-400' : 'group-hover:scale-110 group-hover:text-accents-300'
//           }`}>
//             <IconComponent size={20} />
//           </div>
//         }
//         endContent={
//           sidebarOpen && (
//             <div className="flex items-center gap-2 ml-auto">
//               {dynamicBadge && (
//                 <Chip 
//                   size="sm" 
//                   color={item.key.includes('activos') || item.key.includes('pendientes') ? "warning" : "danger"} 
//                   variant="solid"
//                   className="animate-pulse shadow-sm"
//                 >
//                   {dynamicBadge}
//                 </Chip>
//               )}
//               {isActive && !isBottom && (
//                 <ChevronRight 
//                   size={16} 
//                   className="flex-shrink-0 animate-pulse text-accents-400" 
//                 />
//               )}
//             </div>
//           )
//         }
//         onPress={() => handleMenuClick(item.key)}
//       >
//         {sidebarOpen && (
//           <span className="flex-1 text-left truncate font-medium">
//             {item.label}
//           </span>
//         )}
//       </Button>
//     );
//   };

//   const filteredMenuItems = userRole === 'admin' ? menuItems : 
//     menuItems.filter(item => !['usuarios', 'empresas'].includes(item.key));

//   const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
//     const category = item.category || 'other';
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(item);
//     return acc;
//   }, {} as Record<string, MenuItem[]>);

//   const categoryOrder = ['main', 'inventario', 'prestamos', 'movimientos', 'reportes'];
//   const orderedCategories = categoryOrder.filter(cat => groupedMenuItems[cat]);

//   return (
//     <>
//       {/* Overlay para móvil */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-primarys-900/40 backdrop-blur-sm z-20 transition-all duration-300"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside 
//         className={sidebarClasses}
//         onMouseEnter={() => !sidebarOpen && !isMobile && setHovering(true)}
//         onMouseLeave={() => !sidebarOpen && !isMobile && setHovering(false)}
//       >
//         {/* Header del Sidebar con botón de toggle */}
//         <div className="p-4 border-b border-primarys-700/50 bg-primarys-800/50 backdrop-blur-md flex items-center justify-between">
//           {sidebarOpen ? (
//             <>
//               <div className="flex flex-col flex-1">
//                 <h2 className="text-sm font-bold text-white">Sistema de Inventario</h2>
//                 <span className="text-xs text-primarys-300">Panel de Control</span>
//               </div>
//               <Button 
//                 isIconOnly 
//                 size="sm" 
//                 variant="light" 
//                 className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
//                 onPress={toggleSidebar}
//               >
//                 <X size={16} />
//               </Button>
//             </>
//           ) : (
//             <div className="w-full flex justify-center">
//               <Button 
//                 isIconOnly 
//                 size="sm" 
//                 variant="light" 
//                 className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
//                 onPress={toggleSidebar}
//               >
//                 <Menu size={16} />
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Notificaciones - versión compacta */}
//         {!sidebarOpen && !hovering && (
//           <div className="p-2 flex justify-center">
//             <Badge content="3" color="danger" size="sm" className="animate-pulse">
//               <Button 
//                 isIconOnly 
//                 size="sm" 
//                 variant="light" 
//                 className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
//               >
//                 <Bell size={16} />
//               </Button>
//             </Badge>
//           </div>
//         )}

//         {/* Navigation Menu */}
//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
//           {orderedCategories.map((category, index) => {
//             const items = groupedMenuItems[category];
//             return (
//               <div key={category} className="mb-6">
//                 {sidebarOpen && (
//                   <div className="px-3 mb-3">
//                     <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
//                       {categoryLabels[category as keyof typeof categoryLabels] || category}
//                     </p>
//                   </div>
//                 )}
//                 <div className="space-y-1">
//                   {items.map(item => renderMenuItem(item))}
//                 </div>
//                 {sidebarOpen && index < orderedCategories.length - 1 && (
//                   <Divider className="my-4 bg-primarys-700/50" />
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         {/* Bottom Menu - Solo para administradores */}
//         {userRole && ['admin', 'super_admin'].includes(userRole) && (
//           <div className="p-4 border-t border-primarys-700/50 bg-primarys-800/30 backdrop-blur-md">
//             {sidebarOpen && (
//               <div className="px-3 mb-3">
//                 <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
//                   Administración
//                 </p>
//               </div>
//             )}
//             <div className="space-y-1">
//               {bottomMenuItems
//                 .filter(item => !item.rolesPermitidos || item.rolesPermitidos.includes(userRole))
//                 .map(item => renderMenuItem(item, true))}
//             </div>
//           </div>
//         )}
//       </aside>
//     </>
//   );
// };

// export default SidebarComponent;

// import { useState, useEffect } from 'react';
// import {
//   Button,
//   Divider,
//   Chip,
//   Badge
// } from '@heroui/react';
// import { ChevronRight, Bell, Menu, X } from 'lucide-react';
// import { bottomMenuItems, categoryLabels, menuItems, getDynamicBadges } from '@/utils/sidebarUtils/sidebarUtils';
// import { MenuItem, SidebarProps } from '@/types/sidebarTypes/sidebarTypes';
// import { Link, useLocation } from 'react-router-dom';
// import { useAppSelector } from '@/store/store';
// import { selectUserRole } from '@/store/slice/authSlice';

// const SidebarComponent = ({
//   activeMenuItem,
//   onMenuItemClick,
//   onMobileClose,
//   isMobileOpen,
//   className,
// }: SidebarProps) => {
//   const userRole = useAppSelector(selectUserRole);
//   const location = useLocation();
//   const [isMobile, setIsMobile] = useState(false);
//   const [badges, setBadges] = useState<Record<string, string>>({});
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       setSidebarOpen(!mobile);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     const dynamicBadges = getDynamicBadges();
//     setBadges(dynamicBadges);
//   }, []);

//   // Función para determinar si un item está activo basado en la URL actual
//   const isMenuItemActive = (item: MenuItem) => {
//     if (activeMenuItem && activeMenuItem === item.key) {
//       return true;
//     }
    
//     // Fallback: usar la URL actual para determinar el item activo
//     const currentPath = location.pathname;
    
//     // Coincidencia exacta
//     if (currentPath === item.href) {
//       return true;
//     }
    
//     // Coincidencia parcial para rutas anidadas
//     if (currentPath.startsWith(item.href) && item.href !== '/') {
//       return true;
//     }
    
//     // Casos especiales para rutas que pueden tener variaciones
//     if (item.key === 'dashboard' && (currentPath === '/home' || currentPath === '/')) {
//       return true;
//     }
    
//     return false;
//   };

//   const handleMenuClick = (key: string) => {
//     // Actualizar inmediatamente el estado local si es necesario
//     onMenuItemClick?.(key);
    
//     if (isMobile) {
//       setSidebarOpen(false);
//       onMobileClose?.();
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//     if (isMobile && sidebarOpen) {
//       onMobileClose?.();
//     }
//   };

//   const sidebarWidth = sidebarOpen ? 'w-64' : 'w-20';
//   const sidebarTranslate = isMobile 
//     ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
//     : 'translate-x-0';

//   const sidebarClasses = `
//     fixed top-16 left-0 h-[calc(100vh-4rem)]
//     ${sidebarWidth}
//     ${sidebarTranslate}
//     bg-primarys-800/95 backdrop-blur-xl border-r border-primarys-700/50
//     transition-all duration-300 ease-in-out
//     shadow-2xl lg:shadow-xl
//     z-30 flex flex-col
//     ${className || ''}
//     ${!sidebarOpen ? 'overflow-hidden' : ''}
//   `;

//   const renderMenuItem = (item: MenuItem, isBottom = false) => {
//     const IconComponent = item.icon;
//     const isActive = isMenuItemActive(item);
//     const dynamicBadge = badges[item.key] || item.badge;

//     return (
//       <Button
//         key={item.key}
//         as={Link}
//         to={item.href}
//         variant="light"
//         className={`
//           w-full ${sidebarOpen ? 'h-12 px-4' : 'h-10 px-2 justify-center'} mb-2 justify-start group rounded-xl
//           ${isActive ? 
//             'bg-accents-500/20 text-accents-400 font-semibold shadow-lg border-l-4 border-accents-400 backdrop-blur-sm' : 
//             'text-primarys-200 hover:bg-primarys-700/60 hover:text-white hover:shadow-md'
//           }
//           transition-all duration-200 ease-in-out
//           ${!isBottom && sidebarOpen ? 'hover:translate-x-2 hover:scale-105' : 'hover:translate-x-1'}
//           backdrop-blur-sm
//         `}
//         startContent={
//           <div className={`flex-shrink-0 transition-all duration-200 ${
//             isActive ? 'scale-110 text-accents-400' : 'group-hover:scale-110 group-hover:text-accents-300'
//           }`}>
//             <IconComponent size={20} />
//           </div>
//         }
//         endContent={
//           sidebarOpen && (
//             <div className="flex items-center gap-2 ml-auto">
//               {dynamicBadge && (
//                 <Chip 
//                   size="sm" 
//                   color={item.key.includes('activos') || item.key.includes('pendientes') ? "warning" : "danger"} 
//                   variant="solid"
//                   className="animate-pulse shadow-sm"
//                 >
//                   {dynamicBadge}
//                 </Chip>
//               )}
//               {isActive && !isBottom && (
//                 <ChevronRight 
//                   size={16} 
//                   className="flex-shrink-0 animate-pulse text-accents-400" 
//                 />
//               )}
//             </div>
//           )
//         }
//         onPress={() => handleMenuClick(item.key)}
//       >
//         {sidebarOpen && (
//           <span className="flex-1 text-left truncate font-medium">
//             {item.label}
//           </span>
//         )}
//       </Button>
//     );
//   };

//   const filteredMenuItems = userRole === 'admin' ? menuItems : 
//     menuItems.filter(item => !['usuarios', 'empresas'].includes(item.key));

//   const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
//     const category = item.category || 'other';
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(item);
//     return acc;
//   }, {} as Record<string, MenuItem[]>);

//   const categoryOrder = ['main', 'inventario', 'prestamos', 'movimientos', 'reportes'];
//   const orderedCategories = categoryOrder.filter(cat => groupedMenuItems[cat]);

//   return (
//     <>
//       {/* Overlay para móvil */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-primarys-900/40 backdrop-blur-sm z-20 transition-all duration-300"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={sidebarClasses}>
//         {/* Header del Sidebar con botón de toggle */}
//         <div className="p-4 border-b border-primarys-700/50 bg-primarys-800/50 backdrop-blur-md flex items-center">
//           {sidebarOpen ? (
//             <>
//               <div className="flex flex-col flex-1">
//                 <h2 className="text-sm font-bold text-white">Sistema de Inventario</h2>
//                 <span className="text-xs text-primarys-300">Panel de Control</span>
//               </div>
//               <Button 
//                 isIconOnly 
//                 size="sm" 
//                 variant="light" 
//                 className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
//                 onPress={toggleSidebar}
//               >
//                 <X size={16} />
//               </Button>
//             </>
//           ) : (
//             <div className="w-full flex justify-center">
//               <Button 
//                 isIconOnly 
//                 size="sm" 
//                 variant="light" 
//                 className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
//                 onPress={toggleSidebar}
//               >
//                 <Menu size={16} />
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Notificaciones - siempre visibles */}
//         <div className={`px-4 py-2 border-b border-primarys-700/50 ${sidebarOpen ? 'flex justify-end' : 'flex justify-center'}`}>
//           <Badge content="3" color="danger" size="sm" className="animate-pulse">
//             <Button 
//               isIconOnly 
//               size="sm" 
//               variant="light" 
//               className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
//             >
//               <Bell size={16} />
//             </Button>
//           </Badge>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
//           {orderedCategories.map((category, index) => {
//             const items = groupedMenuItems[category];
//             return (
//               <div key={category} className="mb-6">
//                 {/* Solo mostrar títulos de categorías cuando el sidebar está abierto */}
//                 {sidebarOpen && (
//                   <div className="px-3 mb-3">
//                     <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
//                       {categoryLabels[category as keyof typeof categoryLabels] || category}
//                     </p>
//                   </div>
//                 )}
//                 <div className="space-y-1">
//                   {items.map(item => renderMenuItem(item))}
//                 </div>
//                 {/* Solo mostrar divisores cuando el sidebar está abierto */}
//                 {sidebarOpen && index < orderedCategories.length - 1 && (
//                   <Divider className="my-4 bg-primarys-700/50" />
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         {/* Bottom Menu - Solo para administradores */}
//         {userRole && ['admin', 'super_admin'].includes(userRole) && (
//           <div className="p-4 border-t border-primarys-700/50 bg-primarys-800/30 backdrop-blur-md">
//             {/* Solo mostrar título de Administración cuando el sidebar está abierto */}
//             {sidebarOpen && (
//               <div className="px-3 mb-3">
//                 <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
//                   Administración
//                 </p>
//               </div>
//             )}
//             <div className="space-y-1">
//               {bottomMenuItems
//                 .filter(item => !item.rolesPermitidos || item.rolesPermitidos.includes(userRole))
//                 .map(item => renderMenuItem(item, true))}
//             </div>
//           </div>
//         )}
//       </aside>
//     </>
//   );
// };

// export default SidebarComponent;

import { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Chip,
  Badge
} from '@heroui/react';
import { ChevronRight, Bell, Menu, X } from 'lucide-react';
import { bottomMenuItems, categoryLabels, menuItems, getDynamicBadges } from '@/utils/sidebarUtils/sidebarUtils';
import { MenuItem, SidebarProps } from '@/types/sidebarTypes/sidebarTypes';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/store';
import { selectUserRole } from '@/store/slice/authSlice';

const SidebarComponent = ({
  activeMenuItem,
  onMenuItemClick,
  onMobileClose,
  isMobileOpen,
}: SidebarProps) => {
  const userRole = useAppSelector(selectUserRole);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [badges, setBadges] = useState<Record<string, string>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // En desktop, el sidebar siempre está abierto por defecto
      if (!mobile) {
        setSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const dynamicBadges = getDynamicBadges();
    setBadges(dynamicBadges);
  }, []);

  // Función para determinar si un item está activo basado en la URL actual
  const isMenuItemActive = (item: MenuItem) => {
    if (activeMenuItem && activeMenuItem === item.key) {
      return true;
    }
    
    // Fallback: usar la URL actual para determinar el item activo
    const currentPath = location.pathname;
    
    // Coincidencia exacta
    if (currentPath === item.href) {
      return true;
    }
    
    // Coincidencia parcial para rutas anidadas
    if (currentPath.startsWith(item.href) && item.href !== '/') {
      return true;
    }
    
    // Casos especiales para rutas que pueden tener variaciones
    if (item.key === 'dashboard' && (currentPath === '/home' || currentPath === '/')) {
      return true;
    }
    
    return false;
  };

  const handleMenuClick = (key: string) => {
    onMenuItemClick?.(key);
    
    // En móvil, cerrar sidebar después de seleccionar
    if (isMobile) {
      onMobileClose?.();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Determinar el estado del sidebar basado en el contexto
  const shouldShowSidebar = isMobile ? isMobileOpen : true;
  const sidebarWidth = sidebarOpen ? 'w-64' : 'w-20';
  const sidebarTranslate = isMobile 
    ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full')
    : 'translate-x-0';

  const sidebarClasses = `
    fixed top-16 left-0 h-[calc(100vh-4rem)]
    ${sidebarWidth}
    ${sidebarTranslate}
    bg-primarys-800/95 backdrop-blur-xl border-r border-primarys-700/50
    transition-all duration-300 ease-in-out
    shadow-2xl lg:shadow-xl
    z-30 flex flex-col
    ${!sidebarOpen ? 'overflow-hidden' : ''}
  `;

  const renderMenuItem = (item: MenuItem, isBottom = false) => {
    const IconComponent = item.icon;
    const isActive = isMenuItemActive(item);
    const dynamicBadge = badges[item.key] || item.badge;

    return (
      <Button
        key={item.key}
        as={Link}
        to={item.href}
        variant="light"
        className={`
          w-full ${sidebarOpen ? 'h-12 px-4' : 'h-10 px-2 justify-center'} mb-2 justify-start group rounded-xl
          ${isActive ? 
            'bg-accents-500/20 text-accents-400 font-semibold shadow-lg border-l-4 border-accents-400 backdrop-blur-sm' : 
            'text-primarys-200 hover:bg-primarys-700/60 hover:text-white hover:shadow-md'
          }
          transition-all duration-200 ease-in-out
          ${!isBottom && sidebarOpen ? 'hover:translate-x-2 hover:scale-105' : 'hover:translate-x-1'}
          backdrop-blur-sm
        `}
        startContent={
          <div className={`flex-shrink-0 transition-all duration-200 ${
            isActive ? 'scale-110 text-accents-400' : 'group-hover:scale-110 group-hover:text-accents-300'
          }`}>
            <IconComponent size={20} />
          </div>
        }
        endContent={
          sidebarOpen && (
            <div className="flex items-center gap-2 ml-auto">
              {dynamicBadge && (
                <Chip 
                  size="sm" 
                  color={item.key.includes('activos') || item.key.includes('pendientes') ? "warning" : "danger"} 
                  variant="solid"
                  className="animate-pulse shadow-sm"
                >
                  {dynamicBadge}
                </Chip>
              )}
              {isActive && !isBottom && (
                <ChevronRight 
                  size={16} 
                  className="flex-shrink-0 animate-pulse text-accents-400" 
                />
              )}
            </div>
          )
        }
        onPress={() => handleMenuClick(item.key)}
      >
        {sidebarOpen && (
          <span className="flex-1 text-left truncate font-medium">
            {item.label}
          </span>
        )}
      </Button>
    );
  };

  const filteredMenuItems = userRole === 'admin' ? menuItems : 
    menuItems.filter(item => !['usuarios', 'empresas'].includes(item.key));

  const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const categoryOrder = ['main', 'inventario', 'prestamos', 'movimientos', 'reportes'];
  const orderedCategories = categoryOrder.filter(cat => groupedMenuItems[cat]);

  if (!shouldShowSidebar) {
    return null;
  }

  return (
    <aside className={sidebarClasses}>
      {/* Header del Sidebar con botón de toggle */}
      <div className="p-4 border-b border-primarys-700/50 bg-primarys-800/50 backdrop-blur-md flex items-center">
        {sidebarOpen ? (
          <>
            <div className="flex flex-col flex-1">
              <h2 className="text-sm font-bold text-white">Sistema de Inventario</h2>
              <span className="text-xs text-primarys-300">Panel de Control</span>
            </div>
            {!isMobile && (
              <Button 
                isIconOnly 
                size="sm" 
                variant="light" 
                className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
                onPress={toggleSidebar}
              >
                <X size={16} />
              </Button>
            )}
          </>
        ) : (
          <div className="w-full flex justify-center">
            <Button 
              isIconOnly 
              size="sm" 
              variant="light" 
              className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
              onPress={toggleSidebar}
            >
              <Menu size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* Notificaciones - siempre visibles */}
      <div className={`px-4 py-2 border-b border-primarys-700/50 ${sidebarOpen ? 'flex justify-end' : 'flex justify-center'}`}>
        <Badge content="3" color="danger" size="sm" className="animate-pulse">
          <Button 
            isIconOnly 
            size="sm" 
            variant="light" 
            className="text-primarys-300 hover:text-accents-400 hover:bg-primarys-700/50 transition-all duration-200"
          >
            <Bell size={16} />
          </Button>
        </Badge>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {orderedCategories.map((category, index) => {
          const items = groupedMenuItems[category];
          return (
            <div key={category} className="mb-6">
              {/* Solo mostrar títulos de categorías cuando el sidebar está abierto */}
              {sidebarOpen && (
                <div className="px-3 mb-3">
                  <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
                    {categoryLabels[category as keyof typeof categoryLabels] || category}
                  </p>
                </div>
              )}
              <div className="space-y-1">
                {items.map(item => renderMenuItem(item))}
              </div>
              {/* Solo mostrar divisores cuando el sidebar está abierto */}
              {sidebarOpen && index < orderedCategories.length - 1 && (
                <Divider className="my-4 bg-primarys-700/50" />
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Menu - Solo para administradores */}
      {userRole && ['admin', 'super_admin'].includes(userRole) && (
        <div className="p-4 border-t border-primarys-700/50 bg-primarys-800/30 backdrop-blur-md">
          {/* Solo mostrar título de Administración cuando el sidebar está abierto */}
          {sidebarOpen && (
            <div className="px-3 mb-3">
              <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
                Administración
              </p>
            </div>
          )}
          <div className="space-y-1">
            {bottomMenuItems
              .filter(item => !item.rolesPermitidos || item.rolesPermitidos.includes(userRole))
              .map(item => renderMenuItem(item, true))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default SidebarComponent;