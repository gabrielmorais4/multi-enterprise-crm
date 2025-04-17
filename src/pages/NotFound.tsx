
import React from 'react';
import { Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Box className="h-12 w-12 text-gestao-blue" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Página não encontrada</h1>
        <p className="text-gestao-text mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button onClick={() => navigate('/')} variant="outline">
            Ir para o início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
