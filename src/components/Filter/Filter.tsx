import { useState } from "react";
import useBrand from "../../hooks/useBrand";
import useStock from "../../hooks/useStock";

export interface Size {
  start: string;
  end: String;
}

export interface Price {
  min: string;
  max: string;
}

const category = [
  { id: 1, name: "all", label: "All" },
  { id: 2, name: "men", label: "Men" },
  { id: 3, name: "women", label: "Women" },
  { id: 4, name: "kid", label: "Kid" },
];

const price = [
  { id: 1, min: "1000", max: "2000" },
  { id: 2, min: "2000", max: "3000" },
  { id: 3, min: "3000", max: "4000" },
  { id: 4, min: "5000", max: "6000" },
];

const size = [
  { id: 1, start: "36", end: "37" },
  { id: 2, start: "37", end: "38" },
  { id: 3, start: "39", end: "40" },
  { id: 4, start: "41", end: "42" },
  { id: 5, start: "43", end: "44" },
];

const Filter = () => {
  const { brand } = useBrand();

  const { handleFilter } = useStock();

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<Price | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<Size | null>(null);

  // Handle Filter
  const handleFilterBtn = () => {
    handleFilter(
      categoryFilter && categoryFilter,
      priceFilter && priceFilter,
      brandFilter && brandFilter,
      sizeFilter && sizeFilter
    );
  };

  return (
    <>
      <p className="text-2xl mb-5 font-bold">Filter</p>

      {/* Category */}
      <form className="space-y-1">
        <p
          onClick={() => window.location.reload()}
          className="cursor-pointer space-x-4 mb-2 ms-9"
        >
          Default
        </p>
        {category.map((c) => (
          <label
            onClick={() => {
              setCategoryFilter(c.name);
              handleFilterBtn();
            }}
            key={c.id}
            className="flex items-center space-x-4"
          >
            <input
              type="radio"
              name="category"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="cursor-pointer">{c.label}</span>
          </label>
        ))}
      </form>

      {/* Price */}
      <p className="my-5 font-bold text-lg">Price</p>
      <form className="space-y-1">
        {price.map((p) => (
          <label
            onClick={() => {
              setPriceFilter({ max: p.max, min: p.min });
              handleFilterBtn();
            }}
            key={p.id}
            className="flex items-center space-x-4"
          >
            <input
              type="radio"
              name="price"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="cursor-pointer">
              {p.min}br - {p.max}br
            </span>
          </label>
        ))}
      </form>

      {/* Size */}
      <p className="my-5 font-bold text-lg">Size</p>
      <form className="space-y-1">
        {size.map((s) => (
          <label
            onClick={() => {
              setSizeFilter({ start: s.start, end: s.end });
              handleFilterBtn();
            }}
            key={s.id}
            className="flex items-center space-x-4"
          >
            <input
              type="radio"
              name="size"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="cursor-pointer">
              {s.start} - {s.end}
            </span>
          </label>
        ))}
      </form>

      {/* Brand */}
      <p className="my-5 font-bold text-lg">Brand</p>
      <div className="space-y-1">
        {brand.map((b) => (
          <label
            onClick={() => {
              setBrandFilter(b.brand_names);
              handleFilterBtn();
            }}
            key={b.id}
            className="flex items-center space-x-4"
          >
            <input
              type="radio"
              name="brand"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="cursor-pointer">{b.brand_names}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default Filter;
