import { useEffect, useState } from "react";
import { Product, ProductResponse } from "../model/product";
import { ProductCard } from "./ProductCard";
import { handleFilter } from "../utils/filterProducts";

export const ProductCatalog = () => {
  const [data, setData] = useState<ProductResponse>();
  const [filteredData, setFilteredData] = useState<ProductResponse>();
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage] = useState<number>(20);

  // Calculate paginated products
  /*   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex); */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=200"
        );
        const data = await response.json();
        /* setData(data.products); */
        setData(data);
        setFilteredData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="max-w-lg flex justify-evenly">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.74 11.74a8 8 0 1 0-1.42 1.42l4.5 4.5a1 1 0 0 0 1.42-1.42l-4.5-4.5zm-7.74-.74a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
            />
          </svg>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={() => setFilteredData(handleFilter(searchQuery, data!))}
        >
          Pretraži
        </button>
      </div>
      <div className="grid p-2 sm:grid-cols-2 md:grid-cols-4 justify-center gap-4">
        {filteredData?.products.map((product) => (
          <div key={product.id}>
            <ProductCard
              description={product.description}
              thumbnail={product.thumbnail}
              title={product.title}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </>
  );
};
