import { Link } from "react-router-dom";
import { StockShoes } from "../../hooks/useStock";

interface ShoeCardProps {
  shoe: StockShoes;
  favoriteShoe: number[];
  handleFavorite: (id: number) => void;
  addToCart: (item: {
    id: number;
    quantity: number;
    size: number;
    img: string;
    price: number;
    stock: string;
  }) => void;
  cart: { id: number }[];
}

const ShoeCard = ({
  shoe,
  favoriteShoe,
  handleFavorite,
  addToCart,
  cart,
}: ShoeCardProps) => {
  return (
    <Link to={`/shoes/${shoe.uid}`} key={shoe.uid}>
      <div className="relative bg-gray-50 rounded-2xl shadow-sm shadow-zinc-500 p-5 hover:shadow-none transition-all duration-300">
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleFavorite(shoe.id);
          }}
          className={`${
            favoriteShoe.includes(shoe.id) ? "bi-heart-fill" : "bi-heart"
          } absolute top-2 z-20 text-xl text-red-500 right-1 bg-transparent w-20 h-20`}
        ></button>

        {/* Image */}
        <div className="flex justify-center rounded-2xl shadow-inner overflow-hidden bg">
          <img
            src={shoe.main_picture}
            alt={shoe.name}
            className="lg:h-64 h-60 w-full object-contain transition-all duration-400 -rotate-[20deg] group-hover:rotate-0 hover:rotate-0"
          />
        </div>

        {/* Details */}
        <div className="lg:mt-4 mt-2 leading-tight">
          <div className="flex justify-between items-center">
            <p className="font-extrabold text-xl">{shoe.name}</p>

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart({
                  id: shoe.id,
                  quantity: 1,
                  size: 0,
                  img: shoe.main_picture,
                  price: shoe.price,
                  stock: shoe.stock,
                });
              }}
              className={`font-extrabold text-2xl w-9 h-9 ${
                cart.some((c) => c.id === shoe.id)
                  ? "bi-bag-fill text-white bg-cyan-600 rounded-full text-lg"
                  : "bi-bag"
              }`}
            ></button>
          </div>

          <p className="text-lg">{shoe.price} ETB</p>
        </div>
      </div>
    </Link>
  );
};

export default ShoeCard;
