import { account, logo_sm } from "../../assets";
import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../services/request";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Button from "../Button/Button";
import Loader from "../Button/Loader";

const schema = z.object({
  password: z.string().min(4, {
    message: "Password must be at least than 4 chars.",
  }),
  email: z.string().email({ message: "Email address required" }),
  phone: z.string().min(10, { message: "Phone number required." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least than 3 chars." })
    .regex(/^[A-Za-z0-9 ]+$/, {
      message: "Username can only contain letters, numbers, and spaces.",
    }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [title] = useState("Register");
  useDocumentTitle(title);

  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    if (data.password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }
    setConfirmPasswordError(false);
    setLoader(true);

    const RegData = {
      username: data.username,
      password: data.password,
      phone_number: data.phone,
      email: data.email,
    };

    axios
      .get(`${baseUrl}auth/check-username?username=${data.username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setUsernameError(false);
        axios
          .get(`${baseUrl}auth/check-email?email=${data.email}`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            setEmailError(false);
            axios
              .post(`${baseUrl}auth/pre-register`, RegData, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then(() => {
                navigate(`/verify-email?email=${data.email}`);
              })
              .catch((error) => {
                setLoader(false);
                console.log(error);
                setRegisterError(true);
              });
          })
          .catch((error) => {
            setLoader(false);
            console.log(error);
            setEmailError(true);
          });
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        setUsernameError(true);
      });
  };

  return (
    <div className="bg3">
      <div className="container mx-auto flex justify-center items-center h-[100dvh]">
        <div className="lg:grid grid-cols-2 lg:w-[80%] w-full px-2">
          <div className="col-span-2 mb-6 w-10 lg:ms-0 ms-5 lg:mt-0 mt-28">
            <Link to={"/"}>
              <img src={logo_sm} alt="Logo" className="w-10" />
            </Link>
          </div>

          <div className="lg:flex hidden justify-center rounded-l-xl overflow-hidden">
            <img src={account} alt="Logo" className="w-full" />
          </div>
          <form
            className="lg:bg-white lg:p-10 pb-10 px-6 rounded-r-xl overflow-hidden"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Register Error */}
            {registerError && (
              <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak font-poppins">
                &nbsp; Something went wrong.
              </p>
            )}
            {/* Email error */}
            {emailError && (
              <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak font-poppins">
                &nbsp; Email already exist.
              </p>
            )}
            {/* Username Error */}
            {usernameError && (
              <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak font-poppins">
                &nbsp; Username already exist.
              </p>
            )}

            {/* Username */}
            <div className="lg:bg-primary bg-white overflow-hidden rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-person-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l border-gray-300">
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  className={`focus:outline-none px-3 lg:bg-primary bg-white h-full placeholder:text-gray-500 text-md w-full pe-3`}
                  placeholder="Username"
                />
              </div>
            </div>
            {errors.username && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                {errors.username.message}
              </p>
            )}

            {/* Email */}
            <div className="lg:bg-primary bg-white overflow-hidden rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-envelope-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l border-gray-300">
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  className={`focus:outline-none px-3 lg:bg-primary bg-white h-full placeholder:text-gray-500 text-md w-full pe-3`}
                  placeholder="Email"
                />
              </div>
            </div>
            {errors.email && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                {errors.email.message}
              </p>
            )}

            {/* Phone */}
            <div className="lg:bg-primary bg-white overflow-hidden rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-telephone-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l border-gray-300">
                <input
                  {...register("phone")}
                  type="tel"
                  name="phone"
                  className={`focus:outline-none px-3 lg:bg-primary bg-white h-full placeholder:text-gray-500 text-md w-full`}
                  placeholder="Phone"
                />
              </div>
            </div>
            {errors.phone && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                {errors.phone.message}
              </p>
            )}

            {/* Password */}
            <div className="lg:bg-primary bg-white overflow-hidden rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-lock-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-9 border-l border-r border-gray-300">
                <input
                  {...register("password")}
                  type={!passwordType ? "text" : "password"}
                  name="password"
                  className={`focus:outline-none px-3 lg:bg-primary bg-white h-full placeholder:text-gray-500 text-md w-full pe-3`}
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
                  } text-2xl pt-1 text-center`}
                ></p>
              </div>
            </div>
            {errors.password && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                {errors.password.message}
              </p>
            )}

            {/* Confirm Password */}
            <div className="lg:bg-primary bg-white rounded-md lg:mb-4 mb-4 grid grid-cols-13 h-14 shadow shadow-zinc-900">
              <div className="col-span-2">
                <p className="bi-lock-fill text-2xl text-center pt-3"></p>
              </div>
              <div className="col-span-11 border-l border-r border-gray-300">
                <input
                  type="password"
                  name="password"
                  className={`focus:outline-none px-3 lg:bg-primary bg-white h-full placeholder:text-gray-500 text-md w-full pe-3`}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                />
              </div>
            </div>
            {confirmPasswordError && (
              <p className="text-xs mb-5 text-red-700 rounded ps-1">
                Password not match.
              </p>
            )}

            <div className="mt-8 text-center">
              {loader ? <Loader /> : <Button label="Register" />}
            </div>

            <p className="mt-5 text-sm font-poppins">
              Already have an Account?{" "}
              <Link to="/login" className="text-blue-600 font-poppins">
                Login
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

export default Register;
