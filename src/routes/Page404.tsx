import { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Navbar from "../components/Navbar/Navbar";
import { notFound } from "../assets";

const Page404 = () => {
  // Title
  const [title] = useState("404 | Page not Found");
  useDocumentTitle(title);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[90dvh]">
        <div className="">
          <img src={notFound} alt="" />

          <div className="text-center mt-5">
            <Link
              to={"/"}
              className="btn-bg px-5 py-2 shadow rounded font-bold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
