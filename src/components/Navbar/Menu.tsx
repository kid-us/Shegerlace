import { Link, useLocation } from "react-router-dom";
import menuNav from "../../services/navbar";

interface Props {
  username?: string;
  menu: boolean;
  onMenu: (val: boolean) => void;
}

const Menu = ({ menu, onMenu }: Props) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div onClick={() => onMenu(false)} className="overlay z-10"></div>
      <div
        className={`fixed ${
          menu
            ? "animate__animated animate__fadeInLeft"
            : "animate__animated animate__fadeOutLeft"
        }  w-full bg-white h-[85vh] z-20 bg lg:rounded lg:px-10 px-5`}
      >
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

        <div className="absolute bottom-0 mt-8 cursor-pointer">
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
