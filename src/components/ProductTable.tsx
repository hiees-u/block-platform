import {
  createColumnHelper,
} from "@tanstack/react-table";
import type { Row } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import type { Product } from "@/types";
import AddToCart from "./AddToCart";
import CustomTable from "./ui/Custom-Table";

export function ProductTable({ products }: { products: Product[] }) {
  const columnHelper = createColumnHelper<Product>();
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
      enableSorting: true,
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Product> }) => {
        const productId = row.original.id;
        return (
          <Popover
            open={openPopoverId === productId}
            onOpenChange={(open) => setOpenPopoverId(open ? productId : null)}
          >
            <PopoverTrigger>
              <ShoppingCart size={24} className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>
              <AddToCart
                id={productId}
                onClose={() => setOpenPopoverId(null)}
              />
            </PopoverContent>
          </Popover>
        );
      },
    },
  ];

  return (
    <>
      <CustomTable columns={columns} data={products} />
    </>
  );
}
