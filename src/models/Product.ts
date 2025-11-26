import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  usuarioId: { type: String, required: true }, // Relacionamento
}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema);
export default Product;