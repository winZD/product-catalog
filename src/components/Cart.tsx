import { useEffect, useState } from "react";
import { CartModel } from "../model/cart";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems] = useState<CartModel[]>(
    JSON.parse(localStorage.getItem("product") || "[]")
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const at = localStorage?.getItem("at");

  const decoded = at ? jwtDecode(at!) : 0;
  const [totalPrice, setTotalPrice] = useState(0);

  const notify = () => toast.info("Checkout completed!");

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {cartItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center border p-4 rounded-lg"
              >
                <div className="w-1/4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-3/4 pl-4">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p>Price: {item.price.toFixed(2) + "$"}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">Total: {totalPrice + "$"}</h2>
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed`}
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                if (!decoded) {
                  navigate("/login");
                  return;
                }
                if ((decoded && decoded.exp!) < Date.now() / 1000) {
                  const response = await fetch(
                    "https://dummyjson.com/auth/refresh",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        refreshToken: localStorage.getItem("rt"),
                        expiresInMins: 30,
                      }),
                    }
                  );

                  const data = await response.json();

                  if (data) {
                    localStorage.setItem("at", data.accessToken);
                    localStorage.setItem("rt", data.refreshToken);
                    setIsLoading(false);
                  }
                }
                notify();
                navigate("/");
                localStorage.removeItem("product");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
