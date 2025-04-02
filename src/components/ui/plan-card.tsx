
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PlanFeature {
  text: string;
}

export interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
  onClick?: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  price,
  description,
  features,
  recommended = false,
  onClick,
}) => {
  return (
    <div 
      className={cn(
        "border rounded-lg overflow-hidden transition-all duration-200",
        recommended 
          ? "border-2 border-gestao-lightblue shadow-md" 
          : "shadow-sm hover:shadow-md"
      )}
    >
      {recommended && (
        <div className="bg-gestao-lightblue text-white py-1 px-4 text-center text-sm font-medium">
          Recomendado
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-bold text-xl">{name}</h3>
        <div className="mt-2 mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Grátis' && <span className="text-gestao-text">/mês</span>}
        </div>
        
        <p className="text-gestao-text mb-6">{description}</p>
        
        <Button 
          onClick={onClick} 
          className="w-full mb-6"
          variant={recommended ? "default" : "outline"}
        >
          Selecionar Plano
        </Button>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="rounded-full bg-gestao-gray p-1 mt-0.5">
                <Check size={14} className="text-gestao-blue" />
              </div>
              <span className="text-sm text-gestao-text">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
