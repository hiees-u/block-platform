import { Button } from "@/components/ui/button";
import { SpinnerNumberInput } from "./SpinnerNumberInput";
import { useState } from "react";

type AddToCartProps = {
  id: number;
  onClose?: () => void;
};

export default function AddToCart({ id, onClose }: AddToCartProps) {
  var [quantity, setQuantity] = useState(1); // Default quantity

  const handleAddToCart = () => {
    console.log(`Adding product with ID ${id} to cart with quantity ${quantity}`);
    onClose && onClose(); // Close the popover if onClose is provided
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
