'use server'

import dbConnect from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// --- AÇÃO DE REGISTRO ---
export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) return { error: "Preencha tudo!" };

    await dbConnect();

    // Verifica se já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return { error: "Email já cadastrado" };

    // Cria hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });
    return { success: true };
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return { error: "Falha ao registrar usuário. Tente novamente." };
  }
}

// --- AÇÃO DE CRIAR PRODUTO ---
export async function addProduct(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Não autorizado" };

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;

    await dbConnect();
    await Product.create({
      name,
      category,
      price,
      stock,
      description,
      image,
      usuarioId: (session.user as any).id,
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    return { error: "Falha ao adicionar produto. Tente novamente." };
  }
}

// --- AÇÃO DE DELETAR PRODUTO ---
export async function deleteProduct(formData: FormData) {
  try {
    const id = formData.get("id");
    await dbConnect();

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return { error: "Produto não encontrado" };

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return { error: "Falha ao deletar produto. Tente novamente." };
  }
}

// --- AÇÃO DE ATUALIZAR PRODUTO ---
export async function updateProduct(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { error: "Não autorizado" };

    const id = formData.get("id");
    const name = formData.get("name");
    const category = formData.get("category");
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description");
    const image = formData.get("image");

    await dbConnect();
    const updated = await Product.findByIdAndUpdate(id, {
      name,
      category,
      price,
      stock,
      description,
      image,
    });

    if (!updated) return { error: "Produto não encontrado" };

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return { error: "Falha ao atualizar produto. Tente novamente." };
  }
}
