const Filter = () => {
  return (
    <>
      <p className="text-2xl mb-5 font-bold">Filter</p>

      <div className="space-y-1">
        {/* All */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">All</span>
        </label>

        {/* Men */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">Men</span>
        </label>

        {/* Women */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">Women</span>
        </label>

        {/* Kids */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">Kid</span>
        </label>
      </div>
      <p className="my-5 font-bold text-lg">Price</p>
      <div className="space-y-1">
        {/* All */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">1000br - 2000br</span>
        </label>

        {/* Men */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">2000br - 3000br</span>
        </label>

        {/* Women */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">4000br - 5000br</span>
        </label>
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">5000br - 6000br</span>
        </label>
      </div>

      <p className="my-5 font-bold text-lg">Size</p>
      <div className="space-y-1">
        {/* All */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">37 - 38</span>
        </label>

        {/* Men */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">39 - 40</span>
        </label>

        {/* Women */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">41 - 42</span>
        </label>
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">43 - 44</span>
        </label>
      </div>

      <p className="my-5 font-bold text-lg">Brand</p>
      <div className="space-y-1">
        {/* Nike */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">Nike</span>
        </label>

        {/* Jordan */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">Jordan</span>
        </label>

        {/* Adidas */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">Adidas</span>
        </label>

        {/* New Balance */}
        <label className="flex items-center space-x-4 text-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="font-bold">New Balance</span>
        </label>
      </div>
    </>
  );
};

export default Filter;
