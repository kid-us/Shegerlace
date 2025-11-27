import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useFavorite from "../../hooks/useFavorite";
import mockStockShoes from "../../services/stockShoes";
import { useCartStore } from "../../stores/useCartStore";
import { useFilter } from "../../stores/useFilter";
import { AllShoes } from "../../hooks/useStock";
import useUsername from "../../hooks/useUsername";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShoeCard from "../Card/ShoeCard";

const ITEMS_PER_PAGE = 9;

const Products = () => {
  const { addToCart, cart } = useCartStore();
  const { favorite } = useFavorite();
  const { username } = useUsername();
  const navigate = useNavigate();

  const { brand, category, price, size } = useFilter();

  const [favoriteShoe, setFavoriteShoe] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);

  // Set Favorites from useFavorite hook
  useEffect(() => {
    if (favorite.length > 0) {
      const favoriteIds = favorite.map((f) => f.id);
      setFavoriteShoe(favoriteIds);
    }
  }, [favorite]);

  // Filter and paginate shoes
  const { filteredShoes, allData } = useMemo(() => {
    let filtered = [...mockStockShoes];

    // Apply category filter
    if (category) {
      filtered = filtered.filter(
        (shoe) => shoe.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply brand filter
    if (brand) {
      filtered = filtered.filter(
        (shoe) => shoe.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Apply price filter
    if (price) {
      const minPrice = Number(price.min);
      const maxPrice = Number(price.max);
      filtered = filtered.filter(
        (shoe) => shoe.price >= minPrice && shoe.price <= maxPrice
      );
    }

    // Apply size filter
    if (size) {
      const sizeStart = Number(size.start);
      const sizeEnd = Number(size.end);
      filtered = filtered.filter((shoe) => {
        const [rangeStart, rangeEnd] = shoe.size_range.split("-").map(Number);
        return (
          (sizeStart >= rangeStart && sizeStart <= rangeEnd) ||
          (sizeEnd >= rangeStart && sizeEnd <= rangeEnd) ||
          (sizeStart <= rangeStart && sizeEnd >= rangeEnd)
        );
      });
    }

    // Filter out items with stock <= 0
    filtered = filtered.filter((shoe) => Number(shoe.stock) > 0);

    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedShoes = filtered.slice(startIndex, endIndex);

    const allDataResult: AllShoes = {
      shoes: paginatedShoes,
      current_page: page,
      has_next: page < totalPages,
      has_prev: page > 1,
      next_num: page < totalPages ? page + 1 : null,
      prev_num: page > 1 ? page - 1 : null,
      total_pages: totalPages,
      total_shoes: filtered.length,
    };

    return {
      filteredShoes: paginatedShoes,
      allData: allDataResult,
    };
  }, [brand, category, price, size, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [brand, category, price, size]);

  // Handle Favorite (static version)
  const handleFavorite = (id: number) => {
    if (username) {
      if (favoriteShoe.includes(id)) {
        // Remove from favorites
        setFavoriteShoe(favoriteShoe.filter((favId) => favId !== id));
      } else {
        // Add to favorites
        setFavoriteShoe([...favoriteShoe, id]);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:px-2 px-5 py-5 lg:gap-x-5 lg:gap-y-10 gap-8">
        {filteredShoes.length > 0 ? (
          filteredShoes.map((shoe) => (
            <ShoeCard
              addToCart={addToCart}
              cart={cart}
              favoriteShoe={favoriteShoe}
              handleFavorite={handleFavorite}
              shoe={shoe}
            />
          ))
        ) : (
          <p className="col-span-3 lg:px-20 p-4 text-xl mt-5 bg-white rounded py-5">
            Sorry, no items match your current filter selections. Try modifying
            the filters or clearing them to explore a wider range of options.
          </p>
        )}
      </div>

      {/* Pagination */}
      {allData.total_shoes >= ITEMS_PER_PAGE && (
        <div className="flex justify-end mt-10 lg:me-0 me-5">
          <div className="flex gap-x-2">
            {/* prev */}
            <button
              onClick={() => allData.has_prev && setPage(page - 1)}
              disabled={!allData.has_prev}
              className={`${
                !allData.has_prev
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "btn-bg text-white"
              } rounded text-sm p-1 h-8 hover:scale-105`}
            >
              <ChevronLeft />
            </button>
            {/* Current */}
            <p className="flex items-center justify-center bg-white w-14 h-8 rounded text-sm text-center">
              {allData.current_page} of {allData.total_pages}
            </p>
            {/*next  */}
            <button
              onClick={() => allData.has_next && setPage(page + 1)}
              disabled={!allData.has_next}
              className={`${
                !allData.has_next
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "btn-bg text-white"
              } rounded text-sm p-1 h-8 hover:scale-105`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;

// ############# Integration

// import { Link, useNavigate } from "react-router-dom";
// import { useCartStore } from "../../stores/useCartStore";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import baseUrl from "../../services/request";
// import useFavorite from "../../hooks/useFavorite";
// import { AllShoes, StockShoes } from "../../hooks/useStock";
// import { useFilter } from "../../stores/useFilter";
// import { logo_sm } from "../../assets";
// import Loading from "../Loading/Loading";
// import useUsername from "../../hooks/useUsername";

// interface FilterData {
//   min_price?: number;
//   max_price?: number;
//   size?: string;
//   brand?: string;
//   category?: string;
// }

// const Products = () => {
//   const { addToCart, cart } = useCartStore();
//   const { favorite } = useFavorite();

//   const { username } = useUsername();

//   const navigate = useNavigate();

//   const { brand, category, price, size } = useFilter();

//   const [favoriteShoe, setFavoriteShoe] = useState<number[]>([]);

//   const access_token = localStorage.getItem("token");

//   const [allData, setAllData] = useState<AllShoes>();
//   const [stock, setStock] = useState<StockShoes[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [simpleLoading, setSimpleLoading] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Fetch items
//   useEffect(() => {
//     if (category || price || brand || size) {
//       const filterData: FilterData = {
//         ...(price && {
//           min_price: Number(price.min),
//           max_price: Number(price.max),
//         }),
//         ...(size && { size: `${size.start}-${size.end}` }),
//         ...(brand && { brand }),
//         ...(category && { category }),
//       };

//       setSimpleLoading(true);
//       axios
//         .get<AllShoes>(`${baseUrl}store/get-shoes-by-filter`, {
//           params: filterData,
//           headers: {
//             "Content-Type": "application/json",
//             "ngrok-skip-browser-warning": "69420",
//           },
//         })
//         .then((response) => {
//           setSimpleLoading(false);

//           setAllData(response.data);
//           setStock(response.data.shoes);
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//       return;
//     } else {
//       axios
//         .get<AllShoes>(`${baseUrl}store/get-shoes?page=${page}`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//         .then((response) => {
//           setLoading(false);
//           setAllData(response.data);
//           setStock(response.data.shoes);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [page, brand, category, size, price]);

//   // Set Favorites
//   useEffect(() => {
//     if (favorite.length > 0) {
//       const favoriteIds = favorite.map((f) => f.id); // Extract IDs from the favorite array
//       setFavoriteShoe(favoriteIds); // Directly set the favoriteShoe state with the array of IDs
//     }
//   }, [favorite]);

//   // Adding Removing Favorite
//   const handleFavorite = (id: number) => {
//     if (username) {
//       if (favoriteShoe.includes(id)) {
//         // Remove the id from the state
//         axios
//           .post(
//             `${baseUrl}auth/remove-from-favorite?id=${id}`,
//             {},
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${access_token}`,
//               },
//             }
//           )
//           .then(() => {
//             setFavoriteShoe(favoriteShoe.filter((favId) => favId !== id));
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } else {
//         // Add the id to the state
//         axios
//           .post(
//             `${baseUrl}auth/add-to-favorite?id=${id}`,
//             {},
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${access_token}`,
//               },
//             }
//           )
//           .then(() => {
//             setFavoriteShoe([...favoriteShoe, id]);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       {/* Loading */}
//       {loading && <Loading />}

//       <div className="grid lg:grid-cols-3 lg:px-2 px-5 py-5 lg:gap-5 gap-8">
//         {/* simpleLoading */}
//         {simpleLoading ? (
//           <div className="bg col-span-3 h-[60dvh]">
//             <div className="flex justify-center items-center h-full">
//               <img src={logo_sm} alt="logo" className="w-24 animate-pulse" />
//             </div>
//           </div>
//         ) : stock.length > 0 ? (
//           stock.map(
//             (shoe) =>
//               Number(shoe.stock) > 0 && (
//                 <Link to={`/shoes/${shoe.uid}`} key={shoe.uid}>
//                   <div className="relative bg-gray-50 rounded-2xl shadow shadow-zinc-500 p-5">
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleFavorite(shoe.id);
//                       }}
//                       className={`${
//                         favoriteShoe.includes(shoe.id)
//                           ? "bi-heart-fill"
//                           : "bi-heart"
//                       } absolute top-7 z-20 bg-transparent text-xl overflow-hidden cursor-default text-red-500 right-2 w-20 h-20`}
//                     ></button>

//                     <div className="flex justify-center bg rounded-2xl hover:rotate-0 shadow-inner overflow-hidden">
//                       <img
//                         src={shoe.main_picture}
//                         alt="Shoe"
//                         className={`lg:h-64 h-60 w-full object-contain -rotate-[20deg] hover:rotate-0`}
//                       />
//                     </div>

//                     <div className="lg:mt-4 mt-2 leading-tight">
//                       <div className="flex justify-between">
//                         <p className="font-extrabold text-lg">{shoe.name}</p>
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             addToCart({
//                               id: shoe.id,
//                               quantity: 1,
//                               size: 0,
//                               img: shoe.main_picture,
//                               price: shoe.price,
//                               stock: shoe.stock,
//                             });
//                           }}
//                           className={`font-extrabold text-2xl w-9 h-9 ${
//                             cart.some((c) => c.id === shoe.id)
//                               ? "bi-bag-fill text-white bg-cyan-600 rounded-full  text-lg"
//                               : "bi-bag"
//                           }`}
//                         ></button>
//                       </div>
//                       <p>
//                         <span className="bi-cash me-1"></span> {shoe.price}br
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               )
//           )
//         ) : (
//           <p className="col-span-3 lg:px-20 p-4 text-xl mt-5 bg-white rounded py-5">
//             Sorry, no items match your current filter selections. Try modifying
//             the filters or clearing them to explore a wider range of options.
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       {stock.length >= 10 && (
//         <div className="flex justify-end mt-2">
//           <div className="flex gap-x-2">
//             {/* prev */}
//             <button
//               onClick={() =>
//                 allData?.has_prev && setPage(allData ? page - 1 : 0)
//               }
//               disabled={allData?.has_prev === false ? true : false}
//               className={`${
//                 allData?.has_prev === false
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "btn-bg"
//               } w-20 rounded text-sm h-7`}
//             >
//               Prev
//             </button>
//             {/* Current */}
//             <p className="bg-white w-14 rounded text-sm h-7 text-center pt-[6px]">
//               {allData?.current_page} of {allData?.total_pages}
//             </p>
//             {/*next  */}
//             <button
//               onClick={() =>
//                 allData?.has_next && setPage(allData ? page + 1 : 0)
//               }
//               disabled={allData?.has_next === false ? true : false}
//               className={`${
//                 allData?.has_next === false
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "btn-bg"
//               } w-20 rounded text-sm h-7`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Products;
