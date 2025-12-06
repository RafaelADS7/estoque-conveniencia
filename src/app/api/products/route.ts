import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newProduct = await Product.create(body);
  return NextResponse.json(newProduct);
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(body._id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  await connectDB();
  const body = await req.json();
  await Product.findByIdAndDelete(body._id);
  return NextResponse.json({ message: "Produto excluído" });
}
