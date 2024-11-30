import { useEffect, useState } from "react";
import { Product, ProductResponse } from "../model/product";
import { ProductCard } from "./ProductCard";
import { handleFilter } from "../utils/filterProducts";
import { Category } from "../model/category";
import { priceRanges } from "../utils/ranges";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const ProductCatalog = () => {
  const [data, setData] = useState<ProductResponse>();
  const [filteredData, setFilteredData] = useState<ProductResponse>();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  // Calculate paginated products
  /*   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex); */
  const [page, setPage] = useState(0);
  const limit = 20;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${page}`
        );
        const data = await response.json();
        //setData(data.products);
        setData(data);
        setFilteredData(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [page]);

  const totalPages = Math.ceil(filteredData! && filteredData!.total! / limit);

  const [sortBy, setSortBy] = useState({
    name: "",
    price: "",
  });
  /*   const fetchProducts = async (): Promise<ProductResponse> => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  };

  const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  };
  const {
    data: products,
    error: productsError,
    isPending: productsLoading,
  } = useQuery({
    queryKey: ["products", page, limit, searchQuery],
    queryFn: fetchProducts,
  });
  const {
    data: categories,
    error: categoriesError,
    isPending: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    
  });
  const totalPages = Math.ceil(products! && products!.total! / limit);
  if (productsLoading || categoriesLoading) return <p>Loading...</p>;
  if (productsError || categoriesError) return <p>Error loading data!</p>; */

  return (
    <>
      <div className="w-full flex justify-evenly">
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
              onChange={(e) => console.log(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300"></div>
            <div className="absolute top-0.5 left-1 w-5 h-5 bg-white border rounded-full peer-checked:translate-x-full peer-checked:border-white"></div>
          </label>
        </div>
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
        <select
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          /* onChange={(e) => setSelectedCategory(e.target.value)} */
        >
          <option value="">All Categories</option>
          {categories!.map((cat) => (
            <option key={cat.slug} value={cat.url}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          /*  onChange={(e) => setSelectedPriceRange(e.target.value)} */
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={() =>
            setFilteredData(handleFilter(searchQuery, data!, sortBy))
          }
        >
          Search
        </button>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
            onClick={() => setPage((old) => Math.max(old - 20, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ml-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            onClick={() => setPage((old) => old + 20)}
            disabled={page / 20 + 1 >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid p-2 sm:grid-cols-2 md:grid-cols-4 justify-center gap-4">
        {filteredData &&
          handleFilter(searchQuery, data!, sortBy)!.products.map((product) => (
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
