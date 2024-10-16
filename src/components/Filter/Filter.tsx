import useBrand from "../../hooks/useBrand";

const Filter = () => {
  const { brand } = useBrand();

  return (
    <>
      <p className="text-2xl mb-5 font-bold">Filter</p>

      <div className="space-y-1">
        {/* All */}
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">All</span>
        </label>

        {/* Men */}
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">Men</span>
        </label>

        {/* Women */}
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">Women</span>
        </label>

        {/* Kids */}
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">Kid</span>
        </label>
      </div>

      {/* Price */}
      <p className="my-5 font-bold text-lg">Price</p>
      <div className="space-y-1">
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">1000br - 2000br</span>
        </label>

        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">2000br - 3000br</span>
        </label>

        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">4000br - 5000br</span>
        </label>
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">5000br - 6000br</span>
        </label>
      </div>

      {/* Size */}
      <p className="my-5 font-bold text-lg">Size</p>
      <div className="space-y-1">
        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">37 - 38</span>
        </label>

        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">39 - 40</span>
        </label>

        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">41 - 42</span>
        </label>

        <label className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="cursor-pointer">43 - 44</span>
        </label>
      </div>

      <p className="my-5 font-bold text-lg">Brand</p>
      <div className="space-y-1">
        {brand.map((b) => (
          <label key={b.id} className="flex items-center space-x-4">
            <input
              type="checkbox"
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
