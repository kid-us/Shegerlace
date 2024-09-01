import { Link } from "react-router-dom";
import { hero1 } from "../../assets";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const MyOrders = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto lg:px-0 px-4">
        <p className="mt-8 text-lg">
          Welcome <span className="text-color font-bold">Lorem</span>
        </p>

        <div className="flex my-5 gap-x-10">
          <Link
            to={"/my-orders"}
            className="uppercase mb-3 btn-bg text-white p-2 rounded shadow-inner shadow-black w-40 text-center font-bold"
          >
            Your Orders
          </Link>
          <Link
            to={"/my-favorites"}
            className="mb-3 btn-bg shadow shadow-zinc-900 rounded text-center w-40 p-2 text-white font-bold"
          >
            My Favorite
          </Link>
        </div>

        <p className="mb-4">Your orders are here</p>

        {/* Orders */}
        <div className="lg:grid grid-cols-3 gap-x-10 border-b border-gray-400 pb-5 lg:px-0 px-4">
          <div className="bg-white rounded-lg flex justify-center shadow">
            <img src={hero1} alt="shoes" className="h-72" />
          </div>
          <div className="col-span-2 lg:mt-0 mt-4">
            <p>Ordered by : Lorem / You</p>
            <p>Ordered Date : 12-21-2012</p>
            <p>Quantity : 1</p>
            <p>Size: 40</p>
            <p>
              Status :{" "}
              <span className="bg-blue-500 rounded px-5 text-white  py-[1px] shadow">
                Pending
              </span>
            </p>
          </div>
        </div>

        {/* Empty */}
        <div className="flex justify-center items-center h-[40dvh]">
          <div className="bg-white rounded px-3 py-5 shadow shadow-zinc-900">
            <p className="mb-4">
              You haven't ordered our Shoes yet, but when you do, they will be
              displayed here.
            </p>
            <Link
              to={"/"}
              className="btn-bg rounded py-2 px-10 text-white shadow shadow-zinc-900 font-bold"
            >
              Order now
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
