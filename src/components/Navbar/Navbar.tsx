import { Link } from "react-router-dom";
import menuNav from "../../services/navbar";
import { useState } from "react";
import Menu from "./Menu";
import { useCartStore } from "../../stores/useCartStore";
import Cart from "../Cart/Cart";
import { logo_lg, logo_sm } from "../../assets";

const Navbar = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const { cart } = useCartStore();
  const [onCart, setOnCart] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <>
      {/* Cart */}
      {onCart && <Cart onCart={() => setOnCart(false)} />}
      <header className={`sticky top-0 bg z-20 shadow-sm`}>
        <nav className={`lg:mx-24 ${menu ? "border-b pb-5 px-3" : "px-3"}`}>
          <div className="flex justify-between border-b border-gray-100 pb-6">
            <div>
              <Link
                to={"/"}
                className="font-bold font-poppins lg:text-2xl text-xl absolute"
              >
                <img
                  src={logo_lg}
                  alt="Logo"
                  className="lg:block hidden w-20 pt-2"
                />
                <img
                  src={logo_sm}
                  alt="Logo"
                  className="lg:hidden block w-20 pt-2"
                />
              </Link>
            </div>
            {/* Visible only on Large */}
            <div className="lg:flex md:flex hidden space-x-14 pt-6">
              {menuNav.map((nav) => (
                <Link
                  to={`${nav.link}`}
                  key={nav.id}
                  className="font-bold transition-transform duration-500 ease-in-out hover:-translate-y-1"
                >
                  {nav.name}
                </Link>
              ))}
            </div>
            <div className="lg:pt-6 pt-4">
              {/* Large Device */}
              <div className="lg:flex md:flex hidden gap-x-10">
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
                <div className="relative">
                  {/* <Link to={"/login"}>
                    <p className="btn-bg rounded-lg text-center py-[8px] px-10 shadow shadow-zinc-900 text-white text-sm transition-shadow duration-500 ease-in-out hover:shadow-none">
                      Sign In
                    </p>
                  </Link> */}

                  <button onClick={() => setDropdown(!dropdown)}>
                    <p className="text-center pe-10 ps-2 font-bold transition-shadow duration-500 ease-in-out hover:shadow-none text-color font-cousine">
                      <span className="bi-person-fill me-2"></span>
                      Lorem
                    </p>
                  </button>

                  {/* Dropdown */}
                  {dropdown && (
                    <div className="absolute -z-10 right- top-10 bg rounded-lg p-3 w-32 border-b border-r border-l border-gray-300">
                      <Link
                        to={"/my-orders"}
                        className="text-sm font-bold block hover:text-gray-500 mb-2 mt-1"
                      >
                        My Orders
                      </Link>
                      <Link
                        to={"/my-favorites"}
                        className="text-sm font-bold block hover:text-gray-500 mb-2"
                      >
                        My Favorites
                      </Link>
                      <Link
                        to={"/setting"}
                        className="text-sm font-bold block hover:text-gray-500 mb-1"
                      >
                        Setting
                      </Link>
                      <Link
                        to={"/dashboard"}
                        className="text-sm font-bold text-red-500 hover:text-gray-500"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </div>

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
                  onClick={() => setMenu(!menu)}
                  className={`bi-list text-2xl`}
                ></button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {menu && (
        <Menu
          username={"Lorem"}
          menu={menu}
          onMenu={(val: boolean) => setMenu(val)}
        />
      )}
    </>
  );
};

export default Navbar;
