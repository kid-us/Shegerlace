import { Link } from "react-router-dom";
import menuNav from "../../services/navbar";
import { logo_lg } from "../../assets";

interface Footer {
  id: number;
  name: string;
  path: string;
}

const items: Footer[] = [
  {
    id: 1,
    name: "About Us",
    path: "/about-us",
  },
  {
    id: 2,
    name: "Contact",
    path: "/contact",
  },
  {
    id: 3,
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
];

const Footer = () => {
  return (
    <div className="w-full bg-white mt-14 lg:pt-14 pt-8 pb-5 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-6 grid-cols-2">
          <div className="col-span-2 text-2xl font-bold lg:mb-0 mb-8">
            <img src={logo_lg} alt="Logo" className="lg:w-28 w-24" />
          </div>

          <div>
            <p className="font-bold mb-4 lg:text-lg text-gray-500">Company</p>
            {items.map((nav) => (
              <Link
                key={nav.id}
                to={`${nav.path}`}
                className="block font-bold mb-2 lg:text-md text-sm overflow-hidden hover:text-gray-500"
              >
                {nav.name}
              </Link>
            ))}
          </div>

          <div className="lg:block hidden"></div>

          <div>
            <p className="font-bold mb-4 lg:text-lg text-gray-500">Explore</p>
            {menuNav.map((nav) => (
              <Link
                key={nav.id}
                to={`${nav.link}`}
                className="block font-bold mb-2 lg:text-md text-sm overflow-hidden hover:text-gray-500"
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:flex justify-between lg:mt-0 mt-5">
          <div className="flex gap-x-5">
            <p className="font-bold lg:text-md text-sm">Follow us</p>
            <div className="flex gap-x-4">
              <Link to={"/"} className="bi-telegram text-lg text-cyan-500" />
              <Link to={"/"} className="bi-instagram text-lg text-pink-600" />
              <Link to={"/"} className="bi-facebook text-lg text-blue-600" />
            </div>
          </div>
          <p className="lg:text-sm text-xs lg:mt- mt-3">
            <span className="font-bold">&copy;</span> 2024 Shegerlace
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
