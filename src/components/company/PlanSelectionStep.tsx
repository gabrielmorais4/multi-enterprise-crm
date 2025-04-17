
import React, { useState } from 'react';
import { CompanyFormData } from '@/pages/CreateCompany';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlanCard, PlanFeature } from '@/components/ui/plan-card';

interface PlanSelectionStepProps {
  formData: CompanyFormData;
  updateFormData: (data: Partial<CompanyFormData>) => void;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
}

const PlanSelectionStep: React.FC<PlanSelectionStepProps> = ({ formData, updateFormData }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    formData.plan?.billingCycle || 'monthly'
  );
  
  const monthlyPlans: Plan[] = [
    {
      id: 'free-monthly',
      name: 'Gratuito',
      price: 0,
      description: 'Para pequenas empresas que estão começando',
      features: [
        { text: '1 usuário' },
        { text: 'Funcionalidades básicas' },
        { text: 'Suporte por e-mail' },
      ]
    },
    {
      id: 'starter-monthly',
      name: 'Iniciante',
      price: 49.90,
      description: 'Ideal para empresas em crescimento',
      features: [
        { text: '3 usuários' },
        { text: 'Todas funcionalidades básicas' },
        { text: 'Suporte por chat' },
        { text: 'Relatórios simples' },
      ],
      recommended: true
    },
    {
      id: 'professional-monthly',
      name: 'Profissional',
      price: 99.90,
      description: 'Para negócios estabelecidos',
      features: [
        { text: '10 usuários' },
        { text: 'Todas funcionalidades do Iniciante' },
        { text: 'Suporte prioritário' },
        { text: 'Relatórios avançados' },
        { text: 'API de integração' },
      ]
    },
    {
      id: 'enterprise-monthly',
      name: 'Empresarial',
      price: 199.90,
      description: 'Para grandes empresas',
      features: [
        { text: 'Usuários ilimitados' },
        { text: 'Todas funcionalidades do Profissional' },
        { text: 'Suporte 24/7' },
        { text: 'Customizações específicas' },
        { text: 'Gerenciador de conta dedicado' },
      ]
    }
  ];

  const annualPlans: Plan[] = [
    {
      id: 'starter-annual',
      name: 'Iniciante Anual',
      price: 479.90,
      description: 'Economize 20% com plano anual',
      features: [
        { text: '3 usuários' },
        { text: 'Todas funcionalidades básicas' },
        { text: 'Suporte por chat' },
        { text: 'Relatórios simples' },
      ]
    },
    {
      id: 'professional-annual',
      name: 'Profissional Anual',
      price: 959.90,
      description: 'Economize 20% com plano anual',
      features: [
        { text: '10 usuários' },
        { text: 'Todas funcionalidades do Iniciante' },
        { text: 'Suporte prioritário' },
        { text: 'Relatórios avançados' },
        { text: 'API de integração' },
      ],
      recommended: true
    },
    {
      id: 'enterprise-annual',
      name: 'Empresarial Anual',
      price: 1919.90,
      description: 'Economize 20% com plano anual',
      features: [
        { text: 'Usuários ilimitados' },
        { text: 'Todas funcionalidades do Profissional' },
        { text: 'Suporte 24/7' },
        { text: 'Customizações específicas' },
        { text: 'Gerenciador de conta dedicado' },
      ]
    }
  ];

  const handleSelectPlan = (plan: Plan) => {
    updateFormData({
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        billingCycle: billingCycle
      }
    });
  };

  const isSelected = (planId: string) => {
    return formData.plan?.id === planId;
  };

  return (
    <div>
      <Tabs 
        defaultValue={billingCycle} 
        className="w-full" 
        onValueChange={(value) => setBillingCycle(value as 'monthly' | 'annual')}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="annual">Anual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monthlyPlans.map((plan) => (
              <div key={plan.id} 
                className={`${isSelected(plan.id) ? 'ring-2 ring-gestao-blue rounded-lg' : ''}`}
              >
                <PlanCard
                  name={plan.name}
                  price={plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                  description={plan.description}
                  features={plan.features}
                  recommended={plan.recommended}
                  onClick={() => handleSelectPlan(plan)}
                />
                {isSelected(plan.id) && (
                  <div className="text-center py-2 text-sm text-gestao-blue font-medium">
                    Plano Selecionado
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="annual" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {annualPlans.map((plan) => (
              <div key={plan.id} 
                className={`${isSelected(plan.id) ? 'ring-2 ring-gestao-blue rounded-lg' : ''}`}
              >
                <PlanCard
                  name={plan.name}
                  price={`R$ ${plan.price.toFixed(2)}`}
                  description={plan.description}
                  features={plan.features}
                  recommended={plan.recommended}
                  onClick={() => handleSelectPlan(plan)}
                />
                {isSelected(plan.id) && (
                  <div className="text-center py-2 text-sm text-gestao-blue font-medium">
                    Plano Selecionado
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanSelectionStep;
