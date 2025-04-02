
import React, { useState } from 'react';
import { ArrowLeft, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlanCard } from '@/components/ui/plan-card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Sample plan data
const plans = [
  {
    name: 'Básico',
    price: 'Grátis',
    description: 'Para pequenos negócios começando sua jornada.',
    features: [
      { text: 'Até 5 usuários' },
      { text: 'Até 100 produtos' },
      { text: 'Gestão de clientes básica' },
      { text: 'Relatórios simples' },
      { text: 'Suporte por email' },
    ],
  },
  {
    name: 'Standard',
    price: 'R$ 99',
    description: 'Para empresas em crescimento que precisam de mais recursos.',
    features: [
      { text: 'Até 15 usuários' },
      { text: 'Produtos ilimitados' },
      { text: 'Gestão de clientes avançada' },
      { text: 'Automações básicas' },
      { text: 'Relatórios detalhados' },
      { text: 'Suporte prioritário' },
    ],
    recommended: true,
  },
  {
    name: 'Premium',
    price: 'R$ 199',
    description: 'Para empresas estabelecidas que precisam de recursos completos.',
    features: [
      { text: 'Usuários ilimitados' },
      { text: 'Produtos ilimitados' },
      { text: 'Gestão de clientes completa' },
      { text: 'Automações avançadas' },
      { text: 'Dashboard personalizado' },
      { text: 'API completa' },
      { text: 'Suporte 24/7' },
    ],
  },
];

const SelectPlan: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleConfirm = () => {
    if (!selectedPlan) return;
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
      toast("Plano selecionado com sucesso", {
        description: `Você selecionou o plano ${selectedPlan}. Bem-vindo ao GestãoPro!`
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Box className="h-6 w-6 text-gestao-blue" />
            <span className="font-bold text-xl">GestãoPro</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/create-company')} 
            className="mb-6"
          >
            <ArrowLeft size={18} className="mr-2" /> Voltar
          </Button>

          <h1 className="text-2xl font-bold mb-1">Escolha um plano</h1>
          <p className="text-gestao-text mb-8">
            Selecione o plano mais adequado às necessidades da sua empresa
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <PlanCard
                key={plan.name}
                {...plan}
                onClick={() => handleSelectPlan(plan.name)}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedPlan || isLoading} 
              size="lg"
            >
              {isLoading ? 'Processando...' : 'Confirmar e continuar'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectPlan;
