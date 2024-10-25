import { Link, useNavigate } from "react-router-dom";
import menuNav from "../../services/navbar";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import { useCartStore } from "../../stores/useCartStore";
import Cart from "../Cart/Cart";
import { logo_lg, logo_sm } from "../../assets";
import Search from "../Search/Search";
import axios from "axios";
import { User } from "../Protected/Protected";
import baseUrl from "../../services/request";
import Loading from "../Loading/Loading";

const Navbar = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const { cart } = useCartStore();
  const [onCart, setOnCart] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);

  const access_token = localStorage.getItem("token");

  const [username, setUsername] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  // Get username
  useEffect(() => {
    if (access_token) {
      axios
        .get<User>(`${baseUrl}auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          setUsername(response.data.user.username);
          setLoading(false);
        })
        .catch(() => {
          setUsername(null);
          setLoading(false);
        });
    } else {
      setUsername(null);
      setLoading(false);
    }
  }, [access_token]);

  return (
    <>
      {/* Loading */}
      {loading && <Loading />}

      {/* Cart */}
      {onCart && <Cart onCart={() => setOnCart(false)} />}
      <header className={`sticky top-0 bg z-40 lg:shadow shadow-md`}>
        <nav className={`lg:mx-24 ${menu ? "border-b pb-5 px-3" : "px-3"}`}>
          <div className="flex justify-between border-b border-gray-100 pb-4">
            {/* Logo */}
            <div>
              <Link
                to={"/"}
                className="font-bold font-poppins lg:text-2xl text-xl absolute"
              >
                <img
                  src={logo_lg}
                  alt="Logo"
                  className="lg:block hidden w-16 pt-2"
                />
                <img
                  src={logo_sm}
                  alt="Logo"
                  className="lg:hidden block w-12 pt-2"
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
                {/* Search */}
                <button
                  onClick={() => setSearch(!search)}
                  className="bi-search text-lg"
                ></button>
                {/* Cart */}
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
                {/* Account */}
                <div className="relative">
                  {username ? (
                    <button onClick={() => setDropdown(!dropdown)}>
                      <p className="text-center pe-10 ps-2 font-bold transition-shadow duration-500 ease-in-out hover:shadow-none text-color font-cousine text-lg">
                        <span className="bi-person-fill me-2"></span>
                        {username}
                      </p>
                    </button>
                  ) : (
                    <Link to={"/login"}>
                      <p className="btn-bg rounded-lg text-center py-[8px] px-10 shadow shadow-zinc-900 text-white text-sm transition-shadow duration-500 ease-in-out hover:shadow-none">
                        Sign In
                      </p>
                    </Link>
                  )}

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
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.clear();
                          navigate("/");
                        }}
                        className="text-sm font-bold text-red-500 hover:text-gray-500"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Small Device */}
              <div className="lg:hidden md:hidden flex gap-x-8">
                {/* Search */}
                <button
                  onClick={() => setSearch(!search)}
                  className="bi-search text-lg"
                ></button>
                {/* Cart */}
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
                {/* Menu */}
                <button
                  onClick={() => setMenu(!menu)}
                  className={`bi-list text-2xl`}
                ></button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Menu */}
      {menu && (
        <Menu
          username={username}
          menu={menu}
          onMenu={(val: boolean) => setMenu(val)}
        />
      )}

      {/* Search */}
      {search && <Search onClose={() => setSearch(false)} />}
    </>
  );
};

export default Navbar;
