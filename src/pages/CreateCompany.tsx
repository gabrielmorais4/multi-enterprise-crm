
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Box, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CompanyInfoStep from '@/components/company/CompanyInfoStep';
import PlanSelectionStep from '@/components/company/PlanSelectionStep';
import AddressesStep from '@/components/company/AddressesStep';
import PaymentStep from '@/components/company/PaymentStep';

// Tipos para formulário e endereço
export type CompanyFormData = {
  name: string;
  tradingName: string;
  sameNameAsCompany: boolean;
  email: string;
  phone: string;
  logo?: File | null;
  description: string;
  addresses: Address[];
  plan: {
    id: string;
    name: string;
    price: number;
    billingCycle: 'monthly' | 'annual';
  } | null;
};

export type Address = {
  id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isMain: boolean;
};

const CreateCompany: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    tradingName: '',
    sameNameAsCompany: false,
    email: '',
    phone: '',
    logo: null,
    description: '',
    addresses: [
      {
        id: '1',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        isMain: true
      }
    ],
    plan: null,
  });
  
  const navigate = useNavigate();

  const handleUpdateFormData = (data: Partial<CompanyFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/select-company');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simular uma requisição para a API
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/select-plan');
      toast("Empresa criada com sucesso", {
        description: "Sua empresa foi criada e está pronta para uso"
      });
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyInfoStep 
            formData={formData} 
            updateFormData={handleUpdateFormData} 
          />
        );
      case 2:
        return (
          <PlanSelectionStep 
            formData={formData} 
            updateFormData={handleUpdateFormData} 
          />
        );
      case 3:
        return (
          <AddressesStep 
            formData={formData} 
            updateFormData={handleUpdateFormData} 
          />
        );
      case 4:
        return (
          <PaymentStep 
            formData={formData} 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center max-w-[1140px]">
          <div className="flex items-center gap-2">
            <Box className="h-6 w-6 text-gestao-blue" />
            <span className="font-bold text-xl">GestãoPro</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1140px]">
        <Button 
          variant="ghost" 
          onClick={handlePrevious} 
          className="mb-6"
        >
          <ArrowLeft size={18} className="mr-2" /> Voltar
        </Button>

        {/* Indicador de progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    currentStep === step 
                      ? "bg-gestao-blue text-white" 
                      : currentStep > step 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 text-gray-600"
                  }`}>
                    {currentStep > step ? <Check size={16} /> : step}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">
                    {step === 1 && "Informações"}
                    {step === 2 && "Plano"}
                    {step === 3 && "Endereços"}
                    {step === 4 && "Pagamento"}
                  </span>
                </div>
                {step < 4 && (
                  <div className={`h-1 w-16 sm:w-24 ${
                    currentStep > step ? "bg-green-500" : "bg-gray-200"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">
            {currentStep === 1 && "Criar nova empresa"}
            {currentStep === 2 && "Escolha um plano"}
            {currentStep === 3 && "Adicione os endereços"}
            {currentStep === 4 && "Finalizar pagamento"}
          </h1>
          <p className="text-gestao-text mb-8">
            {currentStep === 1 && "Informe os dados da sua empresa para começar a usar o sistema"}
            {currentStep === 2 && "Escolha o plano ideal para as necessidades da sua empresa"}
            {currentStep === 3 && "Cadastre os endereços da empresa"}
            {currentStep === 4 && "Efetue o pagamento para concluir o cadastro da empresa"}
          </p>

          <Card className="shadow-sm">
            <div className="p-6">
              {renderStepContent()}
              
              {currentStep !== 4 && (
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                  >
                    Voltar
                  </Button>
                  <Button onClick={handleNext}>
                    Avançar <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateCompany;
