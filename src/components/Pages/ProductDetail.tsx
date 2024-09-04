import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import shoes from "../../services/shoes";
import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import Footer from "../Footer/Footer";
import axios from "axios";
import baseUrl from "../../services/request";
import { StockShoes } from "../../hooks/useStock";
import Loading from "../Loading/Loading";
import Images from "../ProductDatail.tsx/Images";

interface ShoeInfo {
  shoe: StockShoes;
}

const ProductDetail = () => {
  const { id } = useParams();

  const { addToCart, removeFromCart } = useCartStore();

  const [shoe, setShoe] = useState<StockShoes>();
  const [sizes, setSizes] = useState<number[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  //   Get Size Range
  function getSizeRange(sizeRange: string): {
    startSize: number;
    endSize: number;
  } {
    const [startSize, endSize] = sizeRange.split("-").map(Number);
    return { startSize, endSize };
  }

  // Get Shoes
  useEffect(() => {
    axios
      .get<ShoeInfo>(`${baseUrl}store/get-shoe?shoe_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        const data = response.data.shoe;
        setShoe(data);
        setActiveImage(data.main_picture);

        // Sizes
        const newSizes = [];
        for (
          let i = getSizeRange(response.data.shoe.size_range).startSize;
          i <= getSizeRange(response.data.shoe.size_range).endSize;
          i++
        ) {
          newSizes.push(i);
        }
        setSizes(newSizes);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    if (shoe) {
      document.title = shoe?.name;
    }
  }, [id, shoe]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [size, setSize] = useState<number | string>(0);
  const [error, setError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Add to bag
  const handleAddToBag = () => {
    if (size === 0 || size === "") {
      setError(true);
      return;
    } else {
      if (shoe) {
        setError(false);

        removeFromCart(Number(shoe.id));
        addToCart({
          id: Number(shoe.id),
          quantity,
          size,
          img: shoe.main_picture,
          price: Number(shoe.price),
        });
      }
    }
  };

  return (
    <>
      {/* Loading */}
      {loading && <Loading />}
      <Navbar />
      <div className="container mx-auto">
        <div className="lg:grid grid-cols-5 gap-x-10 lg:mt-14 mt-8">
          {/* Images */}
          {shoe && (
            <Images
              activeImage={activeImage}
              images={shoe.images}
              main={shoe.main_picture}
              setActiveImage={(img: string) => setActiveImage(img)}
            />
          )}

          {/* Description */}
          <div className="col-span-2">
            <div className="ps-4">
              <h1 className="text-2xl font-bold">{shoe?.name}</h1>
              <p className="mt-4 font-poppins font-bold lg:text-xl">
                <span className="bi-cash lg:text-2xl me-2"></span> {shoe?.price}
                br
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
              <p className="mt-5">{shoe?.description}</p>
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
