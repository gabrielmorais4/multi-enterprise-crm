
import React, { useState } from 'react';
import { Plus, Search, Box, Settings, Bell, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CompanyCard } from '@/components/ui/company-card';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Sample company data
const mockCompanies = [
  { id: '1', name: 'Empresa ABC', plan: 'Premium', users: 12, products: 156 },
  { id: '2', name: 'Indústria XYZ', plan: 'Básico', users: 5, products: 43 },
  { id: '3', name: 'Comércio 123', plan: 'Standard', users: 8, products: 78 },
];

const SelectCompany: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedCompany) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Box className="h-6 w-6 text-gestao-blue" />
            <span className="font-bold text-xl">GestãoPro</span>
          </div>
          
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notificações</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gestao-blue text-white text-sm">JD</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 font-medium text-sm hidden sm:inline-block">João da Silva</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate('/user-profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600"
                  onClick={() => {
                    toast.success("Logout realizado com sucesso");
                    navigate('/login');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-1">
            <h1 className="text-2xl font-bold">Suas empresas</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/settings/subscriptions')}
              className="text-gestao-text"
            >
              <Settings className="h-4 w-4 mr-2" />
              Gerenciar assinaturas
            </Button>
          </div>
          <p className="text-gestao-text mb-8">
            Escolha a empresa que deseja gerenciar ou crie uma nova
          </p>

          <div className="flex mb-6 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar empresas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => navigate('/create-company')}>
              <Plus size={18} className="mr-2" /> Nova Empresa
            </Button>
          </div>

          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
              <p className="text-gray-500">Nenhuma empresa encontrada</p>
              <Button variant="link" onClick={() => setSearchTerm('')}>
                Limpar pesquisa
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  {...company}
                  isSelected={selectedCompany === company.id}
                  onClick={() => setSelectedCompany(company.id)}
                />
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              onClick={handleContinue} 
              disabled={!selectedCompany} 
              size="lg"
            >
              Continuar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectCompany;
