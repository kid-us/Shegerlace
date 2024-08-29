import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import axios from "axios";
import baseUrl from "../../services/request";
import { useState, useRef, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Loader from "../Button/Loader";
// import { useState } from "react";

const schema = z.object({
  phone: z.string().min(10, { message: "Phone number required." }),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [title] = useState("Forgot Password");
  useDocumentTitle(title);

  const navigate = useNavigate();

  const [phoneNotFound, setPhoneNotFound] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [phoneFound, setPhoneFound] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Phone Submit
  const onSubmit = (data: FieldValues) => {
    setLoader(true);
    axios
      .post(
        `${baseUrl}/auth/reset-request?phone_number=${data.phone}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setPhoneFound(true);
        setPhoneNo(data.phone);
      })
      .catch((error) => {
        setPhoneNotFound(true);
        console.log(error);
      });
  };

  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const allInputsFilled = code.every((value) => value !== "");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [verifyLoader, setVerifyLoader] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== "" && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  // Verification
  const handleVerify = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifyLoader(true);
    const verificationCode = code.join("");

    axios
      .post(
        `${baseUrl}/auth/reset-verify?phone_number=${phoneNo}&otp=${verificationCode}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        navigate(`/new-password?id=${response.data.token}&phone=${phoneNo}`);
      })
      .catch((error) => {
        setLoader(false);
        setVerifyError(false);
        console.log(error);
      });
  };

  return (
    <div className="bg">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="lg:w-[38%] w-full lg:px-2 px-5">
            {/* Verification */}
            {phoneFound ? (
              <form className="mt-10" onSubmit={handleVerify}>
                <h1 className="text-white text-2xl">Verify Phone Number</h1>

                <p className="mt-3 font-poppins">
                  Enter the otp we send to{" "}
                  <span className="text-white font-poppins font-bold">
                    {phoneNo}
                  </span>{" "}
                  and verify your phone number.
                </p>
                {verifyError && (
                  <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak font-poppins mt-3">
                    &nbsp; Invalid OTP!
                  </p>
                )}
                <div className="grid grid-cols-5 gap-x-3 mt-5">
                  {code.map((value, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        className="w-full bg-white rounded lg:h-16 h-12 shadow shadow-zinc-900 focus:outline-none text-center text-3xl chakra"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        autoFocus={index === 0}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  {allInputsFilled &&
                    (verifyLoader ? (
                      <p className="py-3 text-black btn-bg w-full rounded flex justify-center font-poppins text-lg shadow shadow-zinc-950 chakra">
                        <span className="loader rounded"></span>
                      </p>
                    ) : (
                      <button className="py-3 text-black btn-bg w-full rounded font-poppins text-lg shadow shadow-zinc-950 chakra">
                        Verify Phone Number
                      </button>
                    ))}
                </div>
              </form>
            ) : (
              // Request
              <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                {phoneNotFound && (
                  <p className="text-sm text-white mb-5 bg-red-700 rounded ps-2 py-2 text-center bi-heartbreak">
                    &nbsp; Invalid request!
                  </p>
                )}

                <h1 className="text-black text-2xl">Forgot your password?</h1>
                <p className="my-4 font-poppins">
                  No problem! Just enter the phone number that you signed up
                  with to reset it.
                </p>

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
                      className={`focus:outline-none bg-white px-3 h-full placeholder:text-gray-400 text-md w-full`}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-xs mb-5 text-red-700 rounded ps-1">
                    {errors.phone.message}
                  </p>
                )}

                <div className="mt-8 text-center">
                  {loader ? <Loader /> : <Button label={"Reset Password"} />}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
