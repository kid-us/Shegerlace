import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import shoes from "../../services/shoes";
import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { hero1 } from "../../assets";
import { Shoes } from "../Home/Hero";
import { useCartStore } from "../../stores/useCartStore";
import Footer from "../Footer/Footer";

const ProductDetail = () => {
  const { addToCart, removeFromCart } = useCartStore();

  const [sizes, setSizes] = useState<number[]>([]);

  //   Get Size Range
  function getSizeRange(sizeRange: string): {
    startSize: number;
    endSize: number;
  } {
    const [startSize, endSize] = sizeRange.split("-").map(Number);
    return { startSize, endSize };
  }

  let xx = "34 - 40";

  useEffect(() => {
    const newSizes = [];
    for (
      let i = getSizeRange(xx).startSize;
      i <= getSizeRange(xx).endSize;
      i++
    ) {
      newSizes.push(i);
    }
    setSizes(newSizes);
  }, [xx]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const [defaultShoe, setDefaultShoe] = useState<Shoes>({
    id: 1,
    name: "Nike Dunk High",
    color: "547D27",
    img: hero1,
    price: 2999,
  });

  const [title] = useState(defaultShoe.name);
  useDocumentTitle(title);

  const [size, setSize] = useState<number | string>(0);
  const [error, setError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Add to bag
  const handleAddToBag = () => {
    if (size === 0 || size === "") {
      setError(true);
      return;
    } else {
      setError(false); // Reset the error if the size is valid

      removeFromCart(defaultShoe.id);
      addToCart({
        id: defaultShoe.id,
        quantity,
        size,
        img: defaultShoe.img,
        price: defaultShoe.price,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="lg:grid grid-cols-5 gap-x-10 lg:mt-14 mt-8">
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
              {/* Size */}
              <p className="mt-8">Select Size</p>
              <div
                className={`${
                  error && "border border-red-500 pb-5 rounded p-1 mt-3 lg:w-72"
                }`}
              >
                <div className="grid grid-cols-4 mt-5 gap-3 w-72">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSize(s);
                        setError(false);
                      }}
                      className={`lg:w-16 lg:h-14 w-full h-14 border border-gray-800 rounded shadow ${
                        size === s ? "bg-black text-white" : "bg-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-500 mt-2">Please select size</p>
              )}

              {/* Quantity */}
              <p className="mt-8 mb-2 text-sm">Quantity</p>
              <div className="grid grid-cols-6 lg:w-72 shadow shadow-zinc-900 rounded">
                <button
                  onClick={() => quantity !== 1 && setQuantity(quantity - 1)}
                  className="bi-dash btn-bg h-12 rounded-l text-xl"
                ></button>
                <div className="col-span-4 h-12">
                  <input
                    type="number"
                    className="focus:outline-none h-12 text-center w-full text-xl"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.currentTarget.value))}
                    min={1}
                    readOnly
                  />
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bi-plus btn-bg h-12 rounded-r text-xl"
                ></button>
              </div>

              {/* Button */}
              <div className="mt-6 space-y-4">
                {/* Order */}
                <button
                  onClick={() =>
                    size === 0
                      ? setError(true)
                      : (window.location.href = `/checkout/${id}?size=${size}&qty=${quantity}`)
                  }
                  className="btn-bg block text-center pt-1 font-bold font-poppins text-lg lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none"
                >
                  Order
                </button>
                {/* Add to cart */}
                <button
                  onClick={() => handleAddToBag()}
                  className="bg-black text-white lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none"
                >
                  Add to Bag{" "}
                  <span className="bi-bag-fill ms-3 text-white"></span>
                </button>
                {/* Favorite */}
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
      <Footer />
    </>
  );
};

export default ProductDetail;
