
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  UserCog, 
  ShoppingCart, 
  BarChart, 
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const SidebarLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
}> = ({ to, icon, label, active, hasSubmenu, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center justify-between px-6 py-3 hover:bg-gestao-navy transition-colors",
        active && "bg-gestao-navy border-l-4 border-gestao-lightblue"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5">{icon}</div>
        <span className="text-gray-100">{label}</span>
      </div>
      {hasSubmenu && <ChevronDown className="h-4 w-4 text-gray-400" />}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso");
    navigate('/login');
  };

  return (
    <aside className="bg-gestao-darkblue w-64 min-h-screen flex flex-col">
      <Logo />
      
      <div className="px-6 py-4 flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gestao-lightblue text-white">JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-white font-medium leading-tight">João da Silva</p>
          <p className="text-gray-400 text-xs">Administrador</p>
        </div>
      </div>
      
      <nav className="mt-4 flex-1">
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
        
        <div className="mt-4 pt-4 border-t border-gestao-navy">
          <SidebarLink 
            to="/settings" 
            icon={<Settings className="text-gray-300" />} 
            label="Configurações" 
            active={location.pathname.startsWith('/settings')}
          />
          <SidebarLink 
            to="/select-company" 
            icon={<Building className="text-gray-300" />} 
            label="Mudar Empresa" 
            active={false}
          />
        </div>
      </nav>
      
      <div className="mt-auto border-t border-gestao-navy p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gestao-navy"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sair
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
