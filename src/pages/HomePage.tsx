import { useEffect, useState } from "react";

import type { Product } from "@/types";
import { getProducts } from "@/axios/product";
import { ProductTable } from "@/components/ProductTable";

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
    <>
      <ProductTable products={products} />
    </>
  );
}
