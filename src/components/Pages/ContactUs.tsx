import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../Button/Button";
import axios from "axios";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import baseUrl from "../../services/request";
import Loader from "../Button/Loader";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be greater than 3 characters." }),
  email: z.string().email({ message: "Email address required" }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormData = z.infer<typeof schema>;

const ContactUs = () => {
  const [title] = useState("Contact Us");
  useDocumentTitle(title);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    const contact = {
      name: data.username,
      email: data.email,
      message: data.message,
    };

    setLoader(true);

    axios
      .post(`${baseUrl}auth/contact-us`, contact, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setSuccessMsg(true);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(true);
        setLoader(false);
      });
  };

  return (
    <>
      <Navbar />

      {/* Modal */}
      {successMsg && (
        <>
          <div className="overlay bg-neutral-900/50 w-full z-50"></div>
          <div className="flex justify-center align-center">
            <div className="fixed lg:top-60 top-44 z-50 bg-white lg:w-[30%] lg:mx-0 mx-1 secondary-bg rounded-xl border-gradient-2">
              <button
                onClick={() => setSuccessMsg(false)}
                className="absolute right-5 top-3 bi-x-lg text-black"
              ></button>
              <div className="p-8">
                <div className="text-center mt-4">
                  <p className="bi-check-circle-fill text-green-500 text-4xl"></p>
                  <p className="text-black mt-5 text-xl chakra">
                    Thank you for sending us a message Message send
                    Successfully!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="lg:container mx-auto px-3 lg:mt-24 mt-10">
        <p className="text-4xl font-extrabold text-center">Let's chat!</p>
        <div className="flex justify-center">
          <div className="lg:w-[50%] w-full">
            <p className="mt-3 text-xl text-black text-center">
              Question? Complaint? Complement? Idea for a new product? We want
              to hear from you even if it's just to say hi.
            </p>
          </div>
        </div>
        {errorMsg && (
          <p className="text-center mt-10 text-red-500">
            We couldn't accept messages right now!
          </p>
        )}
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-[55%] w-full secondary-bg rounded lg:p-10 py-10 px-3"
          >
            {/* Username */}
            <div className="mb-5">
              <label className="text-sm text-gray-600 block" htmlFor="username">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                name="username"
                className={`bg-white text-black py-3 rounded w-full focus:outline-none px-5 mt-1 block shadow-sm shadow-gray-400 font-poppins text-sm ${
                  errors.username && "border-red-400 border-1 border"
                }`}
              />
              {errors.username && (
                <p className="text-red-400 text-xs pt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="text-sm text-gray-600 block" htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                className={`bg-white text-black py-3 rounded w-full focus:outline-none px-5 mt-1 block shadow-sm shadow-gray-400 font-poppins text-sm ${
                  errors.email && "border-red-400 border-1 border"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs pt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mb-5 relative">
              <label className="text-sm text-gray-600 block" htmlFor="message">
                Your Message
              </label>
              <textarea
                {...register("message")}
                name="message"
                className={`bg-white text-black py-3 rounded w-full focus:outline-none px-5 mt-1 block shadow-sm shadow-gray-400 font-poppins text-sm resize-none h-28 ${
                  errors.message && "border-red-400 border-1 border"
                }`}
              ></textarea>

              {errors.message && (
                <p className="text-red-400 text-xs pt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="mt-8">
              {/* Button */}
              {loader ? <Loader /> : <Button label="Submit" />}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
