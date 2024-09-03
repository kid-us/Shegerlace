import { useState } from "react";
import Filter from "./Filter";

interface Props {
  onFilter: () => void;
}

const SmFilter = ({ onFilter }: Props) => {
  const [animationClass, setAnimationClass] = useState("animate__fadeInUp");

  const handleClose = () => {
    setAnimationClass("animate__fadeOutDown");
    setTimeout(() => {
      onFilter(); // Trigger the onFilter callback after the animation ends
    }, 500); // Adjust the timeout to match the duration of the animation
  };

  return (
    <div
      className={`animate__animated ${animationClass} fixed bottom-0 z-30 h-[90vh] overflow-y-scroll bg-white w-full ps-10 py-8`}
    >
      <button
        onClick={handleClose}
        className="bi-x bg-black rounded-full w-6 h-6 text-white absolute right-5"
      ></button>
      <Filter />
    </div>
  );
};

export default SmFilter;
