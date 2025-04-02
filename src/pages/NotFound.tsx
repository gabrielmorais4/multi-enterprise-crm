
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CubeIcon } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <CubeIcon className="h-12 w-12 text-gestao-blue mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-gestao-text mb-6">Página não encontrada</p>
      <Button onClick={() => navigate('/')}>Voltar ao início</Button>
    </div>
  );
};

export default NotFound;
