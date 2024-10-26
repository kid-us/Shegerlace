import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../services/request";
import { AllShoes, StockShoes } from "../../hooks/useStock";
import Loading from "../Loading/Loading";
import { useCartStore } from "../../stores/useCartStore";
import useFavorite from "../../hooks/useFavorite";
import useUsername from "../../hooks/useUsername";

const Search = () => {
  const { id } = useParams();

  const { username } = useUsername();

  const { addToCart, cart } = useCartStore();
  const { favorite } = useFavorite();

  const access_token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [allData, setAllData] = useState<AllShoes>();
  const [stock, setStock] = useState<StockShoes[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteShoe, setFavoriteShoe] = useState<number[]>([]);

  // Title
  useEffect(() => {
    if (id) {
      document.title = id;
    }
  }, [id]);

  // Fetch searched shoes
  useEffect(() => {
    axios
      .get<AllShoes>(`${baseUrl}store/search?query=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoading(false);
        setAllData(response.data);
        setStock(response.data.shoes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

      <div className="container mx-auto lg:px-0 px-3 lg:mt-10 mt-6">
        <p className="text-3xl font-bold">Search result "{id}"</p>

        {stock.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {stock.map(
              (shoe) =>
                Number(shoe.stock) > 0 && (
                  <Link to={`/shoes/${shoe.uid}`} key={shoe.uid}>
                    <div className="relative bg-gray-50 rounded-2xl shadow shadow-zinc-500 p-5">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleFavorite(shoe.id);
                        }}
                        className={`${
                          favoriteShoe.includes(shoe.id)
                            ? "bi-heart-fill"
                            : "bi-heart"
                        } absolute top-7 z-20 bg-transparent text-xl overflow-hidden cursor-default text-red-500 right-2 w-20 h-20`}
                      ></button>

                      <div className="flex justify-center bg rounded-2xl hover:rotate-0 shadow-inner overflow-hidden">
                        <img
                          src={shoe.main_picture}
                          alt="Shoe"
                          className={`h-64 w-full object-contain -rotate-[20deg] hover:rotate-0`}
                        />
                      </div>

                      <div className="mt-4 leading-tight">
                        <div className="flex justify-between">
                          <p className="font-extrabold text-lg">{shoe.name}</p>
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
                                ? "bi-bag-fill text-white bg-cyan-600 rounded-full  text-lg"
                                : "bi-bag"
                            }`}
                          ></button>
                        </div>
                        <p>
                          <span className="bi-cash me-1"></span> {shoe.price}br
                        </p>
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
        ) : (
          <div className="col-span-3 lg:px-20 p-4 text-xl mt-10 bg-white rounded py-5">
            <h1 className="font-bold text-4xl mb-5">
              {" "}
              Oppps! search not found
            </h1>
            <p>
              It looks like we couldn’t find any results matching your search
              criteria. Please try adjusting your filters or searching with
              different terms, and we’ll help you find what you’re looking for!
            </p>
          </div>
        )}

        {/* Pagination */}
        {stock.length >= 10 && (
          <div className="flex justify-end mt-2">
            <div className="flex gap-x-2">
              {/* prev */}
              <button
                onClick={() =>
                  allData?.has_prev && setPage(allData ? page - 1 : 0)
                }
                disabled={allData?.has_prev === false ? true : false}
                className={`${
                  allData?.has_prev === false
                    ? "bg-gray-400 cursor-not-allowed"
                    : "btn-bg"
                } w-20 font-poppins rounded text-sm h-7`}
              >
                Prev
              </button>
              {/* Current */}
              <p className="bg-white w-14 font-poppins rounded text-sm h-7 text-center pt-[6px]">
                {allData?.current_page} of {allData?.total_pages}
              </p>
              {/*next  */}
              <button
                onClick={() =>
                  allData?.has_next && setPage(allData ? page + 1 : 0)
                }
                disabled={allData?.has_next === false ? true : false}
                className={`${
                  allData?.has_next === false
                    ? "bg-gray-400 cursor-not-allowed"
                    : "btn-bg"
                } w-20 font-poppins rounded text-sm h-7`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Search;
