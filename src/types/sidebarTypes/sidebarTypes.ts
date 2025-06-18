import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string;
  category?: string;
  badge?: string;
  permission?: string; // Para control de permisos
  children?: MenuItem[]; // Para submenús futuros
}

export interface SidebarProps {
  activeMenuItem?: string;
  onMenuItemClick?: (key: string) => void;
  onMobileClose?: () => void;
  isMobileOpen?: boolean;
  className?: string;
  userRole?: 'admin' | 'user' | 'viewer'; // Roles de usuario
}

export interface CategoryLabels {
  main: string;
  inventario: string;
  prestamos: string;
  movimientos: string;
  reportes: string;
  admin: string;
  support: string;
}

export interface DynamicBadges {
  [key: string]: string;
}