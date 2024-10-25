import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import useAuth from "../../stores/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../services/request";

interface OrderItems {
  brand: string;
  category: string;
  id: number;
  main_picture: "https://api.shegerlace.com/v1/store/images?_path=2c4c49e7c78e4696a2611a56023ab648.png";
  name: string;
  price: number;
  quantity: number;
  size: string;
  size_range: string;
  stock: number;
  uid: string;
}

interface OrderInfo {
  created_at: string;
  customer_id: number;
  customer_name: string;
  discount: number;
  discount_price: number;
  id: number;
  order_items: OrderItems[];
  promocode: string;
  status: string;
  total_price: string;
}

interface Orders {
  has_next: boolean;
  has_prev: boolean;
  next_num: null;
  orders: OrderInfo[];
  page: number;
  pages: number;
  prev_num: number | null;
  total: number;
}

const MyOrders = () => {
  const { username } = useAuth();

  const access_token = localStorage.getItem("token");

  const [allData, setAllData] = useState<Orders>();
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [page, setPage] = useState<number>(1);

  // Fetch Orders
  useEffect(() => {
    axios
      .get<Orders>(`${baseUrl}order/my-orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setAllData(response.data);
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto lg:px-0 px-4">
        <p className="lg:mt-8 mt-5 text-lg">
          Welcome <span className="text-color font-bold">{username}</span>
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

        {/* Orders */}
        {orders.length > 0 ? (
          <>
            <p className="mb-4">Your orders are here</p>
            <div className="lg:grid grid-cols-2">
              {orders.map((o) =>
                o.order_items.map((i) => (
                  <div
                    key={i.id}
                    className="lg:grid grid-cols-4 gap-x-5 shadow rounded mb-4 lg:me-4"
                  >
                    <div className="col-span-2 bg-white rounded-lg flex justify-center shadow">
                      <img src={i.main_picture} alt="shoes" className="h-72" />
                    </div>

                    <div className="col-span-2 lg:mt-0 mt-4 lg:pt-5 p-4">
                      <p>Ordered by : {o.customer_name} / You</p>
                      <p>Ordered Date : {formatDate(o.created_at)}</p>
                      <p>Quantity : {i.quantity}</p>
                      <p>Size: {i.size}</p>
                      <div className="flex gap-x-3">
                        <p>Status : </p>

                        <p
                          className={`${
                            o.status === "pending"
                              ? "bg-blue-500"
                              : o.status === "approved"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          } rounded px-5 text-white py-[1px] shadow first-letter:uppercase`}
                        >
                          {o.status}
                        </p>
                      </div>
                      {o.status === "pending" && (
                        <button className="bg-red-500 w-full rounded text-center py-2 mt-5 text-white shadow">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
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
        )}

        {/* Pagination */}
        {orders.length >= 10 && (
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
                {allData?.page} of {allData?.pages}
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

export default MyOrders;
