import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import axios from "axios";
import baseUrl from "../../services/request";
import { useLocation, useNavigate } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Button from "../Button/Button";
import Loader from "../Button/Loader";

const Verify: React.FC = () => {
  const [title] = useState("Verify");
  useDocumentTitle(title);

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNo = searchParams.get("phone");
  const [verifyError, setVerifyError] = useState<boolean>(false);

  useEffect(() => {
    if (!phoneNo) {
      navigate("/register");
    }
  }, [phoneNo]);

  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const allInputsFilled = code.every((value) => value !== "");

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");
    setLoader(true);

    axios
      .post(
        `${baseUrl}/auth/verify?otp=${verificationCode}&phone_number=${phoneNo}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setLoader(false);
        setVerifyError(true);
        console.log(error);
      });
  };

  return (
    <div className="bg">
      <div className="container mx-auto flex justify-center items-center h-[100vh]">
        <div className="lg:w-[38%] w-full lg:px-2 px-5">
          <form className="mt-10" onSubmit={handleSubmit}>
            <h1 className="text-black text-2xl">Verify Phone Number</h1>

            <p className="mt-3">
              Enter the otp we send to{" "}
              <span className="text-white font-poppins">{phoneNo}</span> and
              verify your phone number.
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
                    className="w-full bg-white rounded lg:h-16 h-12 shadow shadow-zinc-900 focus:outline-none text-center text-3xl"
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
                (loader ? <Loader /> : <Button label="Verify" />)}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
