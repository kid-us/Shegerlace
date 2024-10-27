import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { baseUrl } from "../../services/request";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { logo_sm } from "../../assets";
import baseUrl from "../../services/request";
import Loader from "../Button/Loader";

const schema = z.object({
  password: z.string().min(8, {
    message: "Password must be greater than 8 characters.",
  }),
});

type FormData = z.infer<typeof schema>;

const CheckEmail = () => {
  const [title] = useState("New Password");
  useDocumentTitle(title);

  const location = useLocation();
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const searchParams = new URLSearchParams(location.search);
  const emailAddress = searchParams.get("email");
  const token = searchParams.get("token");
  const [loader, setLoader] = useState<boolean>(false);

  // New Password
  const onSubmit = (data: FieldValues) => {
    if (data.password !== confirmPassword) {
      return setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);

      const reset = {
        token: token,
        password: data.password,
      };

      setLoader(true);

      axios
        .post(`${baseUrl}auth/reset-password`, reset, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          setLoader(false);
          console.log(error);
        });
    }
  };

  return (
    <div className="h-[100vh] bg">
      <div className="flex justify-center items-center h-full">
        <div className="content-center lg:w-2/6 md:w-5/6 w-full">
          <div className="secondary-bg rounded-lg">
            <Link to={"/"}>
              <img src={logo_sm} alt="Logo" className="w-10" />
            </Link>

            {emailAddress && (
              <div className="mt-10">
                <h1 className="text-4xl">Password reset email sent</h1>
                <p className="text-sm mt-6">
                  We've sent you a link to reset your password to{" "}
                  <span className="text-blue-600">{emailAddress}</span> email
                  address. The link expires in 10 minutes.
                </p>
                <p className="text-sm mt-2">
                  Didn't get an email? Check your junk folder or request another
                  link{" "}
                  <Link to="/request" className="text-xl text-blue-600">
                    here
                  </Link>
                  .
                </p>
              </div>
            )}
            {token && (
              <>
                <form onSubmit={handleSubmit(onSubmit)} className="my-8">
                  <h1 className="text-2xl mb-6">Enter New Password</h1>
                  <div className="mb-5 relative">
                    <label
                      className="text-sm text-gray-600 block mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`bg-white py-3 rounded w-full focus:outline-none px-5 mt-1 block shadow-sm shadow-gray-300 font-poppins text-sm ${
                        errors.password && "border-red-600 border-1 border"
                      }`}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${
                        showPassword ? "bi-eye" : "bi-eye-slash"
                      } right-2 top-8 cursor-pointer`}
                    ></span>
                    {errors.password && (
                      <p className="text-red-600 text-xs pt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm password */}
                  <label
                    className="text-sm text-gray-600 block mt-5 mb-1"
                    htmlFor="password"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    className={`bg-white py-3 rounded w-full focus:outline-none px-5 mt-1 block shadow-sm shadow-gray-300 font-poppins text-sm mb-5 ${
                      confirmPasswordError && "border-red-600 border-1 border"
                    }`}
                    onChange={(event) =>
                      setConfirmPassword(event.currentTarget.value)
                    }
                  />

                  {confirmPasswordError && (
                    <p className="text-red-600 text-xs pt-1">
                      Password does not match!
                    </p>
                  )}

                  {/* Button */}
                  {loader ? <Loader /> : <Button label="Create Password" />}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
