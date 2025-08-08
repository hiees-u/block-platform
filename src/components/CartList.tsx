import { useEffect, useState } from "react";
import {
  createColumnHelper,
} from "@tanstack/react-table";

import type { ProductCart } from "@/types";
import { getProductById } from "@/axios/product";
import { useCartStore } from "@/store/cartStore";
import CustomTable from "./ui/Custom-Table";

export default function CartList() {
  const [productsCart, setProductsCart] = useState<ProductCart[]>([]);
  const { items } = useCartStore();

  const columnHelper = createColumnHelper<ProductCart>();

  const fetchProducts = async () => {
    const productPromises = items.map((item) => getProductById(item.id));
    const productData = await Promise.all(productPromises);
    const productsWithQuantity = productData.map((product, index) => ({
      ...product,
      quantity: items[index].quantity,
    }));
    setProductsCart(productsWithQuantity);
  };

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
      footer: ({ table }) => {
        const total = table.getRowModel().rows.reduce((sum, row) => {
          // Use type assertion to tell TypeScript these are numbers
          const price = (row.getValue("price") as number) || 0;
          const quantity = (row.getValue("quantity") as number) || 0;
          return sum + price * quantity;
        }, 0);
        return <>Total: ${total.toFixed(2)}</>;
      },
    }),
  ];

  useEffect(() => {
    fetchProducts();
  }, [items]);

  return (
    <>
      <CustomTable columns={columns} data={productsCart} />
    </>
  );
}
