
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Mail } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [resendingEmail, setResendingEmail] = useState(false);

  useEffect(() => {
    // Simulate checking email verification status
    // In a real application, this would come from your authentication system
    const checkEmailVerification = () => {
      // For demo purposes, randomly set verification status
      // In production, you would check actual verification status
      setIsEmailVerified(false);
    };

    checkEmailVerification();
  }, []);

  const handleResendVerification = () => {
    setResendingEmail(true);
    
    // Simulate sending verification email
    setTimeout(() => {
      setResendingEmail(false);
      toast.success("Email de verificação enviado", {
        description: "Por favor, verifique sua caixa de entrada."
      });
    }, 1500);
  };

  const handleContinue = () => {
    // Navigate to login page when user decides to continue
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gestao-blue/10 to-gestao-gray/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">GestãoPro</h1>
          <p className="text-gestao-text mt-2">
            Gerencie seus clientes e estoque em um só lugar
          </p>
        </div>

        {!isEmailVerified && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <Mail className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Email não verificado</AlertTitle>
            <AlertDescription className="text-amber-700">
              Para acessar todas as funcionalidades do sistema, por favor verifique seu email.
            </AlertDescription>
            <div className="mt-4 flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResendVerification}
                disabled={resendingEmail}
                className="border-amber-400 text-amber-800 hover:bg-amber-100"
              >
                {resendingEmail ? 'Enviando...' : 'Reenviar email de verificação'}
              </Button>
            </div>
          </Alert>
        )}

        <div className="text-center">
          <Button 
            onClick={handleContinue} 
            className="px-8"
          >
            Continuar para login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
