'use client'

import { useRef } from "react";
import { addProduct } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, DollarSign, Package } from "lucide-react";

export default function AddProductForm() {
  const ref = useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    // 1. Chama a Server Action
    const result = await addProduct(formData);

    // 2. Verifica se houve erro
    if (result?.error) {
      alert(result.error);
    } else {
      // 3. Se deu sucesso, limpa o formulário (UX melhorada!)
      ref.current?.reset();
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Novo Produto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form 
          ref={ref} 
          action={clientAction} 
          className="flex gap-4"
        >
          <div className="relative flex-1">
            <Package className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              name="nome" 
              placeholder="Nome do produto" 
              required 
              className="pl-10"
            />
          </div>
          
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              name="preco" 
              type="number" 
              placeholder="Preço" 
              required 
              className="w-32 pl-10"
              step="0.01"
              min="0"
            />
          </div>
          
          <Button type="submit" className="px-6">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}