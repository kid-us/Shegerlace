import { Link } from "react-router-dom";
import shoes from "../../services/shoes";

const Products = () => {
  return (
    <>
      {shoes.map((shoe) => (
        <div key={shoe.id} className="bg-gray-50 rounded-2xl shadow p-5">
          <Link to={"/"}>
            <div className="flex justify-center bg rounded-2xl hover:rotate-0 shadow-inner">
              <img
                src={shoe.img}
                alt="Shoe"
                className="h-72 w-full object-contain -rotate-[20deg]"
              />
            </div>
          </Link>

          <div className="mt-5">
            <div className="flex justify-between">
              <p className="font-extrabold text-xl">{shoe.name}</p>
              <button className="font-extrabold text-xl bi-bag"></button>
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
