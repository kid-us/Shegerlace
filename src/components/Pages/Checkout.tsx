import { useParams } from "react-router-dom";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Navbar from "../Navbar/Navbar";
import Loader from "../Button/Loader";
import Button from "../Button/Button";
import { Shoes } from "../Home/Hero";
import { hero1 } from "../../assets";
import Footer from "../Footer/Footer";

const schema = z.object({
  name: z.string().min(3, {
    message: "Transfer by must be at least than 3 chars.",
  }),
  transId: z.string().min(5, {
    message: "Transaction by must be at least than 5 chars.",
  }),
  address: z.string().min(3, {
    message: "Address must be at least than 5 chars.",
  }),
});

type FormData = z.infer<typeof schema>;

const Checkout = () => {
  const { id } = useParams();

  const [defaultShoe] = useState<Shoes>({
    id: 1,
    name: "Nike Dunk High",
    color: "547D27",
    img: hero1,
    price: 2999,
  });

  const [promo, setPromo] = useState<boolean>(true);
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoError, setPromoError] = useState<boolean>(false);

  // Handle Promo Submit
  const handlePromoSubmit = () => {
    if (promoCode.length < 5) {
      setPromoError(true);
      return;
    }
    setPromoError(false);
    setPromo(false);
  };

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
    setSuccess(true);

    console.log(data, id);
  };

  return (
    <>
      {/* Promo */}
      {promo && (
        <>
          <div className="overlay top-0 z-50"></div>
          <div className="fixed top-0 flex z-50 justify-center items-center h-[100dvh] w-full lg:px-0 px-3">
            <div className="bg-white w-[500px] p-5 rounded-lg pb-7 ">
              <div className="flex justify-between mb-4">
                <p className="font-bold text-lg">Notice</p>
                <button
                  onClick={() => setPromo(false)}
                  className="bi-x-lg text-lg"
                ></button>
              </div>
              <p className="mt-2 mb-4 text-sm font-bold">
                Have a promo code? Enter it in the field below to enjoy an
                exclusive{" "}
                <span className="text-green-500 uppercase">discount</span> on
                your purchase!
              </p>

              <input
                name="promo_code"
                type="text"
                className="rounded focus:outline-none shadow shadow-zinc-900 h-12 text-gray-800 px-5 bg-white block w-full placeholder:text-gray-500"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.currentTarget.value)}
              />
              {promoError && (
                <p className="text-xs text-red-600 pt-1">Insert promo code</p>
              )}
              <button
                onClick={handlePromoSubmit}
                className="btn-bg w-full rounded mt-3 h-11 shadow shadow-zinc-900"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}

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
          <div className="lg:px-20 lg:sticky top-20 self-start border-r border-gray-300 text-white">
            <div className="lg:py-16 md:py-16 px-3 py-5">
              <h1 className="text-2xl text-black">{defaultShoe.name}</h1>
              <p className="text-black text-xl mt-2">
                <span className="bi-cash text-black"></span> {defaultShoe.price}
              </p>
              <p className="text-black text-lg mt-2">Quantity: 1</p>
              <p className="text-black text-lg mt-2">Size: 40</p>

              <div className="flex justify-center bg-white mt-4 rounded-xl overflow-hidden shadow">
                <img src={defaultShoe.img} alt="Shoe" className="h-96" />
              </div>
            </div>
          </div>

          <div className="lg:px-20 lg:py-16 md:py-20 px-3 py-5">
            <h1 className="text-2xl text-black">Payment Info</h1>

            <hr className="my-4 border-gray-300" />
            <h1 className="text-black font-bold mb-2">Pay with : Tele birr</h1>
            <p>
              Send{" "}
              <span className="text-green-600 font-bold text-xl">
                {defaultShoe.price}
              </span>{" "}
              br to the phone number{" "}
              <span className="text-blue-500 text-xl">099386658</span>, and from
              the confirmation SMS, insert the transaction ID, your name as the
              payer, and the date you made the payment. That's it.
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
                  Transfer By
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

              {/* ID */}
              <div className="my-4">
                <label
                  htmlFor="id"
                  className="block text-sm mb-2 text-gray-600"
                >
                  Transaction Number / ID
                </label>
                <input
                  {...register("transId")}
                  type="text"
                  className="rounded focus:outline-none shadow shadow-zinc-900 h-14 w-full text-gray-800 px-5 bg-white"
                />
                {errors.transId && (
                  <p className="text-xs text-red-600 mb-5 mt-2">
                    {errors.transId.message}
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
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mb-5 mt-2">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="mt-8">
                {loader ? <Loader /> : <Button label="Submit Payment" />}
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
