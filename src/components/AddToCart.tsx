import { Button } from "@/components/ui/button";
import { useState } from "react";

import { SpinnerNumberInput } from "./SpinnerNumberInput";
import { useCartStore } from "@/store/cartStore";

type AddToCartProps = {
  id: number;
  onClose?: () => void;
};

export default function AddToCart({ id, onClose }: AddToCartProps) {
  var [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(id, quantity);
    onClose && onClose();
  };

  return (
    <div className="w-[250px] flex items-center justify-between">
      <SpinnerNumberInput
        onChange={(value) => setQuantity(value)}
        defaultValue={quantity}
      />
      <Button className="bg-blue-500 text-white" onClick={handleAddToCart}>
        Add
      </Button>
    </div>
  );
}
