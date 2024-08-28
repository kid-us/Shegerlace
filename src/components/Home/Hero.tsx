import { useState } from "react";
import { hero1, hero2, hero3 } from "../../assets";
import SVG from "./SVG";
import "./wave.css";

interface Shoes {
  name: string;
  color: string;
  img: string;
}

const shoes: Shoes[] = [
  {
    name: "Nike Dunk High",
    color: "547D27",
    img: hero1,
  },
  {
    name: "Nike Dunk High",
    color: "864E2D",
    img: hero2,
  },
  {
    name: "Nike Dunk High",
    color: "92C6D9",
    img: hero3,
  },
];

export const Hero = () => {
  const [sliders, setSliders] = useState({
    name: "Nike Dunk High",
    color: "547D27",
    img: hero1,
  });

  return (
    <div className="lg:grid grid-cols-2 mb-20">
      <div className="lg:pt-20 pt-10 lg:ps-28 lg:px-0 px-4">
        <h1 className="font-cousine font-extrabold lg:text-5xl text-xl">
          Unleash Your Sole, Discover Your Style.
        </h1>
        <p className="mt-8">
          Discover the Perfect Pair: Explore Our Extensive Collection of Stylish
          and Comfortable Footwear, Available Online for Every Occasion and
          Lifestyle.
        </p>

        <h1
          className="font-extrabold text-4xl mt-10 lg:block hidden"
          style={{ color: `#${sliders.color}` }}
        >
          {sliders.name}
        </h1>

        {/* Lg Sliders */}
        <div className="lg:flex hidden gap-x-1 mt-10">
          {shoes.map((s, index) => (
            <div
              key={s.color}
              className={`${index === 0 && "rounded-l-xl"}
              ${index === shoes.length - 1 && "rounded-r-xl"}
              overflow-hidden cursor-pointer shadow shadow-zinc-900`}
              onClick={() =>
                setSliders({ color: s.color, img: s.img, name: s.name })
              }
              style={{
                background: `#${s.color}`,
              }}
            >
              <img
                src={s.img}
                alt="Shoes"
                className={`${
                  sliders.color === s.color
                    ? "w-44 h-20 scale-150 transition-all duration-500 ease-in-out"
                    : "w-20 h-20"
                } object-contain`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center items-center overflow-hidden">
        <SVG bg={sliders.color} />
        <img
          src={sliders.img}
          alt="hero"
          className="absolute inset-0 m-auto lg:-rotate-[20deg] -rotate-[25deg] lg:me-auto me-8"
        />
      </div>

      {/* Sm Sliders */}
      <div className="flex justify-center lg:hidden gap-x-1 mt-10">
        {shoes.map((s, index) => (
          <div
            key={s.color}
            className={`${index === 0 && "rounded-l-xl"}
              ${index === shoes.length - 1 && "rounded-r-xl"}
              overflow-hidden cursor-pointer shadow shadow-zinc-900`}
            onClick={() =>
              setSliders({ color: s.color, img: s.img, name: s.name })
            }
            style={{
              background: `#${s.color}`,
            }}
          >
            <img
              src={s.img}
              alt="Shoes"
              className={`${
                sliders.color === s.color
                  ? "w-44 h-20 scale-150 transition-all duration-500 ease-in-out"
                  : "w-20 h-20"
              } object-contain`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
