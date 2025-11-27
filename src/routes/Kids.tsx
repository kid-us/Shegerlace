import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useMemo, useState } from "react";
import { AllShoes } from "../hooks/useStock";
import Loading from "../components/Loading/Loading";
import { useCartStore } from "../stores/useCartStore";
import useFavorite from "../hooks/useFavorite";
import useUsername from "../hooks/useUsername";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { mockStockShoes } from "../services/stockShoes";
import Filter from "../components/Filter/Filter";
import SmFilter from "../components/Filter/SmFilter";
import { useFilter } from "../stores/useFilter";
import ShoeCard from "../components/Card/ShoeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { kids } from "../assets";

const Kids = () => {
  // Title
  const [title] = useState("Kids");
  useDocumentTitle(title);

  const { username } = useUsername();

  const { addToCart, cart } = useCartStore();
  const { favorite } = useFavorite();
  const { brand, price, size, updateCategory } = useFilter();

  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteShoe, setFavoriteShoe] = useState<number[]>([]);
  const [filter, setFilter] = useState<boolean>(false);

  // Set category filter on mount
  useEffect(() => {
    updateCategory("Kids");
    return () => {
      updateCategory(null);
    };
  }, [updateCategory]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and paginate shoes
  const { filteredShoes, allData } = useMemo(() => {
    let filtered = mockStockShoes.filter(
      (shoe) => shoe.category.toLowerCase() === "kids"
    );

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
    const ITEMS_PER_PAGE = 9;
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
  }, [brand, price, size, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [brand, price, size]);

  // Set loading to false after initial load
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Set Favorites
  useEffect(() => {
    if (favorite.length > 0) {
      const favoriteIds = favorite.map((f) => f.id);
      setFavoriteShoe(favoriteIds);
    }
  }, [favorite]);

  // Adding Removing Favorite
  const handleFavorite = (id: number) => {
    if (username) {
      if (favoriteShoe.includes(id)) {
        setFavoriteShoe(favoriteShoe.filter((favId) => favId !== id));
      } else {
        setFavoriteShoe([...favoriteShoe, id]);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {filter && <SmFilter onFilter={() => setFilter(false)} />}
      {/* Loading */}
      {loading && <Loading />}

      <Navbar />

      {/* Filter button for mobile */}
      <div className="lg:hidden flex justify-between lg:mt-0 mt-14 mb-5 px-3">
        <h1 className="text-xl font-extrabold uppercase">Kids</h1>
        <button onClick={() => setFilter(true)} className="me-2">
          Filter <span className="bi-sliders text-lg ms-1"></span>
        </button>
      </div>

      <div className="lg:grid grid-cols-12 gap-x-5 lg:px-0 px-3 lg:mt-10 mt-6">
        {/* Filter sidebar for desktop */}
        <div className="lg:block hidden col-span-2 px-2 pt-6 self-start sticky top-[100px]">
          <Filter hideCategory kidsSize />
        </div>

        {/* Products */}
        <div className="w-full lg:col-span-10">
          <p className="text-xl font-bold lg:block hidden">
            Kids ({filteredShoes.length})
          </p>
          <img
            src={kids}
            alt="Kids"
            className="mt-8 rounded lg:h-[370px] md:h-[250px] h-[220px] object-cover w-full object-bottom"
          />

          {filteredShoes.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-10">
                {filteredShoes.map((shoe) => (
                  <ShoeCard
                    addToCart={addToCart}
                    cart={cart}
                    favoriteShoe={favoriteShoe}
                    handleFavorite={handleFavorite}
                    shoe={shoe}
                  />
                ))}
              </div>

              {/* Pagination */}
              {allData.total_shoes >= 9 && (
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
          ) : (
            <div className="mt-5 h-[40dvh]">
              <p>
                It looks like we sell every kids's shoe. We will post the new
                ones here, so stay tuned!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Kids;
