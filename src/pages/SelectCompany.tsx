import React, { useState } from 'react';
import { Plus, Search, CubeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CompanyCard } from '@/components/ui/company-card';
import { useNavigate } from 'react-router-dom';

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
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CubeIcon className="h-6 w-6 text-gestao-blue" />
            <span className="font-bold text-xl">GestãoPro</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">Selecione uma empresa</h1>
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
            <div className="text-center py-12 bg-white rounded-lg border">
              <p className="text-gray-500">Nenhuma empresa encontrada</p>
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
