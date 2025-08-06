import axios from "axios";
import type { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return res.data;
}
