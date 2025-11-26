import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import SignOutButton from "@/components/SignOutButton";
import ProductItem from "@/components/ProductItem";
import AddProductForm from "@/components/AddProductForm";
import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await dbConnect();
  
  // O .lean() converte os documentos do Mongoose em objetos JS puros
  const products = await Product.find({ usuarioId: (session.user as any).id }).lean();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Olá, {session.user?.name}</h1>
          </div>
          <SignOutButton />
        </div>

        <AddProductForm />

        <div className="grid gap-4">
          {products.map((product) => (
            <ProductItem 
              key={product._id.toString()} 
              product={{
                ...product,
                _id: product._id.toString()
              }} 
            />
          ))}
          
          {products.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-center text-gray-500">Nenhum produto cadastrado.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}