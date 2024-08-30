import { Link } from "react-router-dom";
import shoes from "../../services/shoes";
import { useCartStore } from "../../stores/useCartStore";

const Products = () => {
  const { addToCart, cart } = useCartStore();

  return (
    <>
      {shoes.map((shoe) => (
        <div
          key={shoe.id}
          className="bg-gray-50 rounded-2xl shadow shadow-zinc-500 p-5"
        >
          <div className="flex justify-center bg rounded-2xl hover:rotate-0 shadow-inner p-2">
            <Link to={`/shoes/${shoe.id}`} className="w-full overflow-hidden">
              <img
                src={shoe.img}
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
                    img: shoe.img,
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
