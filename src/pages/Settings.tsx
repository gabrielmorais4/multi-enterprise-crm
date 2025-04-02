
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, CreditCard, BuildingIcon, Users, Lock, Mail, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <MainLayout>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
            <TabsTrigger value="profile" className="justify-start">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Assinaturas
            </TabsTrigger>
            <TabsTrigger value="companies" className="justify-start">
              <BuildingIcon className="mr-2 h-4 w-4" />
              Empresas
            </TabsTrigger>
            <TabsTrigger value="users" className="justify-start">
              <Users className="mr-2 h-4 w-4" />
              Usuários
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>
                  Visualize e atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gestao-blue text-white text-xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h3 className="font-semibold text-lg">João da Silva</h3>
                    <p className="text-gestao-text text-sm">joao.silva@exemplo.com</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Alterar foto
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" defaultValue="João da Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="joao.silva@exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="(11) 98765-4321" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Cargo</Label>
                    <Input id="position" defaultValue="Administrador" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Alterar senha</h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha atual</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input id="currentPassword" type="password" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input id="newPassword" type="password" className="pl-10" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Notificações</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifs">Notificações por email</Label>
                      <p className="text-sm text-gestao-text">Receber atualizações e alertas por email</p>
                    </div>
                    <Switch id="emailNotifs" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Emails de marketing</Label>
                      <p className="text-sm text-gestao-text">Receber novidades e ofertas especiais</p>
                    </div>
                    <Switch id="marketingEmails" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button onClick={() => toast.success("Perfil atualizado com sucesso")}>Salvar alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assinaturas</CardTitle>
                <CardDescription>
                  Gerencie os planos de suas empresas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gestao-blue/5 p-4 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="font-semibold">Empresa ABC</h3>
                        <div className="flex items-center mt-1">
                          <Badge variant="default" className="bg-gestao-blue text-white">Premium</Badge>
                          <span className="text-sm text-gestao-text ml-2">Ativo até 15/12/2024</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Mudar plano</Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => toast.error("Assinatura cancelada")}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center border-b pb-3">
                      <span className="font-medium">Detalhes da assinatura</span>
                      <Button variant="ghost" size="sm">Ver fatura</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
                      <div>
                        <p className="text-sm text-gestao-text">Plano</p>
                        <p className="font-medium">Premium</p>
                      </div>
                      <div>
                        <p className="text-sm text-gestao-text">Preço</p>
                        <p className="font-medium">R$ 149,90 / mês</p>
                      </div>
                      <div>
                        <p className="text-sm text-gestao-text">Data de renovação</p>
                        <p className="font-medium">15/12/2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-gestao-text">Método de pagamento</p>
                        <p className="font-medium">•••• 4242</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <h4 className="font-medium mb-2">Recursos inclusos:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          Usuários ilimitados
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          Armazenamento de 20GB
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          Relatórios avançados
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          Suporte prioritário
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="font-semibold">Indústria XYZ</h3>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline">Básico</Badge>
                          <span className="text-sm text-gestao-text ml-2">Ativo até 03/10/2024</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate('/select-plan')}>Mudar plano</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/create-company')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar nova empresa
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="companies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Empresas</CardTitle>
                <CardDescription>
                  Gerencie suas empresas cadastradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCompanies.map((company) => (
                    <div key={company.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{company.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant={company.plan === 'Premium' ? 'default' : 'outline'}>
                            {company.plan}
                          </Badge>
                          <span className="text-sm text-gestao-text">{company.users} usuários</span>
                          <span className="text-sm text-gestao-text">{company.products} produtos</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => navigate('/dashboard')}
                        >
                          Acessar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/company-settings/${company.id}`)}
                        >
                          Configurar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => navigate('/create-company')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova empresa
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuários</CardTitle>
                <CardDescription>
                  Gerencie o acesso de outros usuários às suas empresas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Usuários ativos</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-500 text-white">MS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Maria Santos</p>
                            <p className="text-sm text-gestao-text">maria.santos@exemplo.com</p>
                          </div>
                        </div>
                        <Badge>Administrador</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-green-500 text-white">PC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Pedro Costa</p>
                            <p className="text-sm text-gestao-text">pedro.costa@exemplo.com</p>
                          </div>
                        </div>
                        <Badge variant="outline">Editor</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Convites pendentes</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gray-200 text-gray-500">
                              <Mail className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">ana.lima@exemplo.com</p>
                            <p className="text-sm text-gestao-text">Convidado há 2 dias</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Reenviar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Convidar usuários
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
