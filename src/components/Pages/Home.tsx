import Hero from "../Home/Hero";
import Navbar from "../Navbar/Navbar";
import Filter from "../Filter/Filter";
import Products from "../Products/Products";
import { useEffect, useState } from "react";
import SmFilter from "../Filter/SmFilter";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";

const Home = () => {
  const [filter, setFilter] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <>
      {/* Loading */}
      {loading && <Loading />}
      {filter && <SmFilter onFilter={() => setFilter(false)} />}
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* Shoes */}
      <div className="lg:hidden flex justify-between lg:mt-0 mt-14 mb-5">
        <h1 className="mx-2 lg:text-3xl text-xl font-extrabold uppercase">
          Shop By Classics
        </h1>
        <button onClick={() => setFilter(true)} className="me-2">
          Filter <span className="bi-sliders text-lg ms-1"></span>{" "}
        </button>
      </div>
      <div className="lg:grid grid-cols-12 gap-x-5 lg:px-20">
        <div className="lg:block border-r border-gray-300 hidden sticky top-24 self-start col-span-2  px-2 my-6">
          <Filter />
        </div>
        <div className="lg:col-span-10 grid lg:grid-cols-3 px-2 py-5 gap-x-5 gap-y-10">
          <Products />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
