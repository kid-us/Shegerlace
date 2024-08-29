import Hero from "../Home/Hero";
import Navbar from "../Navbar/Navbar";
import Filter from "../Filter/Filter";
import Products from "../Products/Products";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* Shoes */}
      <div className="flex justify-between lg:mt-0 mt-10 mb-5">
        <h1 className="lg:mx-14 mx-2 lg:text-3xl text-xl font-extrabold uppercase">
          Shop By Classics
        </h1>
        <button className="text-xl">
          {" "}
          Filter <span className="bi-sliders text-xl"></span>{" "}
        </button>
      </div>
      <div className="lg:grid grid-cols-12 gap-x-5 lg:mx-14">
        <Filter />

        <div className="lg:col-span-10 grid lg:grid-cols-3 px-2 py-5 gap-x-5 gap-y-10">
          <Products />
        </div>
      </div>
    </>
  );
};

export default Home;
