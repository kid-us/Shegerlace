import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
// import shoes from "../services/shoes";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import baseUrl from "../services/request";
import { StockShoes } from "../hooks/useStock";
import Loading from "../components/Loading/Loading";
import Images from "../components/ProductDatail.tsx/Images";
import useFavorite from "../hooks/useFavorite";
import useUsername from "../hooks/useUsername";
import SimilarItem from "../components/SimilarItem/SimilarItem";
import SmallImage from "../components/Products/SmallImage";

export interface ShoeInfo {
  shoe: StockShoes;
}

const ProductDetail = () => {
  const { id } = useParams();

  const { addToCart, removeFromCart } = useCartStore();

  const [shoe, setShoe] = useState<StockShoes>();
  const [sizes, setSizes] = useState<number[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        setActiveImage(response.data.shoe.main_picture);

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

  // Title
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
          stock: shoe.stock,
        });
      }
    }
  };

  const { favorite } = useFavorite();

  const { username } = useUsername();

  const navigate = useNavigate();

  const [favoriteShoe, setFavoriteShoe] = useState<number[]>([]);

  const access_token = localStorage.getItem("token");

  // Set Favorites
  useEffect(() => {
    if (favorite.length > 0) {
      const favoriteIds = favorite.map((f) => f.id); // Extract IDs from the favorite array
      setFavoriteShoe(favoriteIds); // Directly set the favoriteShoe state with the array of IDs
    }
  }, [favorite]);

  // Adding Removing Favorite
  const handleFavorite = (id: number) => {
    if (username) {
      if (favoriteShoe.includes(id)) {
        // Remove the id from the state
        axios
          .post(
            `${baseUrl}auth/remove-from-favorite?id=${id}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then(() => {
            setFavoriteShoe(favoriteShoe.filter((favId) => favId !== id));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Add the id to the state
        axios
          .post(
            `${baseUrl}auth/add-to-favorite?id=${id}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then(() => {
            setFavoriteShoe([...favoriteShoe, id]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Loading */}
      {loading && <Loading />}
      <Navbar />
      <div>
        <div className="lg:grid grid-cols-5 gap-x-10 lg:mt-14 mt-8">
          {/* Images */}
          {shoe && (
            <Images
              activeImage={activeImage}
              images={shoe.images}
              main={activeImage}
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
            {shoe && (
              <SmallImage mainImg={shoe.main_picture} images={shoe.images} />
            )}

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
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className={`bi-dash ${
                    quantity === 1 ? "bg-gray-400" : "btn-bg"
                  } h-12 rounded-l text-xl`}
                  disabled={quantity === 1}
                ></button>
                <div className="col-span-4 h-12">
                  <input
                    type="number"
                    className="focus:outline-none h-12 text-center w-full text-xl"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.currentTarget.value))}
                    min={1}
                    max={shoe?.stock}
                    readOnly
                  />
                </div>
                <button
                  onClick={() =>
                    quantity < Number(shoe?.stock) && setQuantity(quantity + 1)
                  }
                  className={`bi-plus ${
                    quantity === Number(shoe?.stock) ? "bg-gray-400" : "btn-bg"
                  } h-12 rounded-r text-xl`}
                  disabled={quantity >= Number(shoe?.stock)}
                ></button>
              </div>

              {/* Button */}
              <div className="mt-6 space-y-4">
                {/* Order */}
                {!username ? (
                  <button
                    onClick={() =>
                      size === 0
                        ? setError(true)
                        : (window.location.href = `/login`)
                    }
                    className="btn-bg block text-center pt-1 font-bold font-poppins text-lg lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none"
                  >
                    Order
                  </button>
                ) : (
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
                )}
                {/* Add to cart */}
                <button
                  onClick={() => handleAddToBag()}
                  className="bg-black text-white lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none"
                >
                  Add to Bag{" "}
                  <span className="bi-bag-fill ms-3 text-white"></span>
                </button>
                {/* Favorite */}
                {shoe && favoriteShoe.includes(shoe.id) && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavorite(shoe.id);
                    }}
                    className="bg-red-600 text-white lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none"
                  >
                    Remove for Favorite{" "}
                    <span className="bi-heart-fill ms-3"></span>
                  </button>
                )}

                {shoe && !favoriteShoe.includes(shoe.id) && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavorite(shoe.id);
                    }}
                    className="bg-white lg:w-72 w-full rounded-lg lg:h-12 h-14 shadow shadow-zinc-950 active:shadow-none"
                  >
                    Add to Favorite <span className="bi-heart-fill ms-3"></span>
                  </button>
                )}
              </div>
              {/* Description */}
              <p className="mt-5">{shoe?.description}</p>
            </div>
          </div>
        </div>

        {/* Similar items */}
        <p className="mt-10 font-bold text-xl px-4">You might also like</p>
        {shoe && <SimilarItem brand={shoe?.brand} />}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
