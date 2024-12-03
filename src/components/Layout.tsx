import React, { useEffect, useState } from "react";
import ProductCatalogClient from "./ProductCatalogClient";
import { ProductCatalog } from "./ProductCatalog";
import { useNavigate } from "react-router-dom";
import { store } from "../store/store";
import { useSnapshot } from "valtio";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  username: string;
  exp: number;
  // add other fields based on your JWT structure
}
const Layout = () => {
  const [serverPagination, setServerPagination] = useState(false);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const snap = useSnapshot(store);
  const at = localStorage?.getItem("at");
  const decoded: DecodedToken | null = at ? jwtDecode(at) : null;
  const userName = decoded?.username || "GUEST";
  useEffect(() => {
    // Initialize cart count from localStorage on first render
    store.cart = JSON.parse(localStorage.getItem("product") || "[]");
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
            {/* {JSON.stringify(snap.cart)} */}
            <button
              className="bg-blue-800 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2 text-white"
              onClick={() => navigate("/cart")}
            >
              {`KOŠARICA ${snap.cart.length}`}
            </button>
            <button className="bg-blue-800 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2 text-white">
              {`Logged in as  ${decoded ? userName : "GUEST"}`}
            </button>
          </div>
        </div>
      </header>
      {serverPagination ? <ProductCatalog /> : <ProductCatalogClient />}
    </>
  );
};

export default Layout;
