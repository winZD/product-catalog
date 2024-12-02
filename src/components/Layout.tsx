import React, { useEffect, useState } from "react";
import ProductCatalogClient from "./ProductCatalogClient";
import { ProductCatalog } from "./ProductCatalog";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [serverPagination, setServerPagination] = useState(false);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Initialize cart count from localStorage on first render
    const initialCart = JSON.parse(localStorage.getItem("product") || "[]");
    setCartCount(initialCart.length);
  }, []);

  return (
    <>
      <header className="flex p-3 justify-center items-center bg-blue-400">
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="mr-3 text-gray-700">Toggle:</span>
            <label
              htmlFor="toggleSwitch"
              className="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggleSwitch"
                className="sr-only peer"
                onChange={(e) => setServerPagination(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300"></div>
              <div className="absolute top-0.5 left-1 w-5 h-5 bg-white border rounded-full peer-checked:translate-x-full peer-checked:border-white"></div>
            </label>
          </div>
          <div>
            <button
              className="bg-blue-800 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2 text-white"
              onClick={() => navigate("/cart")}
            >
              {`KOŠARICA ${cartCount}`}
            </button>
            <button className="bg-blue-800 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2 text-white">
              {`Logged in as  ${"GUEST"}`}
            </button>
          </div>
        </div>
      </header>
      {serverPagination ? <ProductCatalog /> : <ProductCatalogClient />}
    </>
  );
};

export default Layout;
