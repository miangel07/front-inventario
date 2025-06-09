import { useState, useEffect } from 'react';
import {
  Button,
  Divider,
  Chip,
  Avatar
} from '@heroui/react';
import { ChevronRight, LogOut } from 'lucide-react';
import { bottomMenuItems, categoryLabels, menuItems } from '@/utils/sidebarUtils/sidebarUtils';
import { MenuItem, SidebarProps } from '@/types/sidebarTypes/sidebarTypes';
import { Link } from 'react-router-dom';






const SidebarComponent = ({activeMenuItem,onMenuItemClick,onMobileClose,isMobileOpen,className}:SidebarProps) => {
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    bg-white/95 backdrop-blur-md border-r border-gray-200/50
    transition-all duration-300 ease-in-out
    shadow-xl lg:shadow-none
    z-30 flex flex-col
    ${className}
  `;

const renderMenuItem = (item: MenuItem, isBottom = false) => {
  const IconComponent = item.icon;
  const isActive = activeMenuItem === item.key;

  return (
    <Button
      key={item.key}
      as={Link}  // Esto convierte el Button en un Link
      to={item.href}
      variant={isActive ? "flat" : "light"}
      color={isActive ? "primary" : "default"}
      className={`
        w-full h-12 px-3 mb-1 justify-start
        ${isActive ? 'bg-primary-50 text-primary-600 font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-100'}
        transition-all duration-200
      `}
      startContent={
        <div className="flex-shrink-0">
          <IconComponent size={20} />
        </div>
      }
      endContent={
        <div className="flex items-center gap-2 ml-auto">
          {item.badge && (
            <Chip size="sm" color="danger" variant="flat">
              {item.badge}
            </Chip>
          )}
          {isActive && !isBottom && (
            <ChevronRight size={16} className="flex-shrink-0" />
          )}
        </div>
      }
      onPress={() => {
        handleMenuClick(item.key);
        // Cierra el sidebar en móvil si está abierto
        if (isMobile) {
          onMobileClose?.();
        }
      }}
    >
      <span className="flex-1 text-left truncate">
        {item.label}
      </span>
    </Button>
  );
};


  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);



  return (
    <>
      {/* Overlay para móvil */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <div key={category} className="mb-4">
              <div className="px-3 mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </p>
              </div>
              <div className="space-y-1">
                {items.map(item => renderMenuItem(item))}
              </div>
              {category !== 'communication' && <Divider className="my-3" />}
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-3 border-t border-gray-200/50">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              name="Usuario"
              className="flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                Juan Pérez
              </p>
              <p className="text-xs text-gray-500 truncate">
                admin@sistema.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="p-3 border-t border-gray-200/50">
          <div className="space-y-1">
            {bottomMenuItems.map(item => renderMenuItem(item, true))}
          </div>
          
          <Button
            variant="light"
            color="danger"
            className="w-full h-12 px-3 mt-2 text-red-600 hover:bg-red-50 justify-start"
            startContent={
              <div className="flex-shrink-0">
                <LogOut size={20} />
              </div>
            }
          >
            <span className="flex-1 text-left">
              Cerrar Sesión
            </span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default SidebarComponent;