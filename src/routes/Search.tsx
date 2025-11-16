import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";
import { AllShoes, StockShoes } from "../hooks/useStock";
import Loading from "../components/Loading/Loading";
import { useCartStore } from "../stores/useCartStore";
import useFavorite from "../hooks/useFavorite";
import useUsername from "../hooks/useUsername";
import { mockStockShoes } from "../services/stockShoes";
import ShoeCard from "../components/Card/ShoeCard";

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

  // Search function to filter mockStockShoes
  const searchShoes = (
    query: string,
    pageNum: number = 1,
    itemsPerPage: number = 10
  ): AllShoes => {
    if (!query) {
      return {
        shoes: [],
        current_page: 1,
        has_next: false,
        has_prev: false,
        next_num: null,
        prev_num: null,
        total_pages: 0,
        total_shoes: 0,
      };
    }

    const searchQuery = query.toLowerCase().trim();

    // Filter shoes based on name, brand, or description
    const filteredShoes = mockStockShoes.filter(
      (shoe) =>
        shoe.name.toLowerCase().includes(searchQuery) ||
        shoe.brand.toLowerCase().includes(searchQuery) ||
        shoe.description.toLowerCase().includes(searchQuery) ||
        shoe.category.toLowerCase().includes(searchQuery)
    );

    // Calculate pagination
    const totalShoes = filteredShoes.length;
    const totalPages = Math.ceil(totalShoes / itemsPerPage);
    const startIndex = (pageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedShoes = filteredShoes.slice(startIndex, endIndex);

    return {
      shoes: paginatedShoes,
      current_page: pageNum,
      has_next: pageNum < totalPages,
      has_prev: pageNum > 1,
      next_num: pageNum < totalPages ? pageNum + 1 : null,
      prev_num: pageNum > 1 ? pageNum - 1 : null,
      total_pages: totalPages,
      total_shoes: totalShoes,
    };
  };

  // Reset page when search query changes
  useEffect(() => {
    if (id) {
      setPage(1);
    }
  }, [id]);

  // Fetch searched shoes
  useEffect(() => {
    if (id) {
      setLoading(true);
      const searchResults = searchShoes(id, page);
      setAllData(searchResults);
      setStock(searchResults.shoes);
      setLoading(false);
    }
  }, [id, page]);

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

      <div className="lg:px-0 px-3 lg:mt-16 mt-12">
        <p className="lg:text-3xl text-2xl font-bold">Search result "{id}"</p>

        {stock.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {stock.map(
              (shoe) =>
                Number(shoe.stock) > 0 && (
                  // <Link to={`/shoes/${shoe.uid}`} key={shoe.uid}>
                  //   <div className="relative bg-gray-50 rounded-2xl shadow shadow-zinc-500 p-5">
                  //     <button
                  //       onClick={(e) => {
                  //         e.preventDefault();
                  //         handleFavorite(shoe.id);
                  //       }}
                  //       className={`${
                  //         favoriteShoe.includes(shoe.id)
                  //           ? "bi-heart-fill"
                  //           : "bi-heart"
                  //       } absolute top-7 z-20 bg-transparent text-xl overflow-hidden cursor-default text-red-500 right-2 w-20 h-20`}
                  //     ></button>

                  //     <div className="flex justify-center bg rounded-2xl hover:rotate-0 shadow-inner overflow-hidden">
                  //       <img
                  //         src={shoe.main_picture}
                  //         alt="Shoe"
                  //         className={`h-64 w-full object-contain -rotate-[20deg] hover:rotate-0`}
                  //       />
                  //     </div>

                  //     <div className="mt-4 leading-tight">
                  //       <div className="flex justify-between">
                  //         <p className="font-extrabold text-lg">{shoe.name}</p>
                  //         <button
                  //           onClick={(e) => {
                  //             e.preventDefault();
                  //             addToCart({
                  //               id: shoe.id,
                  //               quantity: 1,
                  //               size: 0,
                  //               img: shoe.main_picture,
                  //               price: shoe.price,
                  //               stock: shoe.stock,
                  //             });
                  //           }}
                  //           className={`font-extrabold text-2xl w-9 h-9 ${
                  //             cart.some((c) => c.id === shoe.id)
                  //               ? "bi-bag-fill text-white bg-cyan-600 rounded-full  text-lg"
                  //               : "bi-bag"
                  //           }`}
                  //         ></button>
                  //       </div>
                  //       <p>
                  //         <span className="bi-cash me-1"></span> {shoe.price}br
                  //       </p>
                  //     </div>
                  //   </div>
                  // </Link>

                  <ShoeCard
                    addToCart={addToCart}
                    cart={cart}
                    favoriteShoe={favoriteShoe}
                    handleFavorite={handleFavorite}
                    shoe={shoe}
                  />
                )
            )}
          </div>
        ) : (
          <div className="col-span-3 lg:p-40 p-5 text-xl mt-10 bg-white rounded ">
            <h1 className="font-bold lg:text-4xl text-2xl mb-5">
              Oppps! search not found
            </h1>
            <p className="text-sm">
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
