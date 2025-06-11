import { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Chip,
  Badge
} from '@heroui/react';
import { ChevronRight, Bell } from 'lucide-react';
import { bottomMenuItems, categoryLabels, menuItems, getDynamicBadges } from '@/utils/sidebarUtils/sidebarUtils';
import { MenuItem, SidebarProps } from '@/types/sidebarTypes/sidebarTypes';
import { Link } from 'react-router-dom';

const SidebarComponent = ({
  activeMenuItem,
  onMenuItemClick,
  onMobileClose,
  isMobileOpen,
  className,
  userRole = 'admin' // Prop para controlar permisos
}: SidebarProps & { userRole?: string }) => {
  
  const [isMobile, setIsMobile] = useState(false);
  const [badges, setBadges] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulación de carga de badges dinámicos
  useEffect(() => {
    const dynamicBadges = getDynamicBadges();
    setBadges(dynamicBadges);
  }, []);

  const handleMenuClick = (key: string) => {
    onMenuItemClick?.(key);
    if (isMobile) {
      onMobileClose?.();
    }
  };

  const sidebarClasses = `
    fixed top-16 left-0 h-[calc(100vh-4rem)] w-64
    ${isMobile && !isMobileOpen ? '-translate-x-full' : 'translate-x-0'}
    bg-primarys-800/95 backdrop-blur-xl border-r border-primarys-700/50
    transition-all duration-300 ease-in-out
    shadow-2xl lg:shadow-xl
    z-30 flex flex-col
    ${className}
  `;

  const renderMenuItem = (item: MenuItem, isBottom = false) => {
    const IconComponent = item.icon;
    const isActive = activeMenuItem === item.key;
    const dynamicBadge = badges[item.key] || item.badge;

    return (
      <Button
        key={item.key}
        as={Link}
        to={item.href}
        variant="light"
        className={`
          w-full h-12 px-4 mb-2 justify-start group rounded-xl
          ${isActive ? 
            'bg-accents-500/20 text-accents-400 font-semibold shadow-lg border-l-4 border-accents-400 backdrop-blur-sm' : 
            'text-primarys-200 hover:bg-primarys-700/60 hover:text-white hover:shadow-md'
          }
          transition-all duration-300 ease-in-out
          ${!isBottom ? 'hover:translate-x-2 hover:scale-105' : 'hover:translate-x-1'}
          backdrop-blur-sm
        `}
        startContent={
          <div className={`flex-shrink-0 transition-all duration-300 ${
            isActive ? 'scale-110 text-accents-400' : 'group-hover:scale-110 group-hover:text-accents-300'
          }`}>
            <IconComponent size={20} />
          </div>
        }
        endContent={
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
        }
        onPress={() => {
          handleMenuClick(item.key);
          if (isMobile) {
            onMobileClose?.();
          }
        }}
      >
        <span className="flex-1 text-left truncate font-medium">
          {item.label}
        </span>
      </Button>
    );
  };

  // Filtrar menús según permisos (opcional)
  const filteredMenuItems = userRole === 'admin' ? menuItems : 
    menuItems.filter(item => !['usuarios', 'empresas'].includes(item.key));

  const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Orden específico de categorías
  const categoryOrder = ['main', 'inventario', 'prestamos', 'movimientos', 'reportes'];
  const orderedCategories = categoryOrder.filter(cat => groupedMenuItems[cat]);

  return (
    <>
      {/* Overlay para móvil - Mejorado */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-primarys-900/40 backdrop-blur-sm z-20 transition-all duration-300"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar - Fondo oscuro elegante */}
      <aside className={sidebarClasses}>
        {/* Header del Sidebar - Mejorado */}
        <div className="p-4 border-b border-primarys-700/50 bg-primarys-800/50 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-white">Sistema de Inventario</h2>
              <span className="text-xs text-primarys-300">Panel de Control</span>
            </div>
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
        </div>

        {/* Navigation Menu - Mejorado */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          {orderedCategories.map((category, index) => {
            const items = groupedMenuItems[category];
            return (
              <div key={category} className="mb-6">
                <div className="px-3 mb-3">
                  <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
                    {categoryLabels[category as keyof typeof categoryLabels] || category}
                  </p>
                </div>
                <div className="space-y-1">
                  {items.map(item => renderMenuItem(item))}
                </div>
                {index < orderedCategories.length - 1 && (
                  <Divider className="my-4 bg-primarys-700/50" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Menu - Solo para administradores - Mejorado */}
        {userRole === 'admin' && (
          <div className="p-4 border-t border-primarys-700/50 bg-primarys-800/30 backdrop-blur-md">
            <div className="px-3 mb-3">
              <p className="text-xs font-bold text-primarys-400 uppercase tracking-widest">
                Administración
              </p>
            </div>
            <div className="space-y-1">
              {bottomMenuItems.map(item => renderMenuItem(item, true))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SidebarComponent;