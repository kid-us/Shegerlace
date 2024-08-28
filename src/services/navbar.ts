interface Menu {
  id: number;
  name: string;
  link: string;
}

const menuNav: Menu[] = [
  {
    id: 1,
    name: "New Release",
    link: "/new-release",
  },
  {
    id: 2,
    name: "Mens",
    link: "/mens",
  },
  {
    id: 3,
    name: "Women",
    link: "/women",
  },
  {
    id: 4,
    name: "Kids",
    link: "/kids",
  },
];

export default menuNav;
