import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";
import { Price, Size } from "../components/Filter/Filter";

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
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  next_num: number | null;
  prev_num: number | null;
  total_pages: number;
  total_shoes: number;
}

export interface FilterData {
  min_price?: number;
  max_price?: number;
  size?: string;
  brand?: string;
  category?: string;
}

const useStock = () => {
  const [allData, setAllData] = useState<AllShoes>();
  const [stock, setStock] = useState<StockShoes[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // New error state

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true); // Ensure loading is true when fetch starts
      try {
        const response = await axios.get<AllShoes>(
          `${baseUrl}store/get-shoes?page=${page}`,
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
        setError("Failed to fetch stock data");
        console.error(error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchStocks();
  }, [page]);

  const handlePagination = (num: number) => {
    setPage(num);
  };

  const handleFilter = (
    category: string | null,
    price: Price | null,
    brand: string | null,
    size: Size | null
  ) => {
    setLoading(true);
    setError(null);

    const filterData: FilterData = {
      ...(price && {
        min_price: Number(price.min),
        max_price: Number(price.max),
      }),
      ...(size && { size: `${size.start}-${size.end}` }),
      ...(brand && { brand }),
      ...(category && { category }),
    };

    filterData &&
      axios
        .get<AllShoes>(`${baseUrl}store/get-shoes-by-filter`, {
          params: filterData,
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((response) => {
          console.log(filterData.brand, response.data);

          setAllData(response.data);
          setStock(response.data.shoes);
        })
        .catch((error) => {
          setError("Failed to apply filter");
          console.log(error);
        })
        .finally(() => {
          setLoading(false); // Ensure loading is set to false after filtering
        });
  };

  return {
    stock,
    allData,
    page,
    loading,
    error, // Expose error to be used in UI
    handlePagination,
    handleFilter,
  };
};

export default useStock;
