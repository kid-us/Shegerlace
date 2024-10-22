import { create } from "zustand";
import { Price, Size } from "../components/Filter/Filter";

export type State = {
  category: string | null;
  price: Price | null;
  brand: string | null;
  size: Size | null;
};

type Action = {
  updateCategory: (category: string | null) => void;
  updatePrice: (price: Price | null) => void;
  updateBrand: (brand: string | null) => void;
  updateSize: (size: Size | null) => void;
};

export const useFilter = create<State & Action>((set) => ({
  category: null,
  brand: null,
  price: null,
  size: null,

  updateCategory: (category: string | null) =>
    set(() => ({
      category,
    })),

  updateBrand: (brand: string | null) =>
    set(() => ({
      brand,
    })),

  updateSize: (size: Size | null) =>
    set(() => ({
      size,
    })),

  updatePrice: (price: Price | null) =>
    set(() => ({
      price,
    })),
}));
