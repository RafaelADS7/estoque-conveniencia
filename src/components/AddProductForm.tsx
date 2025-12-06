"use client";

import { useRef } from "react";
import { addProduct } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Plus, DollarSign, Package, Layers, Image } from "lucide-react";

export default function AddProductForm() {
  const ref = useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    const result = await addProduct(formData);
    if (result?.error) {
      alert(result.error);
    } else {
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
        <form ref={ref} action={clientAction} className="grid gap-4">
          {/* Nome */}
          <div className="relative">
            <Package className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input name="name" placeholder="Nome do produto" required className="pl-10" />
          </div>

          {/* Categoria */}
          <div className="relative">
            <Layers className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Select name="category" required>
              <SelectTrigger className="w-[200px] pl-10">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bebida">Bebida</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
                <SelectItem value="higiene">Higiene</SelectItem>
                <SelectItem value="limpeza">Limpeza</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preço */}
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              name="price"
              type="number"
              placeholder="Preço"
              required
              className="pl-10"
              step="0.01"
              min="0"
            />
          </div>

          {/* Estoque */}
          <Input
            name="stock"
            type="number"
            placeholder="Quantidade em estoque"
            required
            min="0"
          />

          {/* Descrição */}
          <Textarea
            name="description"
            placeholder="Descrição do produto (opcional)"
            className="w-full"
          />

          {/* Imagem */}
          <div className="relative">
            <Image className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              name="image"
              type="text"
              placeholder="URL da imagem (opcional)"
              className="pl-10"
            />
          </div>

          {/* Botão */}
          <Button type="submit" className="px-6">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
