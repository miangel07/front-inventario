import React, { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Button, Link} from '@heroui/react';
import { Navbar } from '@/components/navbar';
import { Menu } from 'lucide-react';
import SidebarComponent from '@/components/defaultComponents/SidebarComponent';
import { menuItems, bottomMenuItems } from '@/utils/sidebarUtils/sidebarUtils';

export default function LayoutDefault({
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
    <div className="min-h-screen bg-primarys-50">
      {/* Navbar Fixed - Con colores de la nueva paleta */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Navbar />
        
        {/* Mobile sidebar toggle button - Mejorado con nueva paleta */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 lg:hidden z-50">
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            size="sm"
            className="text-primarys-600 hover:text-primarys-700 hover:bg-primarys-100 transition-colors duration-200"
          >
            <Menu size={20} />
          </Button>
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

        {/* Main Content Area - Fondo actualizado */}
        <main className={`flex-1 flex flex-col overflow-auto transition-all duration-300 ${
          isMobile ? 'ml-0' : 'lg:ml-64'
        }`}>
          <div className="flex-1 p-6 bg-primarys-50">
            {children}
          </div>

          {/* Footer - Actualizado con nueva paleta */}
          <footer className="bg-white/90 backdrop-blur-lg border-t border-primarys-200 px-6 py-3 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-primarys-600 font-medium">
                © 2025 INVENTARIOS. Todos los derechos reservados.
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link 
                  href="#" 
                  className="text-primarys-500 text-xs hover:text-accents-600 transition-colors duration-200 font-medium"
                >
                  Términos
                </Link>
                <Link 
                  href="#" 
                  className="text-primarys-500 text-xs hover:text-accents-600 transition-colors duration-200 font-medium"
                >
                  Privacidad
                </Link>
                <Link 
                  href="#" 
                  className="text-primarys-500 text-xs hover:text-accents-600 transition-colors duration-200 font-medium"
                >
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