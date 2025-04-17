
import React, { ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CompanyFormData } from '@/pages/CreateCompany';
import { Upload } from 'lucide-react';

interface CompanyInfoStepProps {
  formData: CompanyFormData;
  updateFormData: (data: Partial<CompanyFormData>) => void;
}

const CompanyInfoStep: React.FC<CompanyInfoStepProps> = ({ formData, updateFormData }) => {
  // Atualiza tradingName quando sameNameAsCompany mudar
  useEffect(() => {
    if (formData.sameNameAsCompany) {
      updateFormData({ tradingName: formData.name });
    }
  }, [formData.sameNameAsCompany, formData.name]);
  
  // Manipulador para upload de logo
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData({ logo: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da empresa *</Label>
        <Input
          id="name"
          placeholder="Ex: Minha Empresa LTDA"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center gap-2 my-3">
        <Checkbox 
          id="sameNameAsCompany"
          checked={formData.sameNameAsCompany}
          onCheckedChange={(checked) => 
            updateFormData({ sameNameAsCompany: checked === true })
          }
        />
        <Label htmlFor="sameNameAsCompany" className="text-sm cursor-pointer">
          O nome fantasia é igual ao nome da empresa
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tradingName">Nome Fantasia *</Label>
        <Input
          id="tradingName"
          placeholder="Ex: Minha Empresa"
          value={formData.tradingName}
          onChange={(e) => updateFormData({ tradingName: e.target.value })}
          disabled={formData.sameNameAsCompany}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="contato@minhaempresa.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Logo da empresa</Label>
        <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            id="logo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
          />
          <Label htmlFor="logo" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-300 mb-2" />
            <span className="text-sm font-medium">
              {formData.logo ? formData.logo.name : "Clique para fazer upload"}
            </span>
            <span className="text-xs text-gray-500 mt-1">PNG, JPG ou GIF (máx. 2MB)</span>
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição da empresa</Label>
        <Textarea
          id="description"
          placeholder="Descreva brevemente sua empresa..."
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  );
};

export default CompanyInfoStep;
