
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  UserCog, 
  ShoppingCart, 
  BarChart, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-6 py-3 hover:bg-gestao-navy transition-colors",
        active && "bg-gestao-navy border-l-4 border-gestao-lightblue"
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-gray-100">{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-gestao-darkblue w-64 min-h-screen flex flex-col">
      <Logo />
      
      <nav className="mt-8 flex-1">
        <SidebarLink 
          to="/dashboard" 
          icon={<LayoutDashboard className="text-gray-300" />} 
          label="Dashboard" 
          active={isActive('/dashboard')}
        />
        <SidebarLink 
          to="/clientes" 
          icon={<Users className="text-gray-300" />} 
          label="Clientes" 
          active={isActive('/clientes')}
        />
        <SidebarLink 
          to="/produtos" 
          icon={<Package className="text-gray-300" />} 
          label="Produtos" 
          active={isActive('/produtos')}
        />
        <SidebarLink 
          to="/equipe" 
          icon={<UserCog className="text-gray-300" />} 
          label="Equipe" 
          active={isActive('/equipe')}
        />
        <SidebarLink 
          to="/pedidos" 
          icon={<ShoppingCart className="text-gray-300" />} 
          label="Pedidos" 
          active={isActive('/pedidos')}
        />
        <SidebarLink 
          to="/relatorios" 
          icon={<BarChart className="text-gray-300" />} 
          label="Relatórios" 
          active={isActive('/relatorios')}
        />
        <SidebarLink 
          to="/configuracoes" 
          icon={<Settings className="text-gray-300" />} 
          label="Configurações" 
          active={isActive('/configuracoes')}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
