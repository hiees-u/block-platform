import { Input } from "@/components/ui/input";
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
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import { getProductById } from "@/axios/product";
import { useCartStore } from "@/store/cartStore";
import type { ProductCart } from "@/types";

type FormValues = {
  email: string;
  address: string;
};

const schema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address is too short"),
});

export default function ConfirmCheckOut() {
  const [productsCart, setProductsCart] = useState<ProductCart[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);
  const { items } = useCartStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors }, // <- errors khai báo ở đây
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  placeholder="Enter your email to confirm"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                <Input
                  placeholder="Enter your Address to confirm"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Confirm</Button>
                  <AlertDialogAction>No</AlertDialogAction>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}