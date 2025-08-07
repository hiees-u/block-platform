import axios from "axios";
import type { Product } from "../types";

const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts(): Promise<Product[]> {
  const res = await axios.get<Product[]>(BASE_URL);
  return res.data;
}

export async function getProductById(id: number): Promise<Product> {
  const res = await axios.get<Product>(`${BASE_URL}/${id}`);
  return res.data;
}