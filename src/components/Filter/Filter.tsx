import { useState } from "react";
import { brandShoes } from "../../hooks/useBrand";
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

const brandData: brandShoes[] = [
  { id: 1, brand_names: "Nike" },
  { id: 2, brand_names: "Adidas" },
  { id: 3, brand_names: "Puma" },
  { id: 4, brand_names: "New Balance" },
  { id: 5, brand_names: "Vans" },
  { id: 6, brand_names: "Converse" },
  { id: 7, brand_names: "Jordan" },
  { id: 8, brand_names: "Under Armour" },
  { id: 9, brand_names: "Skechers" },
];

const Filter = () => {
  // const { brand } = useBrand();

  const { updateBrand, updateCategory, updatePrice, updateSize } = useFilter();

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<Price | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<Size | null>(null);

  // Handle Brand Filter
  const handleBrandFilter = (filter: string) => {
    if (filter === brandFilter) {
      setBrandFilter(null);
      updateBrand(null);
    } else {
      setBrandFilter(filter);
      updateBrand(filter);
    }
  };

  // Handle Category Filter
  const handleCategoryFilter = (category: string) => {
    if (category === categoryFilter) {
      setCategoryFilter(null);
      updateCategory(null);
    } else {
      setCategoryFilter(category);
      updateCategory(category);
    }
  };

  // Handle Size
  const handleSizeFilter = (start: string, end: string) => {
    if (start === sizeFilter?.start) {
      setSizeFilter(null);
      updateSize(null);
    } else {
      setSizeFilter({ start, end });
      updateSize({ start, end });
    }
  };

  // Handle Price filter
  const handlePriceFilter = (min: string, max: string) => {
    if (min === priceFilter?.min) {
      setPriceFilter(null);
      updatePrice(null);
    } else {
      setPriceFilter({ min, max });
      updatePrice({ min, max });
    }
  };

  return (
    <>
      <p className="text-2xl mb-5 font-bold">Filter</p>

      {/* Category */}
      <div className="space-y-1">
        <p
          onClick={() => {
            setBrandFilter(null);
            // setSizeFilter(null);
            setPriceFilter(null);
            setCategoryFilter(null);
            updateBrand(null);
            updateCategory(null);
            updatePrice(null);
          }}
          className="cursor-pointer mb-2"
        >
          Default
        </p>
        {category.map((c) => (
          <div
            onClick={() => handleCategoryFilter(c.label)}
            key={c.id}
            className="cursor-pointer flex gap-x-3"
          >
            <button
              className={`${
                categoryFilter === c.label ? "btn-bg" : "bg-white"
              } border border-gray-600 rounded h-5 w-5`}
            ></button>
            <p>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Price */}
      <p className="my-5 font-bold text-lg">Price</p>
      <div className="space-y-1">
        {price.map((p) => (
          <div
            onClick={() => handlePriceFilter(p.min, p.max)}
            key={p.id}
            className="cursor-pointer flex gap-x-3"
          >
            <button
              className={`${
                priceFilter?.min === p.min ? "btn-bg" : "bg-white"
              } border border-gray-600 rounded h-5 w-5`}
            ></button>
            <p>{p.min + " - " + p.max}</p>
          </div>
        ))}
      </div>

      {/* Size */}
      <p className="my-5 font-bold text-lg">Size</p>
      {size.map((s) => (
        <div
          onClick={() => handleSizeFilter(s.start, s.end)}
          key={s.id}
          className="cursor-pointer flex gap-x-3"
        >
          <button
            className={`${
              sizeFilter?.start === s.start ? "btn-bg" : "bg-white"
            } border border-gray-600 rounded h-5 w-5`}
          ></button>
          <p>{s.start + " - " + s.end}</p>
        </div>
      ))}

      {/* Brand */}
      <p className="my-5 font-bold text-lg">Brand</p>
      <div className="space-y-1">
        {brandData.map((b) => (
          <div
            onClick={() => handleBrandFilter(b.brand_names)}
            key={b.id}
            className="cursor-pointer flex gap-x-3"
          >
            <button
              className={`${
                brandFilter === b.brand_names ? "btn-bg" : "bg-white"
              } border border-gray-600 rounded h-5 w-5`}
            ></button>
            <p>{b.brand_names}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Filter;
