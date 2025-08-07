import { getProductById } from "@/axios/product";
import { useCartStore } from "@/store/cartStore";
import type { ProductCart } from "@/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const table = useReactTable({
    data: productsCart,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    fetchProducts();
    console.log("table.getFooterGroups=> ", table.getFooterGroups());
  }, [items]);

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <TableCell key={footer.id}>
                  {flexRender(footer.column.columnDef.footer, footer.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
