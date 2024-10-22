import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../services/request";
import { AllShoes, StockShoes } from "../../hooks/useStock";
import { Link } from "react-router-dom";

interface Props {
  brand: string;
}
const SimilarItem = ({ brand }: Props) => {
  const [stock, setStock] = useState<StockShoes[]>([]);

  useEffect(() => {
    axios
      .get<AllShoes>(`${baseUrl}store/get-shoes-by-filter?brand=${brand}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setStock(response.data.shoes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [brand]);
  return (
    <>
      <div className="flex gap-x-3 overflow-x-scroll scrollbar-hide mt-5 snap-x snap-mandatory mb-20 ps-1">
        {stock.map((s) => (
          <Link key={s.id} to={`/${s.uid}`}>
            <img
              src={s.main_picture}
              alt="shoes"
              className="bg-white h-96 w-full object-cover snap-center rounded"
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default SimilarItem;
