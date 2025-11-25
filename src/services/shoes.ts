import { hero1 } from "../assets";
import ua2Main from "../assets/shoes/under_armour/2/main.png";
import nb2Main from "../assets/shoes/new_balance/2/main.png";
import converse4Main from "../assets/shoes/converse/4/main.png";
import puma6Main from "../assets/shoes/puma/6/main.png";
import jordan4Main from "../assets/shoes/jordan/4/main.png";

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
    name: "Ait Jordan",
    color: "000000",
    img: jordan4Main,
    price: 2999,
  },
  {
    id: 3,
    name: "Puma",
    color: "c2a53c",
    img: puma6Main,
    price: 2999,
  },
  {
    id: 4,
    name: "All Star",
    color: "fffeee",
    img: converse4Main,
    price: 4999,
  },
  {
    id: 5,
    name: "Under Armour",
    color: "676767",
    img: ua2Main,
    price: 3999,
  },
  {
    id: 6,
    name: "New Balance 42",
    color: "65564e",
    img: nb2Main,
    price: 5999,
  },
];

export default shoes;
