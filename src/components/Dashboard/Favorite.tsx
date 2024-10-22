import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import useFavorite from "../../hooks/useFavorite";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../services/request";

const Favorite = () => {
  const { addToCart, cart } = useCartStore();

  const { favorite } = useFavorite();
  
  const access_token = localStorage.getItem("token");

  const [favoriteShoe, setFavoriteShoe] = useState<number[]>([]);

  // Set Favorites
  useEffect(() => {
    if (favorite.length > 0) {
      const favoriteIds = favorite.map((f) => f.id); // Extract IDs from the favorite array
      setFavoriteShoe(favoriteIds); // Directly set the favoriteShoe state with the array of IDs
    }
  }, [favorite]);

  // Adding Removing Favorite
  const handleFavorite = (id: number) => {
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
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto lg:px-0 px-4">
        <p className="mt-8 text-lg">
          Welcome back <span className="text-color font-bold">Lorem</span>
        </p>

        <div className="flex my-5 gap-x-10">
          <Link
            to={"/my-orders"}
            className="mb-3 btn-bg shadow shadow-zinc-900 rounded text-center w-40 p-2 text-white font-bold"
          >
            Your Orders
          </Link>
          <Link
            to={"/my-favorites"}
            className="uppercase mb-3 btn-bg text-white p-2 rounded shadow-inner shadow-black w-40 text-center font-bold"
          >
            My Favorite
          </Link>
        </div>
        <p className="mb-4">You favorite shoes are here</p>
        {favorite.length > 0 ? (
          <div className="lg:grid grid-cols-3 gap-5">
            {favorite.map((shoe) => (
              <div
                key={shoe.id}
                className="relative bg-gray-50 rounded-2xl shadow shadow-zinc-500 p-5 lg:mb-0 mb-10"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFavorite(shoe.id);
                  }}
                  className={`${
                    favoriteShoe.includes(shoe.id)
                      ? "bi-heart-fill"
                      : "bi-heart"
                  } absolute top-7 z-50 bg-transparent text-xl overflow-hidden cursor-default text-red-500 right-2 w-20 h-20`}
                ></button>

                <div className="flex justify-center bg rounded-2xl hover:rotate-0 shadow-inner p-2">
                  <Link
                    to={`/shoes/${shoe.id}`}
                    className="w-full overflow-hidden"
                  >
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
                    <span className="bi-cash text-xl me-1"></span> {shoe.price}
                    br
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[40dvh]">
            <div className="bg-white rounded px-3 py-5 shadow shadow-zinc-900">
              <p className="mb-4">
                You haven't add your favorite shoes yet, but when you do, they
                will be displayed here.
              </p>
              <Link
                to={"/"}
                className="btn-bg rounded py-2 px-10 text-white shadow shadow-zinc-900 font-bold"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorite;
