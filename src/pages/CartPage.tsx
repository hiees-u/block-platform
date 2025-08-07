import CartList from "@/components/CartList";
import ConfirmCheckOut from "@/components/ComfirmCheckOut";

export default function CartPage() {
  return (
    <div>
      <CartList />
      <div className="flex justify-end mt-4">
        <ConfirmCheckOut />
      </div>
    </div>
  );
}