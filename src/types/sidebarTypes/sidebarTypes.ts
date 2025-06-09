import { ComponentType } from 'react';



export interface MenuItem {
  key: string;
  label: string;
  icon: ComponentType<any>;
  href: string;
  badge?: number;
  category?: string;
}

export interface SidebarProps {
  activeMenuItem?: string;
  onMenuItemClick?: (key: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  className?: string;
}