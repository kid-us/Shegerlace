import React, { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo_lg } from "../../assets";

const Verify: React.FC = () => {
  const [title] = useState("Verify Email");
  useDocumentTitle(title);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const expire = searchParams.get("expire");
  const success = searchParams.get("success");

  useEffect(() => {
    if (!email && !expire && !success) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg">
      <div className="container mx-auto flex justify-center items-center h-[100dvh]">
        <div className="lg:w-[38%] w-full lg:px-2 px-5">
          <div className="flex justify-center mb-10">
            <img src={logo_lg} alt="Logo" className="w-28" />
          </div>
          {/* Verify */}
          {email && (
            <p className="text-lg p-4 rounded">
              Check your email. We’ve sent a confirmation link to{" "}
              <span className="text-blue-500">{email}</span>, Please complete
              your action.
            </p>
          )}
          {/* Success */}
          {success && (
            <div className="">
              <p className="bi-check-circle-fill text-center text-green-500 text-4xl mb-4"></p>
              <p className="mb-4">
                Congratulations! Your email has been successfully verified. You
                can now access all the features of your account.
              </p>
              <Link to="/login">
                <p className="py-3 text-center text-black btn-bg w-full rounded font-poppins shadow-sm shadow-black text-s font-bold">
                  Login
                </p>
              </Link>
            </div>
          )}
          {/* Expire */}
          {expire && (
            <>
              <p className="bi-exclamation-triangle-fill text-center text-red-500 text-4xl mb-4"></p>

              <p className="mb-4">
                It looks like you haven't verified your email yet. For security
                purposes, your verification link is expired. Please click the
                button below to complete your email verification.
              </p>
              <Link to="/register">
                <p className="py-3 text-center text-black btn-bg w-full rounded font-poppins shadow-sm shadow-black text-s font-bold">
                  Register
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
