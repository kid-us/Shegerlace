import { hero1 } from "../../assets";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="lg:grid grid-cols-2">
          <div className="pt-52">
            <h1 className="font-cousine font-extrabold text-5xl">
              Unleash Your Sole, Discover Your Style.
            </h1>
          </div>
          <div>{/* <img src={hero1} alt="" className="-rotate-45" /> */}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
