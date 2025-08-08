import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";


import { getProductById } from "@/axios/product";
import { useCartStore } from "@/store/cartStore";
import type { ProductCart } from "@/types";
import schema from "@/schema/index";
import { Form } from "./ui/Custom-Form";
import { CustomField } from "./ui/CustomField";

type FormValues = {
  email: string;
  address: string;
};

export default function ConfirmCheckOut() {
  const [productsCart, setProductsCart] = useState<ProductCart[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);
  const { items } = useCartStore();
  
  const {
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const fetchProducts = async () => {
    const productPromises = items.map((item) => getProductById(item.id));
    const productData = await Promise.all(productPromises);
    const productsWithQuantity = productData.map((product, index) => ({
      ...product,
      quantity: items[index].quantity,
    }));
    setProductsCart(productsWithQuantity);
  };

  useEffect(() => {
    fetchProducts();
  }, [items]);

  useEffect(() => {
    const total = productsCart.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    setTotalAmount(total);
  }, [productsCart]);

  const onSubmit = () => {
    clearCart();
    setOpen(false);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button disabled={!items || items.length === 0}>Check Out</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure Payment Confirmation - ${totalAmount}?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <Form<FormValues>
                schema={schema}
                defaultValues={{ email: "", address: "" }}
                onSubmit={onSubmit}
              >
                <CustomField
                  name="email"
                  label="Enter your email to confirm"
                />
                <CustomField
                  name="address"
                  label="Enter your Address to confirm"
                />
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Confirm</Button>
                  <AlertDialogAction>No</AlertDialogAction>
                </div>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}