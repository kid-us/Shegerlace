import React, { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { logo_lg } from "../../assets";

const Verify: React.FC = () => {
  const [title] = useState("Verify Email");
  useDocumentTitle(title);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  useEffect(() => {
    !email && navigate("/login");
  }, []);

  return (
    <div className="bg">
      <div className="container mx-auto flex justify-center items-center h-[100dvh]">
        <div className="lg:w-[38%] w-full lg:px-2 px-5">
          <div className="flex justify-center mb-10">
            <img src={logo_lg} alt="Logo" className="w-28" />
          </div>
          <p className="text-lg bg-white p-4 rounded">
            Check your email. We’ve sent a confirmation link to{" "}
            <span className="text-blue-500">{email}</span>, Please complete your
            action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
