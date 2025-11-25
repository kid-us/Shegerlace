import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../services/request";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { account, logo_sm } from "../assets";
import Button from "../components/Button/Button";
import Loader from "../components/Button/Loader";

const schema = z.object({
  password: z.string().min(4, {
    message: "Password must be at least than 4 chars.",
  }),
  username: z
    .string()
    .min(3, { message: "Username must be at least than 3 chars." })
    .regex(/^[A-Za-z0-9 ]+$/, {
      message: "Username can only contain letters, numbers, and spaces.",
    }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [title] = useState("Login");
  useDocumentTitle(title);

  const navigate = useNavigate();

  const [loader, setLoader] = useState<boolean>(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordType, setPasswordType] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    setLoader(true);
    const logData = {
      username: data.username,
      password: data.password,
    };

    axios
      .post(`${baseUrl}auth/login`, logData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoginError(true);
        setLoader(false);
      });
  };

  return (
    <div className="bg">
      <div className="flex justify-center items-center h-[100dvh] w-full">
        <div className="lg:grid grid-cols-2 lg:w-[80%] w-full lg:px-2 px-2 lg:mt-10">
          <div className="col-span-2 mb-6 w-10 lg:ms-0 ms-5">
            <Link to={"/"}>
              <img src={logo_sm} alt="Logo" className="w-10" />
            </Link>
          </div>

          <div className="lg:flex hidden justify-center rounded-l-xl overflow-hidden">
            <img
              src={account}
              alt="Logo"
              className="object-cover h-[500px] w-full"
            />
          </div>
          <form
            className="lg:bg-white lg:p-10 pb-10 px-6 rounded-r-xl overflow-hidden"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-2xl font-bold mb-10">Sign up</p>
            {/* Error */}
            {loginError && (
              <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak font-poppins">
                &nbsp; Invalid username or Password.
              </p>
            )}
            {/* Username */}
            <div className="lg:bg-primary bg-white rounded-md overflow-hidden lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow-sm shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-person-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l border-gray-300 w-full">
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  className={`focus:outline-none px-3 lg:bg-primary md:bg-white bg-white h-full placeholder:text-gray-500 text-md w-full`}
                  placeholder="Username"
                  autoComplete="off"
                />
              </div>
            </div>
            {errors.username && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                {errors.username.message}
              </p>
            )}

            {/* Password */}
            <div className="lg:bg-primary bg-white rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow-sm shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-lock-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-9 border-l border-gray-300 border-r w-full">
                <input
                  {...register("password")}
                  type={!passwordType ? "text" : "password"}
                  name="password"
                  className={`focus:outline-none px-3 lg:bg-primary bg-white h-full placeholder:text-gray-500 text-md w-full`}
                  placeholder="Password"
                  autoComplete="off"
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

            <p className="text-sm text-end text-white">
              <Link to="/request" className="font-poppins text-blue-600">
                Forgot Password?
              </Link>
            </p>

            <div className="mt-8 text-center">
              {loader ? <Loader /> : <Button label="Login" />}
            </div>
            <p className="mt-5 text-sm font-poppins">
              Don't have an Account?{" "}
              <Link to="/register" className="text-blue-600 font-poppins">
                Register
              </Link>
            </p>
            <p className="text-xs mt-5 text-gray-600">
              By clicking the Sign In button below, you agree to the our terms
              of service and acknowledge the{" "}
              <Link to="/privacy-policy" className="text-blue-600 font-bold">
                Privacy Policy.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
