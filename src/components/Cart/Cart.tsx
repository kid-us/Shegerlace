import { useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import { useNavigate } from "react-router-dom";

interface Props {
  onCart: () => void;
}

const Cart = ({ onCart }: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    updateCartItemSize,
    clearCart,
  } = useCartStore();

  const [animationClass, setAnimationClass] = useState<string>(
    "animate__fadeInRight"
  );

  //   Hide Cart
  const handleClose = () => {
    setAnimationClass("animate__fadeOutRight");
    setTimeout(() => {
      onCart();
    }, 500);
  };

  //   Change Quantity
  const handleQuantityChange = (id: number, quantity: number) => {
    console.log(quantity);

    if (quantity > 0) {
      updateCartItemQuantity(id, quantity);
    }
  };

  //   Change Size
  const handleSizeChange = (id: number, size: string) => {
    updateCartItemSize(id, size);
  };

  // Remove item from Cart
  const handleRemoveCart = (id: number) => {
    if (cart.length === 1) {
      setAnimationClass("animate__fadeOutRight");
      removeFromCart(id);
      setTimeout(() => {
        onCart();
      }, 500);
    } else {
      removeFromCart(id);
    }
  };

  // Handle Checkout
  const handleCheckout = () => {
    const hasInvalidSize = cart.some((c) => c.size === 0);

    if (hasInvalidSize) {
      setError(true);
      console.log("Invalid size found");
    } else {
      setError(false);
      navigate("/checkout/cart");
    }
  };

  return (
    <>
      <div
        onClick={() => handleClose()}
        className="overlay w-full h-full z-30"
      ></div>
      <div
        className={`fixed z-30 bottom-0 right-0 bg-white lg:w-[28%] w-full lg:h-[91vh] h-full rounded-tl-xl px-3
            animate__animated ${animationClass}
            `}
      >
        <div className="flex justify-between mb-5 px-3 pt-5">
          <p className="text-xl">
            Cart
            <span className="text-red-600 ms-2">{cart.length}</span>
          </p>
          <button
            onClick={() => handleClose()}
            className="bi-x bg-black text-white rounded w-6 h-6 shadow shadow-zinc-900"
          ></button>
        </div>
        <div className="relative h-full">
          <div className="bg-primary h-[70%] shadow-inner w-full px-3 pt-6 rounded-lg overflow-y-scroll">
            {/* Cart Items */}
            {cart.map((c) => (
              <div
                key={c.id}
                className="relative flex bg-black mb-6 rounded p-2 gap-x-3 shadow shadow-zinc-900"
              >
                <img
                  src={c.img}
                  alt="Item"
                  className="w-40 h-20 object-contain bg-white rounded"
                />
                <div>
                  <p className="text-white pt-1 text-xs">Price</p>
                  <p className="text-white text-md mt-4 font-cousine">
                    {c.price}br
                  </p>
                </div>

                <div>
                  <p className="text-white pt-1 text-xs">Quantity</p>
                  <div className="flex mt-2">
                    <button
                      onClick={() => handleQuantityChange(c.id, c.quantity - 1)}
                      className="bi-dash btn-bg h-9 text-white rounded-l w-8 shadow shadow-zinc-900"
                    ></button>
                    <input
                      type="number"
                      name="quantity"
                      className="w-12 focus:outline-none h-9 text-center"
                      value={c.quantity}
                      readOnly
                      min={1}
                    />
                    <button
                      onClick={() => handleQuantityChange(c.id, c.quantity + 1)}
                      className="bi-plus btn-bg h-9 text-white rounded-r w-8 shadow shadow-zinc-900"
                    ></button>
                  </div>
                </div>
                <div>
                  <p className="text-white pt-1 text-xs">Size</p>
                  <select
                    onChange={(e) =>
                      handleSizeChange(c.id, e.currentTarget.value)
                    }
                    className="lg:w-20 w-16 text-center font-poppins mt-2 focus:outline-none rounded h-9"
                    value={c.size}
                  >
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                  </select>
                </div>
                {/* Remove Cart */}
                <button
                  onClick={() => handleRemoveCart(c.id)}
                  className="absolute -top-4 -right-2 bi-x bg-red-500 text-white rounded-full w-6 h-6 shadow shadow-zinc-900"
                ></button>
              </div>
            ))}
          </div>

          {/* Size Error */}
          {error && (
            <p className="bg-red-500 mt-2 text-sm text-center rounded ps-2 text-white">
              Please select a shoe size.
            </p>
          )}

          {/* Button */}
          <div className="mt-3 px-1 h-[30%]">
            <button
              onClick={() => {
                handleClose();
                clearCart();
              }}
              className="bg-red-500 w-full rounded font-bold text-white h-11 shadow shadow-zinc-900"
            >
              Clear Bag
              <span className="bi-trash-fill ms-3 text-white"></span>
            </button>

            <button
              onClick={() => handleCheckout()}
              className="bg-green-500 mt-3 w-full rounded font-bold text-white h-11 shadow shadow-zinc-900 text-center"
            >
              Checkout
              <span className="bi-check text-xl text-white"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
