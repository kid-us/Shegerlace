import { useEffect, useState } from "react";
import SVG from "./SVG";
import shoes from "../../services/shoes";
import { hero1 } from "../../assets";
import { Link } from "react-router-dom";
import useUsername from "../../hooks/useUsername";

export interface Shoes {
  id: number;
  name: string;
  color: string;
  img: string;
  price: number;
}

const Hero = () => {
  const { username } = useUsername();

  const [sliders, setSliders] = useState<Shoes>({
    id: 1,
    name: "Nike Dunk High",
    color: "547D27",
    img: hero1,
    price: 4999,
  });

  useEffect(() => {
    const currentId = sliders.id;
    const nextId = currentId !== shoes.length ? currentId + 1 : 1;
    const nextShoe = shoes.find((s) => s.id === nextId);

    const changeIntro = () => {
      if (nextShoe) {
        setSliders(nextShoe);
      }
    };

    const timer = setTimeout(changeIntro, 10000);
    return () => clearTimeout(timer);
  }, [shoes, sliders]);

  return (
    <div className="lg:grid grid-cols-2 lg :mt-0 mt-10">
      <div className="flex h-full items-center pt-10 lg:ps-28 lg:px-0 px-4">
        <div>
          <div className="wrapper">
            <h1 className="h1 font-cousine font-extrabold lg:text-5xl text-3xl uppercase">
              Unleash Your Sole, Discover Your Style.
            </h1>
          </div>
          <p className="lg:text-lg mt-3 text-gray-500">
            Discover the Perfect Pair: Explore Our Extensive Collection of
            Stylish and Comfortable Footwear, Available Online for Every
            Occasion and Lifestyle.
          </p>

          {!username && (
            <div className="w-44">
              <Link to={"/login"}>
                <p className="rounded text-white w-44 h-11 shadow shadow-zinc-950 hover:shadow-none text-center mt-5 pt-2 btn-bg">
                  Join us Now
                </p>
              </Link>
            </div>
          )}

          <h1
            className="font-extrabold text-3xl mt-10 lg:block hidden"
            style={{
              color: `#${sliders.color}`,
              textShadow:
                "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
            }}
          >
            {sliders.name}
          </h1>

          {/* Lg Sliders */}
          <div className="lg:flex w-[80%] hidden mt-10">
            {shoes.map((s, index) => (
              <div
                key={s.color}
                className={`${index === 0 && "rounded-l-xl "}
              ${index === shoes.length - 1 && "rounded-r-xl"}
              overflow-hidden cursor-pointer`}
                onClick={() => setSliders(s)}
                style={{
                  background: `#${s.color}`,
                }}
              >
                <img
                  src={s.img}
                  alt="Shoes"
                  className={`${
                    sliders.color === s.color
                      ? "w-64 h-16 -rotate-[20deg] transition-all duration-500 ease-in-out"
                      : "w-32 h-16"
                  } object-contain`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center overflow-hidden">
        <SVG bg={sliders.color} />
        <img
          src={sliders.img}
          alt="hero"
          className="animation-swing absolute inset-0 m-auto lg:-rotate-[20deg] -rotate-[25deg] lg:me-auto me-8"
        />
      </div>

      {/* Sm Sliders */}
      <div className="flex justify-center lg:hidden mt-10">
        <div className="flex w-[90%]">
          {shoes.map((s, index) => (
            <div
              key={s.color}
              className={`${index === 0 && "rounded-l-xl"}
              ${index === shoes.length - 1 && "rounded-r-xl"}
              overflow-hidden cursor-pointer shadow shadow-zinc-900`}
              onClick={() => setSliders(s)}
              style={{
                background: `#${s.color}`,
              }}
            >
              <img
                src={s.img}
                alt="Shoes"
                className={`${
                  sliders.color === s.color
                    ? "w-44 h-14 -rotate-[20deg] scale-150 transition-all duration-500 ease-in-out"
                    : "w-20 h-14"
                } object-contain`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
