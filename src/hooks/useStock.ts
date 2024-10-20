import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";
import { Price, Size } from "../components/Filter/Filter";

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

interface FilterData {
  min_price?: number;
  max_price?: number;
  size?: string;
  brand?: string;
  category?: string;
}

const useStock = () => {
  // const [stock, setStock] = useState<StockShoes[]>([]);
  const [allData, setAllData] = useState<AllShoes>();

  const [page, setPage] = useState<number>(1);

  const [stock, setStock] = useState<StockShoes[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // First fetch
  useEffect(() => {
    const fetchStocks = async () => {
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStocks();
  }, [page]);

  // Handle Pagination
  const handlePagination = (num: number) => {
    setLoading(true);
    setPage(num);
  };

  // Handle Filter
  const handleFilter = (
    category: string | null,
    price: Price | null,
    brand: string | null,
    size: Size | null
  ) => {

    setLoading(true);

    const filterData: FilterData = {
      ...(price && {
        min_price: Number(price.min),
        max_price: Number(price.max),
      }),
      ...(size && { size: `${size.start}-${size.end}` }),
      ...(brand && { brand }),
      ...(category && { category }),
    };

    console.log(filterData);

    axios
      .get<AllShoes>(`${baseUrl}store/get-shoes-by-filter`, {
        params: filterData,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setStock(response.data.shoes);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return {
    stock,
    allData,
    page,
    loading,
    handlePagination,
    handleFilter,
  };
};

export default useStock;
