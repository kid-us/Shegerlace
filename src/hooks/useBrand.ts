import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";

export interface brandShoes {
  id: number;
  brand_names: string;
}

export interface AllShoes {
  brands: brandShoes[];
}

const useBrand = () => {
  const [brand, setBrand] = useState<brandShoes[]>([]);

  // Fetch Brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get<AllShoes>(
          `${baseUrl}store/get-brands`,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setBrand(response.data.brands);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, []);

  return {
    brand,
  };
};

export default useBrand;
