import { create } from "zustand";

export interface CartItem {
  id: number;
  quantity: number;
  size: number | string;
  price: string | number;
  img: string;
  stock: string | number;
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
        // Remove the item if it already exists in the cart
        updatedCart = state.cart.filter((item) => item.id !== newItem.id);
      } else {
        // Add the new item to the cart if it's not there
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
