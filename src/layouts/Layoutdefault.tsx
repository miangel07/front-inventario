import React, { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
  Link
} from '@heroui/react';
import { Navbar } from '@/components/navbar';
import { 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
} from 'lucide-react';
import SidebarComponent from '@/components/defaultComponents/SidebarComponent';
import { menuItems, bottomMenuItems } from '@/utils/sidebarUtils/sidebarUtils';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Función mejorada para encontrar el ítem del menú activo
  const findActiveMenuItem = () => {
    const currentPath = location.pathname;
    
    // Buscar primero coincidencia exacta
    const exactMatch = [...menuItems, ...bottomMenuItems].find(item => 
      item.href === currentPath
    );
    
    if (exactMatch) return exactMatch.key;
    
    // Si no hay coincidencia exacta, buscar coincidencias parciales
    const partialMatch = [...menuItems, ...bottomMenuItems].find(item => {
      // Ignorar la ruta raíz para evitar falsos positivos
      if (item.href === '/') return false;
      
      // Usar matchPath para manejar rutas dinámicas y subrutas
      return matchPath({ path: item.href, end: false }, currentPath);
    });
    
    return partialMatch?.key || 'dashboard'; // Valor por defecto
  };

  // Actualizar el ítem activo cuando cambia la ruta
  useEffect(() => {
    const activeKey = findActiveMenuItem();
    setActiveMenuItem(activeKey);
  }, [location.pathname]);

  const handleMenuItemClick = (key: string) => {
    setActiveMenuItem(key);
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar Fixed */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Navbar />
        
        {/* Mobile sidebar toggle button */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 lg:hidden z-50">
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            size="sm"
            className="text-gray-600"
          >
            <Menu size={20} />
          </Button>
        </div>
        
        {/* User menu */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Badge content="5" color="danger" size="sm">
            <Button isIconOnly variant="light" size="sm" className="text-gray-600">
              <Bell size={18} />
            </Button>
          </Badge>
          
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform hover:scale-105"
                color="primary"
                name="Usuario"
                size="sm"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Conectado como</p>
                <p className="font-semibold">usuario@sistema.com</p>
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Settings size={16} />}>
                Configuración
              </DropdownItem>
              <DropdownItem key="logout" color="danger" startContent={<LogOut size={16} />}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex pt-16 h-screen">
        {/* Sidebar Component */}
        <SidebarComponent
          activeMenuItem={activeMenuItem}
          onMenuItemClick={handleMenuItemClick}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
          className="fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto"
        />

        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col overflow-auto transition-all duration-300 ${
          isMobile ? 'ml-0' : 'lg:ml-64'
        }`}>
          <div className="flex-1 p-6">
            {children}
          </div>

          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                © 2025 INVENTARIOS. Todos los derechos reservados.
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Términos
                </Link>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Privacidad
                </Link>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Soporte
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}