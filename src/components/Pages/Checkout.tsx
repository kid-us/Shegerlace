import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Navbar from "../Navbar/Navbar";
import Loader from "../Button/Loader";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import { useCartStore } from "../../stores/useCartStore";
import axios from "axios";
import { ShoeInfo } from "./ProductDetail";
import baseUrl from "../../services/request";
import { StockShoes } from "../../hooks/useStock";
import Loading from "../Loading/Loading";

const schema = z.object({
  name: z.string().min(3, {
    message: "Please insert your name.",
  }),
  address: z.string().min(3, {
    message: "Address must be at least than 5 chars.",
  }),
  promo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const Checkout = () => {
  const { id } = useParams();

  const access_token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { cart } = useCartStore();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const size = searchParams.get("size");
  const qty = searchParams.get("qty");

  const [shoe, setShoe] = useState<StockShoes>();
  const [loading, setLoading] = useState<boolean>(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get Shoes
  useEffect(() => {
    id !== "cart" &&
      axios
        .get<ShoeInfo>(`${baseUrl}store/get-shoe?shoe_id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((response) => {
          const data = response.data.shoe;
          setShoe(data);

          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [id]);

  // Title
  useEffect(() => {
    if (shoe) {
      document.title = shoe?.name;
    } else {
      document.title = "Shegerlace Multiple Order";
    }
  }, [id, shoe]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // On form Submit
  const onSubmit = (data: FieldValues) => {
    setLoader(true);

    // Cart
    const cartItems = cart.map((c) => ({
      id: c.id,
      size: c.size,
      quantity: c.quantity,
    }));

    // Single Item
    const singleItems = [{ id: shoe?.id, size: size, quantity: qty }];

    const orderData = {
      customer_name: data.name,
      address: data.address,
      order_items: id === "cart" ? cartItems : singleItems,
    };

    axios
      .post(`${baseUrl}order/create`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/my-orders");
        }, 3000);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  return (
    <>
      {loading && <Loading />}

      {/* Payment Done */}
      {success && (
        <>
          <div className="overlay top-0 z-50"></div>
          <div className="fixed top-0 flex z-50 justify-center items-center h-[100dvh] w-full lg:px-0 px-3">
            <div className="lg:w-[30%] w-full hero-bg rounded px-5 py-10 bg-white shadow shadow-zinc-900">
              <div className="flex justify-between w-full">
                <h2 className="text-black text-2xl">Submitted</h2>
                <p className="text-2xl bi-check-circle-fill text-green-500 text-end"></p>
              </div>
              <p className="text-sm text-black my-5">
                Your request is being processed. Once we verify your payment,
                you will be granted access to track your order in your dashboard
                page. Stay tuned!
              </p>
            </div>
          </div>
        </>
      )}

      <Navbar />

      <div className="container mx-auto">
        <div className="lg:grid grid-cols-2">
          {id !== "cart" ? (
            <div className="lg:px-20 lg:sticky top-20 self-start border-r border-gray-300 text-white">
              <div className="lg:py-16 md:py-16 px-3 py-5">
                <h1 className="text-2xl text-black">{shoe?.name}</h1>
                <p className="text-black text-xl mt-2">
                  <span className="bi-cash text-black"></span> {shoe?.price}
                </p>
                <p className="text-black text-lg mt-2">Quantity: {qty}</p>
                <p className="text-black text-lg mt-2">Size: {size}</p>

                <div className="flex justify-center bg-white mt-4 rounded-xl overflow-hidden shadow">
                  <img src={shoe?.main_picture} alt="Shoe" className="h-96" />
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:px-20 lg:sticky top-20 self-start border-r border-gray-300 mt-14">
              <p className="text-xl">Total {cart.length} items </p>
              <div className="mt-5">
                {cart.map((c) => (
                  <div
                    key={c.id}
                    className="grid grid-cols-4 gap-x-5 bg-white rounded-lg p-3 mt-2 shadow shadow-zinc-300"
                  >
                    <div>
                      <img
                        src={c.img}
                        alt="shoes"
                        className="h-28 w-full object-contain"
                      />
                    </div>
                    <div className="flex mt-10 text-sm">
                      <p>Quantity : </p>
                      <p className="ms-2"> {c.quantity} </p>
                    </div>
                    <div className="flex mt-10 text-sm">
                      <p>Size : </p>
                      <p className="ms-2"> {c.size} </p>
                    </div>
                    <div className="flex mt-10 text-sm">
                      <p>Price : </p>
                      <p className="ms-2"> {c.price} </p>
                    </div>
                  </div>
                ))}

                <p className="mt-4 text-xl">
                  Total Payment:{" "}
                  {cart.reduce((total, item) => {
                    return total + Number(item.price) * item.quantity;
                  }, 0)}
                </p>
              </div>
            </div>
          )}

          <div className="lg:px-20 lg:py-16 md:py-20 px-3 py-5">
            <h1 className="text-2xl text-black">Order Information</h1>

            <hr className="my-4 border-gray-300" />

            <p>
              Please fill out the order form correctly. We will use your
              information to deliver the product.
            </p>

            <hr className="mt-4 border-gray-300" />

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="my-4">
                <label
                  htmlFor="name"
                  className="block text-sm mb-2 text-gray-600"
                >
                  Your Name
                </label>
                <input
                  {...register("name")}
                  name="name"
                  type="text"
                  className="rounded focus:outline-none shadow shadow-zinc-900 h-14 w-full text-gray-800 px-5 bg-white"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mb-5 mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="my-4">
                <label
                  htmlFor="id"
                  className="block text-sm mb-2 text-gray-600"
                >
                  Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  className="rounded focus:outline-none shadow shadow-zinc-900 h-14 w-full text-gray-800 px-5 bg-white"
                  maxLength={100}
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mb-5 mt-2">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* promo */}
              <div className="my-4">
                <label
                  htmlFor="id"
                  className="block text-sm mb-2 text-gray-600"
                >
                  Promo
                </label>
                <input
                  {...register("promo")}
                  type="text"
                  className="rounded focus:outline-none shadow shadow-zinc-900 h-14 w-full text-gray-800 px-5 bg-white"
                />
                {errors.promo && (
                  <p className="text-xs text-red-600 mb-5 mt-2">
                    {errors.promo.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="mt-8">
                {loader ? <Loader /> : <Button label="Order" />}
                <p className="text-xs text-gray-500 mt-4">
                  Your personal data will be used to process your order.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
