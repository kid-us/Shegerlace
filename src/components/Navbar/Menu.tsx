import { Link, useLocation } from "react-router-dom";
import menuNav from "../../services/navbar";
import { useState } from "react";

interface Props {
  username?: string;
  menu: boolean;
  onMenu: (val: boolean) => void;
}

const Menu = ({ menu, onMenu }: Props) => {
  const location = useLocation();
  const path = location.pathname;

  const [animationClass, setAnimationClass] = useState<string>(
    "animate__fadeInLeft"
  );

  const handleClose = () => {
    setAnimationClass("animate__fadeOutLeft");
    setTimeout(() => {
      onMenu(false);
    }, 500);
  };
  return (
    <>
      <div className="overlay z-10"></div>
      <div
        className={`fixed animate__animated ${animationClass} w-full bg-white top-0 h-full z-20 bg lg:rounded lg:px-10 px-5`}
      >
        <div className="flex justify-between lg:pt-5 pt-4 border-b pb-4 border-gray-100">
          <div>
            <p className="font-bold lg:text-2xl text-xl">Shegerlace</p>
          </div>
          <div>
            {/* Small Device */}
            <div className="lg:hidden md:hidden flex gap-x-4">
              <button className={`bi-bag text-xl`}></button>
              <button
                onClick={() => handleClose()}
                className={`${menu ? "bi-x-lg" : "bi-list "} text-2xl`}
              ></button>
            </div>
          </div>
        </div>

        {menuNav.map((menus) => (
          <Link
            key={menus.id}
            to={menus.link}
            className="flex lg:mb-8 mb-5 hover:text-gray-800 mt-6"
          >
            <p
              className={`lg:text-xl ${
                menus.link == path && "text-white"
              } font-bold font-cousine text-lg`}
            >
              {menus.name}
            </p>
          </Link>
        ))}

        <div className="absolute bottom-5 cursor-pointer">
          <Link to={"/login"}>
            <p className="font-poppins text-white py-[6px] bg-zinc-900 rounded-lg w-32 text-center">
              Login
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
