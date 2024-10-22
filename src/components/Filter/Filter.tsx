import { useState } from "react";
import useBrand from "../../hooks/useBrand";
import { useFilter } from "../../stores/useFilter";

export interface Size {
  start: string;
  end: string;
}

export interface Price {
  min: string;
  max: string;
}

const category = [
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

  const { updateBrand, updateCategory, updatePrice, updateSize } = useFilter();

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<Price | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<Size | null>(null);

  // Handle filter when the user clicks the filter options
  const handleFilterBtn = () => {
    if (categoryFilter || priceFilter || brandFilter || sizeFilter) {
      updateBrand(brandFilter);
      updateCategory(categoryFilter);
      updatePrice(priceFilter);
      updateSize(sizeFilter);
    }
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
              handleFilterBtn(); // Apply filter immediately after state change
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
              setPriceFilter({ min: p.min, max: p.max });
              handleFilterBtn(); // Apply filter immediately after state change
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
              handleFilterBtn(); // Apply filter immediately after state change
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
              handleFilterBtn(); // Apply filter immediately after state change
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
