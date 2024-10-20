import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../services/request";

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

const Products = () => {
  const { addToCart, cart } = useCartStore();

  const [allData, setAllData] = useState<AllShoes>();
  const [page, setPage] = useState<number>(1);
  const [stock, setStock] = useState<StockShoes[]>([]);

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
        console.log(response.data);
        setAllData(response.data);
        setStock(response.data.shoes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-3 px-2 py-5 gap-x-5 gap-y-10">
        {stock.map((shoe) => (
          <div
            key={shoe.uid}
            className="relative bg-gray-50 rounded-2xl shadow shadow-zinc-500 p-5 overflow-hidden"
          >
            <button className="absolute top-7 z-10 text-xl overflow-hidden cursor-default text-red-500 bi-heart right-2 w-20 h-10"></button>

            <div className="flex justify-center bg rounded-2xl hover:rotate-0 shadow-inner p-2">
              <Link
                to={`/shoes/${shoe.uid}`}
                className="w-full overflow-hidden"
              >
                <img
                  src={shoe.main_picture}
                  alt="Shoe"
                  className={`relative z-10 h-72 w-full object-contain -rotate-[20deg] hover:rotate-0`}
                />
              </Link>
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <p className="font-extrabold text-lg">{shoe.name}</p>
                <button
                  onClick={() =>
                    addToCart({
                      id: shoe.id,
                      quantity: 1,
                      size: 0,
                      img: shoe.main_picture,
                      price: shoe.price,
                    })
                  }
                  className={`font-extrabold text-2xl ${
                    cart.some((c) => c.id === shoe.id)
                      ? "bi-bag-fill text-white bg-cyan-600 rounded-full w-8 h-8 text-lg"
                      : "bi-bag"
                  }`}
                ></button>
              </div>
              <p className="">
                <span className="bi-cash me-1"></span> {shoe.price}br
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {stock.length >= 10 && (
        <div className="flex justify-end mt-2">
          <div className="flex gap-x-2">
            {/* prev */}
            <button
              onClick={() =>
                allData?.has_prev && setPage(allData ? page - 1 : 0)
              }
              disabled={allData?.has_prev === false ? true : false}
              className={`${
                allData?.has_prev === false
                  ? "bg-gray-400 cursor-not-allowed"
                  : "btn-bg"
              } w-20 font-poppins rounded text-sm h-7`}
            >
              Prev
            </button>
            {/* Current */}
            <p className="bg-white w-14 font-poppins rounded text-sm h-7 text-center pt-[6px]">
              {allData?.current_page} of {allData?.total_pages}
            </p>
            {/*next  */}
            <button
              onClick={() =>
                allData?.has_next && setPage(allData ? page + 1 : 0)
              }
              disabled={allData?.has_next === false ? true : false}
              className={`${
                allData?.has_next === false
                  ? "bg-gray-400 cursor-not-allowed"
                  : "btn-bg"
              } w-20 font-poppins rounded text-sm h-7`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
