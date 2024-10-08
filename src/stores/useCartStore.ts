import { create } from "zustand";

export interface CartItem {
  id: number;
  quantity: number;
  size: number | string;
  price: string | number;
  img: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  updateCartItemSize: (id: number, size: string | number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (newItem) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === newItem.id
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, newItem];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  updateCartItemQuantity: (id, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  updateCartItemSize: (id, size) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, size } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem("cart");
      return { cart: [] };
    }),
}));
