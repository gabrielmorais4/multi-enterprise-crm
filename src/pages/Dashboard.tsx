
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Package, ShoppingCart, CreditCard, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Bem-vindo ao GestãoPro</h1>
          <p className="text-gestao-text">Gerencie seus clientes e estoque em um só lugar</p>
        </div>
        <Button onClick={() => {}}>Agendar Followup</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gestao-text mb-1">Total de Clientes</p>
                <h2 className="text-2xl font-bold">156</h2>
                <span className="text-sm text-green-500">+ 12%</span>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-gestao-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gestao-text mb-1">Produtos em Estoque</p>
                <h2 className="text-2xl font-bold">1,234</h2>
                <span className="text-sm text-green-500">+ 3%</span>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-gestao-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gestao-text mb-1">Pedidos do Mês</p>
                <h2 className="text-2xl font-bold">89</h2>
                <span className="text-sm text-green-500">+ 8%</span>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-gestao-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gestao-text mb-1">Receita Mensal</p>
                <h2 className="text-2xl font-bold">R$ 45.678</h2>
                <span className="text-sm text-green-500">+ 15%</span>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-gestao-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Oportunidades de Venda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Building size={20} className="text-gestao-blue" />
                  </div>
                  <span className="font-medium">Empresa ABC</span>
                </div>
                <span className="text-sm text-gray-500">15/03/2024</span>
              </div>
              <div className="ml-10 mb-3">
                <p className="text-sm text-gestao-text">Produto Premium X</p>
                <p className="font-medium">R$ 12.500</p>
              </div>
              <div className="ml-10 flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-gestao-blue px-3 py-1 rounded-full">
                  Negociação
                </span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div className="h-2 bg-green-500 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-xs">80%</span>
                </div>
              </div>
            </div>
            
            {/* More opportunities would go here */}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Dashboard;
