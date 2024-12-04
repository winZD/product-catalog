import { useEffect, useState } from "react";
import { handleFilter } from "../utils/filterProducts";
import { ProductCard } from "./ProductCard";
import { Category } from "../model/category";
import { ProductResponse } from "../model/product";
import { priceRanges } from "../utils/ranges";

const ProductCatalogClient = () => {
  const [originalData, setOriginalData] = useState<ProductResponse>();
  const [filteredData, setFilteredData] = useState<ProductResponse>();
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState<{
    min: number;
    max: number;
  }>({ min: 0, max: Infinity });
  const [selectedCategory, setSelectedCategory] = useState("");

  const [page, setPage] = useState(0);
  const limit = 20;
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          selectedCategory
            ? selectedCategory
            : `https://dummyjson.com/products?limit=0`
        );
        const data = await response.json();
        //setData(data.products);
        setOriginalData(data);
        setFilteredData(handleFilter(searchQuery, data, sortBy, priceRange));

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
  }, [selectedCategory]);
  useEffect(() => {
    if (originalData) {
      /* const filtered = handleFilter(searchQuery, data, sortBy); //fix; */
      setFilteredData({
        ...filteredData,
        products: handleFilter(
          searchQuery,
          originalData,
          sortBy,
          priceRange
        )!.products.slice(page * limit, (page + 1) * limit),
      });
    }
  }, [
    searchQuery,
    sortBy,
    page,
    originalData,
    selectedCategory,
    priceRange,
    sortBy,
  ]);

  const totalPages = filteredData ? Math.ceil(filteredData.total! / limit) : 0;

  return (
    <>
      <div className="w-full flex justify-evenly p-3 bg-blue-100">
        <div className="">
          {/*      <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search
          </label> */}
          <div className="flex relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setPage(0);
                setSearchQuery(e.target.value);
              }}
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
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              onClick={() =>
                setFilteredData(
                  handleFilter(searchQuery, originalData!, sortBy, priceRange)
                )
              }
            >
              Search
            </button>
          </div>
        </div>
        <div className="">
          {/*      <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Categories
          </label> */}
          <select
            id="category-filter"
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setPage(0);
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="">All</option>
            {categories!.map((cat) => (
              <option key={cat.slug} value={cat.url}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          {/*  <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Prices
          </label> */}
          <select
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setPage(0);
              const range = priceRanges.find((r) => r.label === e.target.value);
              if (range) {
                setPriceRange({ min: range.min, max: range.max });
              }
            }}
          >
            {" "}
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          {/* <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sort products
          </label> */}
          <select
            className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setPage(0);
              setSortBy(e.target.value);
            }}
          >
            <option value="">Sort Products</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="title_asc">Name: A to Z</option>
            <option value="title_desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="grid p-2 sm:grid-cols-2 md:grid-cols-4 justify-center gap-4">
        {filteredData &&
          filteredData.products.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                id={product.id}
                description={product.description}
                thumbnail={product.thumbnail}
                title={product.title}
                price={product.price}
              />
            </div>
          ))}
      </div>
      <div className="flex justify-end mt-4 gap-x-3">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          {page + 1}
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={
            page + 1 >= totalPages || filteredData!.products?.length < 20
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductCatalogClient;
