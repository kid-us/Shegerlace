import Hero from "../components/Home/Hero";
import Navbar from "../components/Navbar/Navbar";
import Filter from "../components/Filter/Filter";
import Products from "../components/Products/Products";
import { useEffect, useState } from "react";
import SmFilter from "../components/Filter/SmFilter";
import Footer from "../components/Footer/Footer";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { kidPick, menPick, womenPick } from "../assets";
import { Link } from "react-router-dom";

const Home = () => {
  const [title] = useState("Shegeralce");
  useDocumentTitle(title);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState<boolean>(false);

  return (
    <>
      {filter && <SmFilter onFilter={() => setFilter(false)} />}
      <Navbar />
      {/* Hero */}
      <Hero />

      {/* Banners */}
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-1 mb-20">
        <Link to={"/mens"} className="relative group overflow-hidden">
          <p className="absolute z-10 h1-font bottom-2 left-2 text-white text-xl font-bold uppercase">
            Men's
          </p>
          <img
            src={menPick}
            alt="Mens"
            className="h-80 object-cover w-full grayscale-[100%] transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <Link to={"/women"} className="relative group overflow-hidden">
          <p className="absolute z-10 h1-font bottom-2 left-2 text-black text-xl font-bold uppercase">
            Women's
          </p>
          <img
            src={womenPick}
            alt="Women's"
            className="h-80 object-cover w-full grayscale-[100%] transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <Link to={"/kids"} className="relative group overflow-hidden">
          <p className="absolute z-10 h1-font bottom-2 left-2 text-black text-xl font-bold uppercase">
            Kid's
          </p>
          <img
            src={kidPick}
            alt="Kids"
            className="h-80 object-cover w-full grayscale-[100%] transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Shoes */}
      <div className="lg:hidden flex justify-between lg:mt-0 mt-14 mb-5">
        <h1 className="mx-2 lg:text-3xl text-xl font-extrabold uppercase">
          Shop By Classics
        </h1>
        <button onClick={() => setFilter(true)} className="me-2">
          Filter <span className="bi-sliders text-lg ms-1"></span>{" "}
        </button>
      </div>
      <div className="lg:grid grid-cols-12 gap-x-5">
        <div className="lg:block hidden col-span-2 px-2 pt-6 self-start sticky top-[100px]">
          <Filter />
        </div>

        <div className="w-full lg:col-span-10">
          <Products />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
