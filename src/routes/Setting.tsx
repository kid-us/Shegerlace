import { useEffect, useState } from "react";
import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentTitle from "../hooks/useDocumentTitle";
import axios from "axios";
import baseUrl from "../services/request";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import useAuth from "../stores/useAuth";
import Loader from "../components/Button/Loader";

const schema = z.object({
  phone: z.string().min(10, { message: "Phone number required." }),
  password: z.string().min(4, {
    message: "Password required and must be greater than 4 chars.",
  }),
  username: z
    .string()
    .min(3, { message: "Username required and must be greater than 3 chars." })
    .regex(/^[A-Za-z0-9 ]+$/, {
      message: "Username can only contain letters, numbers, and spaces.",
    }),
});

type FormData = z.infer<typeof schema>;

const Setting = () => {
  const [title] = useState("Setting");
  useDocumentTitle(title);

  const access_token = localStorage.getItem("token");

  const { email, phone_number, username } = useAuth();

  const [passwordType, setPasswordType] = useState(true);

  const [phone, setPhone] = useState<string>(phone_number ? phone_number : "");
  const [userName, setUserName] = useState<string>(username ? username : "");
  const [emailAddress, setEmailAddress] = useState<string>(email ? email : "");

  const [loader, setLoader] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setPhone(phone_number || "");
    setUserName(username || "");
    setEmailAddress(email || "");
    // Set Value
    setValue("phone", phone_number || "");
    setValue("username", username || "");
  }, [phone_number, username, email]);

  const onSubmit = (data: FieldValues) => {
    const updateData = {
      phone_number: data.phone,
      username: data.username,
      password: data.password,
    };

    setLoader(true);

    axios
      .get(`${baseUrl}auth/check-username?username=${data.username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setUsernameError(false);
        axios
          .put(`${baseUrl}auth/update`, updateData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(() => {
            setLoader(false);
            window.location.reload();
          })
          .catch((error) => {
            setLoader(false);
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setUsernameError(true);
      });
  };

  return (
    <div className="h-[100dvh]">
      <Navbar />
      <div className="flex justify-center items-center lg:h-[70dvh] h-[80dvh]">
        <div className="lg:w-[38%] w-full lg:px-2 px-5">
          <p className="lg:mt-5 lg:mb-4 text-xl font-poppins">
            Change on your account setting
          </p>

          {/* <!-- Category Form --> */}
          <p className="text-black font-bold text-xs">
            <span className="bi-quote text-black text"></span>
            You can change your Username, Phone Number and Password Separately
            or Both at the same Time!
            <span className="bi-quote text-black"></span>
          </p>

          <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
            {usernameError && (
              <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak font-poppins">
                &nbsp; Username already taken!
              </p>
            )}

            {/* Username */}
            <div className="lg:bg-primary bg-white rounded-md overflow-hidden lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2 bg-white">
                <p className="bi-person-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l border-gray-300 w-full">
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  className={`focus:outline-none px-3 bg-white h-full placeholder:text-gray-500 text-md w-full`}
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.currentTarget.value)}
                />
              </div>
            </div>
            {errors.username && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                {errors.username.message}
              </p>
            )}

            {/* Email */}
            <div className="lg:bg-primary bg-white rounded-md overflow-hidden lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2 bg-gray-300">
                <p className="bi-envelope-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l border-gray-300 w-full">
                <input
                  type="text"
                  name="email"
                  className={`focus:outline-none px-3 h-full placeholder:text-gray-500 text-md w-full bg-gray-300`}
                  placeholder="Username"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.currentTarget.value)}
                  readOnly
                />
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white overflow-hidden rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-telephone-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l border-gray-300">
                <input
                  {...register("phone")}
                  type="tel"
                  name="phone"
                  className={`focus:outline-none px-3 bg-white h-full placeholder:text-gray-500 text-md w-full`}
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                />
              </div>
            </div>
            {errors.phone && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                {errors.phone.message}
              </p>
            )}

            {/* Password */}
            <div className="bg-white rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-lock-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-9 border-l border-gray-300 border-r w-full">
                <input
                  {...register("password")}
                  type={!passwordType ? "text" : "password"}
                  name="password"
                  className={`focus:outline-none px-3 bg-white h-full placeholder:text-gray-500 text-md w-full`}
                  placeholder="Password"
                />
              </div>
              <div
                onClick={() => setPasswordType(!passwordType)}
                className="col-span-2 cursor-pointer pt-3"
              >
                <p
                  className={` ${
                    passwordType ? "bi-eye-fill" : "bi-eye-slash-fill"
                  } text-xl pt-1 text-center`}
                ></p>
              </div>
            </div>
            {errors.password && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                {errors.password.message}
              </p>
            )}

            <div className="mt-8 text-center">
              {loader ? (
                <Loader />
              ) : (
                <button className="py-3 text-black btn-bg w-full rounded font-poppins text-lg shadow shadow-zinc-950">
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Setting;
