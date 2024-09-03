import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import useStock from "../../hooks/useStock";

const Products = () => {
  const { addToCart, cart } = useCartStore();
  const { stock } = useStock();

  return (
    <>
      {stock.map((shoe) => (
        <div
          key={shoe.uid}
          className="relative bg-gray-50 rounded-2xl shadow shadow-zinc-500 p-5 h-[62%] overflow-hidden"
        >
          <button className="absolute top-7 z-10 text-xl overflow-hidden cursor-default text-red-500 bi-heart right-2 w-20 h-10"></button>

          <div className="flex justify-center bg rounded-2xl hover:rotate-0 shadow-inner p-2">
            <Link to={`/shoes/${shoe.uid}`} className="w-full overflow-hidden">
              <img
                src={shoe.main_picture}
                alt="Shoe"
                className={`relative z-10 h-72 w-full object-contain -rotate-[20deg] hover:rotate-0`}
              />
            </Link>
          </div>

          <div className="mt-5">
            <div className="flex justify-between">
              <p className="font-extrabold text-xl">{shoe.name}</p>
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
            <p className="mt-1 font-bold">
              <span className="bi-cash text-xl me-1"></span> {shoe.price}br
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Products;
