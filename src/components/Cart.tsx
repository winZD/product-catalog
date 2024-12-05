import React, { useEffect, useState } from "react";
import { CartModel } from "../model/cart";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems] = useState<CartModel[]>(
    JSON.parse(localStorage.getItem("product") || "[]")
  );
  const navigate = useNavigate();
  const authenticate = async (): Promise<void> => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30, // optional, defaults to 60
        }),
        // credentials: "include", // Include cookies (e.g., accessToken) in the request
      });

      const data = await response.json();

      if (data) {
        localStorage.setItem("at", data.accessToken);
        localStorage.setItem("rt", data.refreshToken);
      }

      console.log(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const at = localStorage?.getItem("at");
  const decoded = at ? jwtDecode(at!) : 0;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    /*  if ((decoded && decoded.exp!) < Date.now() / 1000) {
      localStorage.clear();
    } */
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [decoded]);

  /* useEffect(() => {
      // Mocked fetch, replace with actual API call if needed
      const fetchCartItems = async () => {
        try {
          const response = await fetch("https://dummyjson.com/carts/1"); // Mock API
          const data = await response.json();
          setCartItems(data.products);
          calculateTotal(data.products);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
  
      fetchCartItems();
    }, []);
   */
  /*   const calculateTotal = (items: CartItem[]) => {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);
    };
  
    const handleRemove = (id: number) => {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    }; */

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
                  <p>Price: {item.price}</p>
                  {/*  <p>Quantity: {"item.quantity"}</p> */}
                  {/* 
                  <button
                      onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-red-600"
                  >
                    Remove
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">Total: {totalPrice}</h2>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
              onClick={async () => {
                console.log(decoded);
                if (!decoded) {
                  navigate("/login");
                  return;
                }
                if ((decoded && decoded.exp!) < Date.now() / 1000) {
                  /*  await authenticate(); */

                  const response = await fetch(
                    "https://dummyjson.com/auth/refresh",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        refreshToken: localStorage.getItem("rt"), // Optional, if not provided, the server will use the cookie
                        expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
                      }),
                    }
                  );

                  const data = await response.json();

                  if (data) {
                    localStorage.setItem("at", data.accessToken);
                    localStorage.setItem("rt", data.refreshToken);
                  }
                }
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
