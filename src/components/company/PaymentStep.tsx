
import React, { useState } from 'react';
import { CompanyFormData } from '@/pages/CreateCompany';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, CreditCard, Loader2 } from 'lucide-react';

interface PaymentStepProps {
  formData: CompanyFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ formData, onSubmit, isSubmitting }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Simular pagamento via Stripe
  const handlePayment = () => {
    onSubmit();
    
    // Isso seria substituído pela integração real com Stripe
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (!formData.plan) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gestao-text">Por favor, selecione um plano antes de prosseguir para o pagamento.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-lg mb-3">Resumo do pedido</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Plano:</span>
            <span className="font-medium">{formData.plan.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Cobrança:</span>
            <span>{formData.plan.billingCycle === 'monthly' ? 'Mensal' : 'Anual'}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{formatCurrency(formData.plan.price)}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <CreditCard className="h-6 w-6 text-gestao-blue" />
            <h3 className="font-medium">Pagamento com Cartão de Crédito</h3>
          </div>

          <p className="text-sm text-gestao-text mb-4">
            Este é um demonstrativo. Em uma implementação real, aqui seria integrado o formulário de pagamento do Stripe.
          </p>

          <p className="text-sm text-gestao-text mb-6">
            Ao clicar em "Confirmar Pagamento", sua empresa será criada com o plano selecionado.
          </p>

          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={isSubmitting || paymentSuccess}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : paymentSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Pagamento Confirmado
              </>
            ) : (
              "Confirmar Pagamento"
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="text-xs text-gestao-text text-center">
        Todos os dados são processados com segurança pelo Stripe.
        <br />
        Ao confirmar o pagamento, você concorda com os Termos de Serviço.
      </div>
    </div>
  );
};

export default PaymentStep;
