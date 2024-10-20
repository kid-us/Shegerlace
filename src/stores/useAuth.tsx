import { create } from "zustand";
import { StockShoes } from "../hooks/useStock";

interface AuthState {
  id: number | null;
  username: string | null;
  email: string | null;
  phone_number: string | null;
  favorite: StockShoes[];
  login: (
    id: number,
    username: string,
    email: string,
    phone_number: string,
    favorite: StockShoes[]
  ) => void;
  logout: () => void;
}

const useAuth = create<AuthState>((set) => ({
  id: null,
  username: null,
  email: null,
  phone_number: null,
  favorite: [],

  login: (id, username, email, phone_number, favorite) =>
    set({
      id,
      username,
      email,
      phone_number,
      favorite,
    }),

  logout: () =>
    set({
      id: null,
      username: null,
      email: null,
      phone_number: null,
      favorite: [],
    }),
}));

export default useAuth;
