
import React, { useState } from 'react';
import { Box, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, ShieldAlert } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.search.split('token=')[1] || 'demo-token';

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      toast.error("Senha muito curta", {
        description: "A senha deve ter pelo menos 8 caracteres."
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem", {
        description: "Por favor, verifique e tente novamente."
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setResetComplete(true);
      toast.success("Senha redefinida com sucesso", {
        description: "Sua nova senha foi configurada."
      });
    }, 1500);
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const validatePassword = () => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return { hasMinLength, hasUpperCase, hasNumber };
  };

  const validation = validatePassword();
  const isValidPassword = Object.values(validation).every(Boolean);

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
            Redefinição de senha
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
                <CardTitle>
                  {resetComplete ? 'Senha redefinida' : 'Criar nova senha'}
                </CardTitle>
                <CardDescription>
                  {resetComplete 
                    ? 'Sua senha foi alterada com sucesso'
                    : 'Crie uma nova senha para sua conta'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          {resetComplete ? (
            <CardContent className="space-y-6 pt-4">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Senha redefinida com sucesso</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Você já pode usar sua nova senha para acessar sua conta.
                  </p>
                </div>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="password">
                    Nova senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-1 flex-1 rounded-full ${validation.hasMinLength ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${validation.hasUpperCase ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${validation.hasNumber ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className="flex items-center gap-1">
                        {validation.hasMinLength ? 
                          <CheckCircle className="h-3 w-3 text-green-500" /> : 
                          <ShieldAlert className="h-3 w-3 text-gray-400" />}
                        Mínimo de 8 caracteres
                      </li>
                      <li className="flex items-center gap-1">
                        {validation.hasUpperCase ? 
                          <CheckCircle className="h-3 w-3 text-green-500" /> : 
                          <ShieldAlert className="h-3 w-3 text-gray-400" />}
                        Pelo menos uma letra maiúscula
                      </li>
                      <li className="flex items-center gap-1">
                        {validation.hasNumber ? 
                          <CheckCircle className="h-3 w-3 text-green-500" /> : 
                          <ShieldAlert className="h-3 w-3 text-gray-400" />}
                        Pelo menos um número
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="confirmPassword">
                    Confirmar nova senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 ${
                        confirmPassword && password !== confirmPassword 
                          ? 'border-red-500 focus-visible:ring-red-500' 
                          : ''
                      }`}
                      required
                    />
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">As senhas não coincidem</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={!isValidPassword || password !== confirmPassword || isLoading}
                >
                  {isLoading ? 'Redefinindo senha...' : 'Redefinir senha'}
                </Button>
              </CardFooter>
            </form>
          )}
          
          {resetComplete && (
            <CardFooter className="flex flex-col space-y-4">
              <Button onClick={handleGoToLogin} className="w-full">
                Ir para o login
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
