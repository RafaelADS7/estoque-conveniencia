import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  usuarioId: string; // vincula ao usuário que cadastrou
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // ex: bebida, snack, higiene
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  usuarioId: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
