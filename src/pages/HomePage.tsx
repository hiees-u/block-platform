import { useEffect, useState } from "react";

import type { Product } from "@/types";
import { getProducts } from "@/axios/product";
import ProductItem from "@/components/ProductItem";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        console.log("Products fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  
  return (
    <div>
      <h1>Home Page</h1>
      {products.length > 0 ? (products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))) : (
        <p>No products available</p>
      )}

      {products.length === 0 && <p>Loading products...</p>}
    </div>
  );
}
