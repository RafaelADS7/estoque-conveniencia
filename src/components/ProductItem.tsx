'use client'
import { useState } from "react";
import { updateProduct, deleteProduct } from "../app/actions";
import { Card, CardContent } from "@/components/ui/card";
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
import { Edit, Trash2, Check, X, DollarSign, Package, Layers, Image } from "lucide-react";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description?: string;
    image?: string;
  }
}

export default function ProductItem({ product }: ProductProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(formData: FormData) {
    setLoading(true);
    await updateProduct(formData);
    setLoading(false);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <form action={handleUpdate} className="grid gap-2">
            <input type="hidden" name="id" value={product._id} />

            <Input name="name" defaultValue={product.name} required />

            <Select name="category" defaultValue={product.category} required>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bebida">Bebida</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
                <SelectItem value="higiene">Higiene</SelectItem>
                <SelectItem value="limpeza">Limpeza</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                name="price"
                type="number"
                defaultValue={product.price}
                step="0.01"
                min="0"
                required
                className="pl-8"
              />
            </div>

            <Input
              name="stock"
              type="number"
              defaultValue={product.stock}
              min="0"
              required
            />

            <Textarea
              name="description"
              defaultValue={product.description}
              placeholder="Descrição do produto"
            />

            <Input
              name="image"
              defaultValue={product.image}
              placeholder="URL da imagem"
            />

            <div className="flex gap-2 mt-2">
              <Button type="submit" size="sm" disabled={loading} className="bg-green-500 hover:bg-green-600">
                {loading ? "Salvando..." : <Check className="h-4 w-4" />}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">Categoria: {product.category}</p>
            <p className="text-sm text-gray-600">Preço: R$ {product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Estoque: {product.stock} unidades</p>
            {product.description && (
              <p className="text-sm text-gray-500">{product.description}</p>
            )}
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="mt-2 w-32 h-32 object-cover rounded transition-transform hover:scale-105"
              />
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
          </Button>

          <form action={deleteProduct}>
            <input type="hidden" name="id" value={product._id} />
            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {loading ? "Excluindo..." : <Trash2 className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
