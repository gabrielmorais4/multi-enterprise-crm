
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Cube } from 'lucide-react';
import { useToast } from 'sonner';

const CreateCompany: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [segment, setSegment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const toast = useToast;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim() || !segment.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      navigate('/select-plan');
      toast("Empresa criada com sucesso", {
        description: "Agora selecione um plano adequado para sua empresa"
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cube className="h-6 w-6 text-gestao-blue" />
            <span className="font-bold text-xl">GestãoPro</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/select-company')} 
            className="mb-6"
          >
            <ArrowLeft size={18} className="mr-2" /> Voltar
          </Button>

          <h1 className="text-2xl font-bold mb-1">Criar nova empresa</h1>
          <p className="text-gestao-text mb-8">
            Informe os dados da sua empresa para começar a usar o sistema
          </p>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="companyName">
                    Nome da empresa *
                  </label>
                  <Input
                    id="companyName"
                    placeholder="Ex: Minha Empresa LTDA"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="segment">
                    Segmento de atuação *
                  </label>
                  <Input
                    id="segment"
                    placeholder="Ex: Varejo, E-commerce, Serviços"
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Criando...' : 'Continuar para selecionar plano'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateCompany;
