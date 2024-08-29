import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import shoes from "../../services/shoes";
import { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { hero1 } from "../../assets";
import { Shoes } from "../Home/Hero";

const size1 = [37, 38, 39, 40];
const size2 = [41, 42, 43, 44];

const Product = () => {
  const { id } = useParams();

  const [defaultShoe, setDefaultShoe] = useState<Shoes>({
    id: 1,
    name: "Nike Dunk High",
    color: "547D27",
    img: hero1,
    price: 2999,
  });

  console.log(id);

  const [title] = useState(defaultShoe.name);
  useDocumentTitle(title);

  const [size, setSize] = useState<number | string>(0);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="lg:grid grid-cols-5 gap-x-10 lg:mt-20 mt-8">
          {/* Images */}
          <div className="sticky top-24 self-start col-span-3 lg:grid hidden grid-cols-5">
            <div>
              {shoes.map((shoe) => (
                <div
                  key={shoe.id}
                  className={`${
                    defaultShoe.id === shoe.id ? "bg-gray-100" : "bg-white"
                  } rounded mb-1 mx-4 shadow`}
                >
                  <div
                    onMouseEnter={() => setDefaultShoe(shoe)}
                    className="flex justify-center rounded"
                  >
                    <img
                      src={shoe.img}
                      alt="Shoe"
                      className={`${
                        defaultShoe.id === shoe.id && "-rotate-[20deg]"
                      } h-[88.5px] w-16 object-contain`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-4 w-full h-full">
              <img
                src={defaultShoe.img}
                className="bg-white w-full h-[600px] object-contain rounded shadow"
                alt=""
              />
            </div>
          </div>
          {/* Description */}
          <div className="col-span-2">
            <div className="ps-4">
              <h1 className="text-2xl font-bold">{defaultShoe.name}</h1>
              <p className="mt-4 font-poppins font-bold lg:text-xl">
                <span className="bi-cash lg:text-2xl me-2"></span>{" "}
                {defaultShoe.price}br
              </p>
            </div>

            {/* Small device Images */}
            <div className="lg:hidden flex overflow-x-scroll scrollbar-hide mt-5 bg-white snap-x snap-mandatory">
              {shoes.map((s) => (
                <img
                  key={s.id}
                  src={s.img}
                  alt="shoes"
                  className="mx-10 h-96 w-full object-cover snap-center"
                />
              ))}
            </div>
            <div className="px-4">
              <p className="mt-8">Select Size</p>
              {/* Size */}
              <div className="flex mt-5 gap-x-3">
                {size1.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`lg:w-16 lg:h-14 w-full h-14 border border-gray-300 rounded shadow ${
                      size === s ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex mt-3 gap-x-3">
                {size2.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`lg:w-16 lg:h-14 w-full h-14 border border-gray-300 rounded shadow ${
                      size === s ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {/* Button */}
              <div className="mt-10 space-y-4">
                <button className="btn-bg lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none">
                  Order
                </button>
                <button className="bg-black text-white lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none">
                  Add to Bag{" "}
                  <span className="bi-bag-fill ms-3 text-white"></span>
                </button>
                <button className="bg-white lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none">
                  Add to Favorite <span className="bi-heart-fill ms-3"></span>
                </button>
              </div>
              {/* Description */}
              <p className="mt-5">
                The Nike Tawa is quick, lightweight while still durable,
                supportive and breathable. The zonal Flyknit construction and
                rubber wrapped sole give you exactly that, along with everything
                needed for quick shoots, sweeps and rotational movements during
                practice and competition.
              </p>
            </div>
          </div>
        </div>
        {/* Similar items */}
        <p className="mt-10 font-bold text-xl px-4">You might also like</p>
        <div className="flex gap-x-3 overflow-x-scroll scrollbar-hide mt-5 snap-x snap-mandatory mb-20 ps-1">
          {shoes.map((s) => (
            <img
              key={s.id}
              src={s.img}
              alt="shoes"
              className="bg-white h-96 w-full object-cover snap-center rounded"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
