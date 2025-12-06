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
}

// --- AÇÃO DE CRIAR PRODUTO ---
export async function addProduct(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não autorizado" };

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const price = formData.get("price") as string;
  const stock = formData.get("stock") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  await dbConnect();
  await Product.create({
    name,
    category,
    price: Number(price),
    stock: Number(stock),
    description,
    image,
    usuarioId: (session.user as any).id,
  });

  revalidatePath("/dashboard"); // Atualiza a lista instantaneamente
  return { success: true };
}

// --- AÇÃO DE DELETAR PRODUTO ---
export async function deleteProduct(formData: FormData) {
  const id = formData.get("id");
  await dbConnect();
  await Product.findByIdAndDelete(id);
  revalidatePath("/dashboard");
}

// --- AÇÃO DE ATUALIZAR PRODUTO ---
export async function updateProduct(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Não autorizado" };

  const id = formData.get("id");
  const name = formData.get("name");
  const category = formData.get("category");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const description = formData.get("description");
  const image = formData.get("image");

  await dbConnect();
  await Product.findByIdAndUpdate(id, {
    name,
    category,
    price: Number(price),
    stock: Number(stock),
    description,
    image,
  });

  revalidatePath("/dashboard");
  return { success: true };
}
