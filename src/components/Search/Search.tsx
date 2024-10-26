import { Link } from "react-router-dom";
import { logo_sm } from "../../assets";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

const shoes = [
  { id: 1, name: "Jordan" },
  { id: 2, name: "Air Max" },
  { id: 3, name: "Dunk" },
  { id: 4, name: "Blaze" },
  { id: 5, name: "Air Force" },
];

const Search = ({ onClose }: Props) => {
  const [animationClass, setAnimationClass] = useState<string>(
    "animate__fadeInDown"
  );

  const [search, setSearch] = useState<string>("");

  const handleClose = () => {
    setAnimationClass("animate__fadeOutUp");
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSearch = () => {
    if (search === "") return;

    window.location.href = `/search/${search}`;
  };

  return (
    <>
      <div className="fixed top-0 h-[100dvh] w-full z-30 bg-neutral-900/70"></div>

      <div
        className={`animate__animated ${animationClass} fixed top-0 w-full lg:h-[50%] h-full z-40 bg-white`}
      >
        <div className="grid grid-cols-12 lg:gap-x-20 gap-x-3 lg:px-32 px-3 lg:pt-8 pt-3">
          <div className="lg:block hidden lg:col-span-2">
            <img src={logo_sm} alt="Logo" className="w-14" />
          </div>

          <div className="lg:col-span-8 col-span-11 overflow-hidden">
            <div className="relative overflow-hidden">
              <input
                type="search"
                className="border w-full bg py-3 rounded-lg shadow-inner ps-5 focus:outline-none overflow-hidden placeholder:text-gray-600"
                placeholder="Search shoes here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => {
                  handleClose();
                  handleSearch();
                }}
                className="bi-search absolute right-0 btn-bg rounded-r-xl h-full lg:w-14 w-10 text-white"
              ></button>
            </div>

            <div className="mt-4">
              <p className="lg:text-sm mb-5">Popular searched shoes</p>
              <div className="space-y-2">
                {shoes.map((s) => (
                  <Link
                    key={s.id}
                    to={`/search/${s.name}`}
                    className="block font-semibold"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <button onClick={handleClose} className="lg:block hidden">
              Cancel
            </button>
            <button
              onClick={handleClose}
              className="lg:hidden block bi-x-lg text-red-600 text-xl pt-2"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
