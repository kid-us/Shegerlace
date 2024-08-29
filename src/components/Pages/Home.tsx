import Hero from "../Home/Hero";
import Navbar from "../Navbar/Navbar";
import Filter from "../Filter/Filter";
import Products from "../Products/Products";
import { useState } from "react";
import SmFilter from "../Filter/SmFilter";

const Home = () => {
  const [filter, setFilter] = useState<boolean>(false);
  return (
    <>
      {filter && <SmFilter onFilter={() => setFilter(false)} />}
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* Shoes */}
      <div className="lg:hidden flex justify-between lg:mt-0 mt-14 mb-5">
        <h1 className="lg:mx-20 mx-2 lg:text-3xl text-xl font-extrabold uppercase">
          Shop By Classics
        </h1>
        <button onClick={() => setFilter(true)} className="me-2">
          Filter <span className="bi-sliders text-lg ms-1"></span>{" "}
        </button>
      </div>
      <div className="lg:grid grid-cols-12 gap-x-5 lg:mx-20">
        <div className="lg:block hidden sticky top-6 self-start col-span-2 border px-2 py-5">
          <Filter />
        </div>
        <div className="lg:col-span-10 grid lg:grid-cols-3 px-2 py-5 gap-x-5 gap-y-10">
          <Products />
        </div>
      </div>
    </>
  );
};

export default Home;
