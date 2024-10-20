import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";

interface StockShoes {
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

interface AllShoes {
  shoes: StockShoes[];
  current_page: 1;
  has_next: boolean;
  has_prev: boolean;
  next_num: number | null;
  prev_num: number | null;
  total_pages: number;
  total_shoes: number;
}

const useStock = () => {
  // const [stock, setStock] = useState<StockShoes[]>([]);
  const [allData, setAllData] = useState<AllShoes>();

  const [page, setPage] = useState<number>(1);

  const [stock, setStock] = useState<StockShoes[]>([]);

  // // Fetch Shoes
  // useEffect(() => {
  //   const fetchStocks = async () => {
  //     try {
  //       const response = await axios.get<AllShoes>(
  //         `${baseUrl}store/get-shoes`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "ngrok-skip-browser-warning": "69420",
  //           },
  //         }
  //       );
  //       setStock(response.data.shoes);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchStocks();
  // }, []);
  // Fetch Shoes

  useEffect(() => {
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
        setAllData(response.data);
        setStock(response.data.shoes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStocks();
  }, [page, stock]);

  // Handle Pagination

  const handlePagination = (num: number) => {
    setPage(num);
  };

  return {
    stock,
    allData,
    page,
    handlePagination,
  };
};

export default useStock;
