import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";
import { StockShoes } from "./useStock";

const useFavorite = () => {
  const [favorite, setFavorite] = useState<StockShoes[]>([]);

  const access_token = localStorage.getItem("token");

  // Fetch Shoes
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${baseUrl}auth/my-favorites`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${access_token}`,
          },
        });
        setFavorite(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  return {
    favorite,
  };
};

export default useFavorite;
