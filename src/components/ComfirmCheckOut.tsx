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

import { getProductById } from "@/axios/product";
import { useCartStore } from "@/store/cartStore";
import type { ProductCart } from "@/types";

export default function ConfirmCheckOut() {
  const [productsCart, setProductsCart] = useState<ProductCart[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);
  const { items } = useCartStore();

  type CheckoutForm = {
    email: string;
    address: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  const fetchProducts = async () => {
    const productPromises = items.map((item) => getProductById(item.id));
    const productData = await Promise.all(productPromises);
    const productsWithQuantity = productData.map((product, index) => ({
      ...product,
      quantity: items[index].quantity,
    }));
    setProductsCart(productsWithQuantity);
    const total = productsCart.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    fetchProducts();
  }, [items]);

  const onSubmit = (data: { email: string, address: string }) => {
    clearCart();
    setOpen(false);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>Check Out</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure Payment Confirmation - ${totalAmount}?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  placeholder="Enter your email to confirm"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                <Input
                  placeholder="Enter your Address to confirm"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 5,
                      message: "Address is too short",
                    },
                  })}
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
