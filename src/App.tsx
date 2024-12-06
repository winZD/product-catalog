import { ProductCatalog } from "./components/ProductCatalog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductCatalogClient from "./components/ProductCatalogClient";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Cart from "./components/Cart";

const queryClient = new QueryClient();

function App() {
  /*  const [serverPagination, setServerPagination] = useState(false);
  console.log(serverPagination); */
  return (
    <>
      {" "}
      <QueryClientProvider client={queryClient}>
        {/*         <header className="flex p-3 justify-center items-center bg-blue-400">
          CATALOG
          <div className="flex items-center">
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
        </header> */}
        <BrowserRouter>
          <Routes>
            {" "}
            <Route path="/" element={<Layout />}>
              <Route index element={<ProductCatalogClient />} />
              <Route path="/server-pagination" element={<ProductCatalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Route>
            {/* <Route index element={<RecentActivity />} />
        <Route path="project/:id" element={<Project />} /> */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
