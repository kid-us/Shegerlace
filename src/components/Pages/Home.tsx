import Hero from "../Home/Hero";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* Shoes */}
      <div className="grid grid-cols-12 gap-x-5 mx-10 mt-5">
        <div className="col-span-2 border border-black px-2 py-5">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reprehenderit, dicta. Veritatis suscipit repellat quos
            necessitatibus quisquam. Eos deleniti doloribus iure odio, excepturi
            deserunt temporibus cupiditate ea, natus quas quos quo.
          </p>
        </div>
        <div className="col-span-10 border border-black px-2 py-5">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
            corporis vero iusto distinctio veniam quam ad aperiam nihil labore
            est ab magni, explicabo expedita dolores esse minus qui, aut
            exercitationem.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
