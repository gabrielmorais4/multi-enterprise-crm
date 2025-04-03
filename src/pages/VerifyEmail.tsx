
import React, { useState, useEffect } from 'react';
import { Box, CheckCircle, Mail, AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';

const VerifyEmail: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || "seu.email@exemplo.com";

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerifyCode = () => {
    setIsVerifying(true);
    
    // Simulate verification process (would be an API call in real app)
    setTimeout(() => {
      setIsVerifying(false);
      if (verificationCode === "123456") { // For demo purposes
        setVerificationStatus('success');
        toast.success("Email verificado com sucesso", {
          description: "Sua conta foi ativada."
        });
      } else {
        setVerificationStatus('error');
        toast.error("Código inválido", {
          description: "O código inserido não é válido. Tente novamente."
        });
      }
    }, 1500);
  };

  const handleResendCode = () => {
    toast.info("Código reenviado", {
      description: "Um novo código de verificação foi enviado para seu email."
    });
    setResendCooldown(60); // 60 seconds cooldown
  };

  const handleContinue = () => {
    navigate('/select-company');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gestao-blue/10 to-gestao-gray/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="bg-gestao-blue p-3 rounded-lg inline-flex shadow-lg">
              <Box className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">GestãoPro</h1>
          <p className="text-gestao-text mt-2">
            Verificação de email
          </p>
        </div>

        <Card className="shadow-lg border-gestao-gray/20">
          <CardHeader>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 -ml-2" 
                onClick={() => navigate('/login')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle>Verificar email</CardTitle>
                <CardDescription>
                  Digite o código enviado para {userEmail}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          {verificationStatus === 'success' ? (
            <CardContent className="space-y-6 pt-4">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email verificado</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Sua conta foi verificada com sucesso. Você já pode começar a usar o GestãoPro.
                  </p>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="space-y-6 pt-4">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Mail className="h-6 w-6 text-gestao-blue" />
                </div>
                <p className="text-sm text-gray-600">
                  Enviamos um código de 6 dígitos para o seu email.
                  <br />Digite o código abaixo para verificar sua conta.
                </p>
              </div>
              
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6}
                  value={verificationCode}
                  onChange={(value) => setVerificationCode(value)}
                  disabled={isVerifying}
                  className={verificationStatus === 'error' ? 'border-red-500' : ''}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              {verificationStatus === 'error' && (
                <div className="flex items-center space-x-2 text-red-600 text-sm justify-center">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Código incorreto. Tente novamente.</span>
                </div>
              )}
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Não recebeu o código?{" "}
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-gestao-blue"
                    disabled={resendCooldown > 0}
                    onClick={handleResendCode}
                  >
                    {resendCooldown > 0 ? `Reenviar em ${resendCooldown}s` : 'Reenviar código'}
                  </Button>
                </p>
              </div>
            </CardContent>
          )}
          
          <CardFooter className="flex flex-col space-y-4">
            {verificationStatus === 'success' ? (
              <Button 
                onClick={handleContinue} 
                className="w-full"
              >
                Continuar
              </Button>
            ) : (
              <Button 
                onClick={handleVerifyCode} 
                className="w-full"
                disabled={verificationCode.length !== 6 || isVerifying}
              >
                {isVerifying ? (
                  <>
                    <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
                    Verificando...
                  </>
                ) : 'Verificar código'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
