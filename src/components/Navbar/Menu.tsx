import { Link, useLocation } from "react-router-dom";
import menuNav from "../../services/navbar";
import { useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import Cart from "../Cart/Cart";

interface Props {
  username?: string | null;
  menu: boolean;
  onMenu: (val: boolean) => void;
}

const Menu = ({ menu, onMenu, username }: Props) => {
  const location = useLocation();
  const path = location.pathname;

  const { cart } = useCartStore();

  const [animationClass, setAnimationClass] = useState<string>(
    "animate__fadeInLeft"
  );

  const [onCart, setOnCart] = useState<boolean>(false);

  const handleClose = () => {
    setAnimationClass("animate__fadeOutLeft");
    setTimeout(() => {
      onMenu(false);
    }, 500);
  };

  return (
    <>
      {/* Cart */}
      {onCart && <Cart onCart={() => setOnCart(false)} />}

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
              <div className="relative">
                <button
                  onClick={() => cart.length > 0 && setOnCart(true)}
                  className={`${
                    cart.length > 0 ? "bi-bag-fill" : "bi-bag"
                  } text-xl`}
                ></button>
                <p className="absolute -top-[5px] text-[8px] pt-[2px] -right-2 bg-red-500 text-white shadow rounded-full w-[16px] h-[16px] text-center">
                  {cart.length}
                </p>
              </div>
              <button
                onClick={() => handleClose()}
                className={`${menu ? "bi-x-lg" : "bi-list "} text-2xl`}
              ></button>
            </div>
          </div>
        </div>

        {username && (
          <div>
            <Link
              to={"/my-orders"}
              className={`${
                path == "/my-orders" && "text-color"
              } font-bold font-cousine text-lg block mt-6`}
            >
              My Orders
            </Link>
            <Link
              to={"/my-favorites"}
              className={`${
                path == "/my-favorites" && "text-color"
              } font-bold font-cousine text-lg block my-5`}
            >
              My Favorites
            </Link>
            <Link
              to={"/setting"}
              className={`${
                path == "/setting" && "text-color"
              } font-bold font-cousine text-lg block`}
            >
              Setting
            </Link>
          </div>
        )}

        {menuNav.map((menus) => (
          <Link
            key={menus.id}
            to={menus.link}
            className="flex lg:mb-8 mb-5 mt-5"
          >
            <p
              className={`${
                menus.link == path && "text-color"
              } font-bold font-cousine text-lg`}
            >
              {menus.name}
            </p>
          </Link>
        ))}

        <div className="absolute bottom-5 cursor-pointer">
          {username ? (
            <Link
              to={"/dashboard"}
              className="font-bold text-red-500 hover:text-gray-500"
            >
              Logout
            </Link>
          ) : (
            <Link to={"/login"}>
              <p className="font-poppins text-white py-[6px] btn-bg rounded-lg w-32 text-center">
                Login
              </p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
