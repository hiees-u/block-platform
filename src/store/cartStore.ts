import { create } from "zustand";

type CartItem = {
  id: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (id, quantity) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        // If already in cart, increase quantity
        return {
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { id, quantity }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ items: [] }),
}));