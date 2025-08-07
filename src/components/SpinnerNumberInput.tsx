import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, type JSX } from "react";

type SpinnerNumberInputProps = {
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export function SpinnerNumberInput({
  defaultValue = 0,
  onChange,
}: SpinnerNumberInputProps): JSX.Element {
  const [value, setValue] = useState<number>(defaultValue);

  const handleIncrement = () => {
    setValue((prev) => prev + 1);
    if (onChange) onChange(value + 1);
  };

  const handleDecrement = () => {
    setValue((prev) => Math.max(0, prev - 1));
    if (onChange) onChange(Math.max(0, value - 1));
  };

  return (
    <div className="flex items-center">
      <Button onClick={handleDecrement}>-</Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-16 text-center m-[5px]"
      />
      <Button onClick={handleIncrement}>+</Button>
    </div>
  );
}
