import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { store } from "../store/store";
import { useSnapshot } from "valtio";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  username: string;
  exp: number;
}
const Layout = () => {
  const navigate = useNavigate();

  const snap = useSnapshot(store);
  const at = localStorage?.getItem("at");
  const decoded: DecodedToken | null = at ? jwtDecode(at) : null;
  const userName = decoded?.username || "GUEST";
  useEffect(() => {
    // Initialize cart count from localStorage on first render
    store.cart = JSON.parse(localStorage.getItem("product") || "[]");
  }, [snap.cart]);

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <header className="flex p-3 justify-center items-center bg-blue-400 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-x-1 items-center">
            <Link to={"server-pagination"}>SERVER PAGINATION</Link>
          </div>
          <div className="flex gap-x-3">
            <button
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2 text-white"
              onClick={() => navigate("/cart")}
            >
              {`CART ${snap.cart.length ? snap.cart.length : ""}`}
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2 text-white">
              {`Logged in as  ${decoded ? userName : "GUEST"}`}
            </button>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default Layout;
