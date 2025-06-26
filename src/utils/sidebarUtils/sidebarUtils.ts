import { 
  Home, 
  Package, 
  ShoppingCart, 
  ArrowLeftRight, 
  Users, 
  Settings, 
  BarChart3,
  Building2,
  Tags,
  Ruler,
  PlusCircle,
  List,
  History,
  AlertCircle,
  FileText,
  Truck,
  PackageCheck,
  HelpCircle,
  Bell
} from 'lucide-react';
import { MenuItem } from '@/types/sidebarTypes/sidebarTypes';

export const menuItems: MenuItem[] = [
  // Dashboard
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/home',
    category: 'main'
  },

  // Módulo de Inventario
  {
    key: 'productos',
    label: 'Productos',
    icon: Package,
    href: '/products',
    category: 'inventario'
  },
  {
    key: 'categorias',
    label: 'Categorías',
    icon: Tags,
    href: '/categories',
    category: 'inventario'
  },
  {
    key: 'bodegas',
    label: 'Bodegas',
    icon: Building2,
    href: '/wineries',
    category: 'inventario'
  },
  {
    key: 'unidades-medida',
    label: 'Unidades de Medida',
    icon: Ruler,
    href: '/unitOfMeasurements',
    category: 'inventario'
  },

  // Módulo de Préstamos
  {
    key: 'nuevo-prestamo',
    label: 'Nuevo Préstamo',
    icon: PlusCircle,
    href: '/prestamos/nuevo',
    category: 'prestamos'
  },
  {
    key: 'prestamos-activos',
    label: 'Préstamos Activos',
    icon: ShoppingCart,
    href: '/prestamos/activos',
    category: 'prestamos',
    badge: '12' // Ejemplo de badge dinámico
  },
  {
    key: 'devoluciones',
    label: 'Devoluciones',
    icon: PackageCheck,
    href: '/prestamos/devoluciones',
    category: 'prestamos'
  },
  {
    key: 'historial-prestamos',
    label: 'Historial de Préstamos',
    icon: History,
    href: '/prestamos/historial',
    category: 'prestamos'
  },

  // Módulo de Movimientos/Traslados
  {
    key: 'nuevo-traslado',
    label: 'Nuevo Traslado',
    icon: Truck,
    href: '/traslados/nuevo',
    category: 'movimientos'
  },
  {
    key: 'traslados-activos',
    label: 'Traslados Pendientes',
    icon: AlertCircle,
    href: '/traslados/pendientes',
    category: 'movimientos'
  },
  {
    key: 'historial-traslados',
    label: 'Historial de Traslados',
    icon: ArrowLeftRight,
    href: '/traslados/historial',
    category: 'movimientos'
  },

  // Módulo de Reportes
  {
    key: 'reportes-inventario',
    label: 'Reporte de Inventario',
    icon: BarChart3,
    href: '/reportes/inventario',
    category: 'reportes'
  },
  {
    key: 'reportes-prestamos',
    label: 'Reporte de Préstamos',
    icon: FileText,
    href: '/reportes/prestamos',
    category: 'reportes'
  },
  {
    key: 'reportes-movimientos',
    label: 'Reporte de Movimientos',
    icon: List,
    href: '/reportes/movimientos',
    category: 'reportes'
  }
];

export const bottomMenuItems: MenuItem[] = [
  {
    key: 'usuarios',
    label: 'Gestión de Usuarios',
    icon: Users,
    // href: '/admin/usuarios',
    href:'/users',
    category: 'admin'
  },
  {
    key: 'configuracion',
    label: 'Configuración',
    icon: Settings,
    href: '/configuracion',
    category: 'admin'
  },
  {
    key: 'ayuda',
    label: 'Ayuda',
    icon: HelpCircle,
    href: '/ayuda',
    category: 'support'
  }
];

export const categoryLabels = {
  main: 'Principal',
  inventario: 'Gestión de Inventario',
  prestamos: 'Gestión de Préstamos',
  movimientos: 'Movimientos y Traslados',
  reportes: 'Reportes y Análisis',
  admin: 'Administración',
  support: 'Soporte'
};

// Función para obtener badges dinámicos (puedes conectar esto a tu API)
export const getDynamicBadges = () => {
  return {
    'prestamos-activos': '12',
    'traslados-activos': '3',
    // Agrega más badges según necesites
  };
};

// Función para verificar permisos de usuario (ejemplo)
export const filterMenuByPermissions = (userRole: string) => {
  const adminOnlyItems = ['usuarios', 'empresas', 'configuracion'];
  
  if (userRole !== 'admin') {
    return menuItems.filter(item => !adminOnlyItems.includes(item.key));
  }
  
  return menuItems;
};