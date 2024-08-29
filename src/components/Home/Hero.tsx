import { useEffect, useState } from "react";
import SVG from "./SVG";
import "./wave.css";
import shoes from "../../services/shoes";
import { hero1 } from "../../assets";
import { Link } from "react-router-dom";

interface Shoes {
  id: number;
  name: string;
  color: string;
  img: string;
}

const Hero = () => {
  const [sliders, setSliders] = useState<Shoes>({
    id: 1,
    name: "Nike Dunk High",
    color: "547D27",
    img: hero1,
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

    const timer = setTimeout(changeIntro, 5000);
    return () => clearTimeout(timer);
  }, [shoes, sliders]);

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

        <div className="w-44">
          <Link to={"/login"}>
            <p
              className="rounded text-white w-44 h-10 shadow shadow-zinc-950 hover:shadow-none text-center mt-5 pt-2"
              style={{
                background: `#${sliders.color}`,
              }}
            >
              Join us Now
            </p>
          </Link>
        </div>

        <h1
          className="font-extrabold text-4xl mt-10 lg:block hidden"
          style={{ color: `#${sliders.color}` }}
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
              overflow-hidden cursor-pointer shadow shadow-zinc-900 `}
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
                    ? "w-44 h-12 scale-150 transition-all duration-500 ease-in-out"
                    : "w-20 h-12"
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
