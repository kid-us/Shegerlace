import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import axios from "axios";
import baseUrl from "../../services/request";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Loader from "../Button/Loader";
import { logo_sm } from "../../assets";

const schema = z.object({
  email: z.string().email({ message: "Email address required." }),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [title] = useState("Forgot Password");
  useDocumentTitle(title);

  const navigate = useNavigate();

  const [emailNotFound, setEmailNotFound] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Submit Email
  const onSubmit = (data: FieldValues) => {
    setLoader(true);
    axios
      .post(
        `${baseUrl}auth/reset-request?email=${data.email}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate(`/reset-password?email=${data.email}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          setLoader(false);
          setEmailNotFound(true);
          console.log(error);
        } else {
          navigate(`/reset-password?email=${data.email}`);
        }
      });
  };

  return (
    <div className="bg">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="lg:w-[38%] w-full lg:px-2 px-5">
            <Link to={"/"}>
              <img src={logo_sm} alt="Logo" className="w-10" />
            </Link>

            <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
              {emailNotFound && (
                <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak">
                  &nbsp; something went wrong.
                </p>
              )}

              <h1 className="text-black text-2xl">Forgot your password?</h1>
              <p className="my-4 font-poppins">
                Forgot your password? No problem! Just enter the email address
                associated with your account, and we'll send you a link to reset
                your password. Follow the instructions in the email to create a
                new password and regain access to your account.
              </p>

              {/* Email */}
              <div className="bg-white overflow-hidden rounded-md mb-3 grid grid-cols-13 h-14 shadow shadow-zinc-900">
                <div className="col-span-2">
                  <p className="bi-envelope-fill text-2xl text-center pt-3"></p>
                </div>
                <div className="col-span-11 border-l border-gray-300">
                  <input
                    {...register("email")}
                    type="tel"
                    name="email"
                    className={`focus:outline-none bg-white px-3 h-full placeholder:text-gray-400 text-md w-full`}
                    placeholder="Email"
                  />
                </div>
              </div>

              {errors.email && (
                <p className="text-xs mb-5 text-red-700 rounded">
                  {errors.email.message}
                </p>
              )}

              <div className="mt-8 text-center">
                {loader ? <Loader /> : <Button label={"Reset Password"} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
