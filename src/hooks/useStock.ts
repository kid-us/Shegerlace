import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";

export interface StockShoes {
  id: number;
  brand: string;
  category: string;
  main_picture: string;
  name: string;
  images: string[];
  price: number;
  size_range: string;
  stock: string;
  uid: string;
  description: string;
}

export interface AllShoes {
  shoes: StockShoes[];
}

const useStock = () => {
  const [stock, setStock] = useState<StockShoes[]>([]);

  useEffect(() => {
    // Fetch Brands
    const fetchStocks = async () => {
      try {
        const response = await axios.get<AllShoes>(
          `${baseUrl}store/get-shoes`,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setStock(response.data.shoes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStocks();
  }, []);

  return {
    stock,
  };
};

export default useStock;
