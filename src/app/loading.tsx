import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Package } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Carregando...
          </h2>
          
          <p className="text-sm text-gray-500 text-center">
            Por favor, aguarde enquanto preparamos tudo para você.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
