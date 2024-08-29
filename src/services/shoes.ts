import { hero1, hero2, hero3, hero4, hero5, hero6 } from "../assets";

interface Shoes {
  id: number;
  name: string;
  color: string;
  img: string;
  price: number;
}

const shoes: Shoes[] = [
  {
    id: 1,
    name: "Nike Dunk High",
    color: "547D27",
    img: hero1,
    price: 2999,
  },
  {
    id: 2,
    name: "Nike Dunk High",
    color: "864E2D",
    img: hero2,
    price: 2999,
  },
  {
    id: 3,
    name: "Nike Dunk High",
    color: "92C6D9",
    img: hero3,
    price: 2999,
  },
  {
    id: 4,
    name: "Air Jordan 3 Retro",
    color: "373C3F",
    img: hero4,
    price: 4999,
  },
  {
    id: 5,
    name: "Nike Dunk Low SE",
    color: "F56F00",
    img: hero5,
    price: 3999,
  },
  {
    id: 6,
    name: "Air Jordan 1 Mid SE",
    color: "A9A3A2",
    img: hero6,
    price: 5999,
  },
];

export default shoes;
