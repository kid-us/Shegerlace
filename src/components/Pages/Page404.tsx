import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Page404 = () => {
  // Title
  const [title] = useState("404 | Page not Found");
  useDocumentTitle(title);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[90dvh]">
        <p>Page Not Found</p>
      </div>
    </>
  );
};

export default Page404;
