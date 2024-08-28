import { Link } from "react-router-dom";
import menuNav from "../../services/navbar";
import { useState } from "react";
import Menu from "./Menu";

const Navbar = () => {
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <>
      <header>
        <nav
          className={`lg:container lg:mx-auto ${
            menu ? "border-b pb-5 px-3" : "px-3"
          }`}
        >
          <div className="flex justify-between lg:pt-5 pt-4">
            <div>
              <p className="font-bold lg:text-2xl text-xl">Shegerlace</p>
            </div>
            {/* Visible only on Large */}
            <div className="lg:flex md:flex hidden space-x-14">
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
            <div>
              {/* Large Device */}
              <div className="lg:flex md:flex hidden">
                <Link to={"/login"}>
                  <p className="bg-zinc-900 rounded-lg text-center py-[8px] px-10 shadow shadow-zinc-900 text-white text-sm transition-shadow duration-500 ease-in-out hover:shadow-none">
                    Sign In
                  </p>
                </Link>
              </div>
              {/* Small Device */}
              <div className="lg:hidden md:hidden flex gap-x-4">
                <button className="bi-bag-fill text-xl"></button>
                <button
                  onClick={() => setMenu(!menu)}
                  className={`${menu ? "bi-x-lg" : "bi-list "} text-2xl`}
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
