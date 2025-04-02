
import React from 'react';
import { Building, Users, Package, Edit, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export interface CompanyCardProps {
  id: string;
  name: string;
  plan: string;
  users: number;
  products: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  id,
  name,
  plan,
  users,
  products,
  isSelected = false,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/dashboard`);
    }
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md",
        isSelected && "border-2 border-gestao-lightblue bg-blue-50"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gestao-blue text-white p-3 rounded-lg">
            <Building size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <Badge variant={plan === 'Premium' ? 'default' : 'outline'} className="mt-1">
              {plan}
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Edit size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/company-settings/${id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar empresa</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/select-plan')}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Gerenciar assinatura</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gestao-text" />
          <span className="text-gestao-text text-sm">{users} usuários</span>
        </div>
        <div className="flex items-center gap-2">
          <Package size={16} className="text-gestao-text" />
          <span className="text-gestao-text text-sm">{products} produtos</span>
        </div>
      </div>
      
      <Button onClick={handleSelect} className="w-full" variant={isSelected ? "default" : "outline"}>
        {isSelected ? "Selecionada" : "Selecionar"}
      </Button>
    </div>
  );
};
