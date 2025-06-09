import { MenuItem } from '@/types/sidebarTypes/sidebarTypes';
import { 
  Home, 
  BarChart3, 
  Users, 
  FileText, 
  Mail, 
  Calendar,
  Settings,
  HelpCircle,
  Package,
  ShoppingCart
} from 'lucide-react';

export const menuItems: MenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: Home, href: '/home', category: 'main' },
    { key: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics', category: 'main' },
    { key: 'products', label: 'Productos', icon: Package, href: '/products', category: 'inventory' },
    { key: 'orders', label: 'Pedidos', icon: ShoppingCart, href: '/orders', badge: 12, category: 'inventory' },
    { key: 'users', label: 'Usuarios', icon: Users, href: '/users', category: 'management' },
    { key: 'documents', label: 'Documentos', icon: FileText, href: '/documents', category: 'management' },
    { key: 'messages', label: 'Mensajes', icon: Mail, href: '/messages', badge: 3, category: 'communication' },
    { key: 'calendar', label: 'Calendario', icon: Calendar, href: '/calendar', category: 'communication' },
  ];

 export const bottomMenuItems = [
    { key: 'settings', label: 'Configuración', icon: Settings, href: '/settings' },
    { key: 'help', label: 'Ayuda', icon: HelpCircle, href: '/help' },
  ];

  export   const categoryLabels = {
    main: 'Principal',
    inventory: 'Inventario',
    management: 'Gestión',
    communication: 'Comunicación'
  };