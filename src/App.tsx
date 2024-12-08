import { ProductCatalog } from "./components/ProductCatalog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductCatalogClient from "./components/ProductCatalogClient";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {" "}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {" "}
            <Route path="/" element={<Layout />}>
              <Route index element={<ProductCatalogClient />} />
              <Route path="/server-pagination" element={<ProductCatalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
