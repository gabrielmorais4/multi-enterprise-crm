
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { CompanyFormData, Address } from '@/pages/CreateCompany';
import { toast } from 'sonner';

interface AddressesStepProps {
  formData: CompanyFormData;
  updateFormData: (data: Partial<CompanyFormData>) => void;
}

const AddressesStep: React.FC<AddressesStepProps> = ({ formData, updateFormData }) => {
  const [activeTab, setActiveTab] = useState(formData.addresses[0]?.id || '1');

  // Adicionar endereço
  const addAddress = () => {
    const newId = String(Date.now());
    const newAddress: Address = {
      id: newId,
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      isMain: false
    };
    
    updateFormData({
      addresses: [...formData.addresses, newAddress]
    });
    
    setActiveTab(newId);
  };

  // Remover endereço
  const removeAddress = (id: string) => {
    if (formData.addresses.length <= 1) {
      toast.error("É necessário pelo menos um endereço");
      return;
    }

    // Encontrar um novo tab para ativar
    let newActiveTab = activeTab;
    if (activeTab === id) {
      const remainingAddresses = formData.addresses.filter(addr => addr.id !== id);
      newActiveTab = remainingAddresses[0]?.id || '1';
    }

    updateFormData({
      addresses: formData.addresses.filter(address => address.id !== id)
    });
    
    setActiveTab(newActiveTab);
  };

  // Atualizar um endereço específico
  const updateAddress = (id: string, data: Partial<Address>) => {
    updateFormData({
      addresses: formData.addresses.map(address => 
        address.id === id ? { ...address, ...data } : address
      )
    });
  };

  // Definir um endereço como principal
  const setMainAddress = (id: string) => {
    updateFormData({
      addresses: formData.addresses.map(address => ({
        ...address,
        isMain: address.id === id
      }))
    });
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center border-b mb-4">
          <TabsList className="h-10 bg-transparent space-x-1">
            {formData.addresses.map((address, index) => (
              <TabsTrigger 
                key={address.id} 
                value={address.id}
                className="relative px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gestao-blue rounded-none"
              >
                Endereço {index + 1}
                {formData.addresses.length > 1 && (
                  <button
                    type="button"
                    className="ml-2 text-gray-400 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAddress(address.id);
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
                {address.isMain && (
                  <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-2 h-2" />
                )}
              </TabsTrigger>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addAddress}
              className="ml-2 h-8"
            >
              <Plus size={16} />
            </Button>
          </TabsList>
        </div>
        
        {formData.addresses.map((address) => (
          <TabsContent key={address.id} value={address.id} className="mt-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`street-${address.id}`}>Rua *</Label>
                  <Input
                    id={`street-${address.id}`}
                    placeholder="Ex: Av. Paulista"
                    value={address.street}
                    onChange={(e) => updateAddress(address.id, { street: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`number-${address.id}`}>Número *</Label>
                  <Input
                    id={`number-${address.id}`}
                    placeholder="Ex: 1000"
                    value={address.number}
                    onChange={(e) => updateAddress(address.id, { number: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`complement-${address.id}`}>Complemento</Label>
                  <Input
                    id={`complement-${address.id}`}
                    placeholder="Ex: Sala 123"
                    value={address.complement}
                    onChange={(e) => updateAddress(address.id, { complement: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`neighborhood-${address.id}`}>Bairro *</Label>
                  <Input
                    id={`neighborhood-${address.id}`}
                    placeholder="Ex: Centro"
                    value={address.neighborhood}
                    onChange={(e) => updateAddress(address.id, { neighborhood: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`zipCode-${address.id}`}>CEP *</Label>
                  <Input
                    id={`zipCode-${address.id}`}
                    placeholder="Ex: 00000-000"
                    value={address.zipCode}
                    onChange={(e) => updateAddress(address.id, { zipCode: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`city-${address.id}`}>Cidade *</Label>
                  <Input
                    id={`city-${address.id}`}
                    placeholder="Ex: São Paulo"
                    value={address.city}
                    onChange={(e) => updateAddress(address.id, { city: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`state-${address.id}`}>Estado *</Label>
                  <Input
                    id={`state-${address.id}`}
                    placeholder="Ex: SP"
                    value={address.state}
                    onChange={(e) => updateAddress(address.id, { state: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Button 
                  type="button" 
                  variant={address.isMain ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setMainAddress(address.id)}
                  disabled={address.isMain}
                >
                  {address.isMain ? "Endereço Principal" : "Marcar como Principal"}
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AddressesStep;
