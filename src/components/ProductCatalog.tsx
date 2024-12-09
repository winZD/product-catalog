import { FormEvent, useEffect, useState } from "react";
import { ProductResponse } from "../model/product";
import { ProductCard } from "./ProductCard";
import { Category } from "../model/category";
import { useQuery } from "@tanstack/react-query";

export const ProductCatalog = () => {
  const [data, setData] = useState<ProductResponse | null>();

  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sortPrice, setSortPrice] = useState<{ value: string }>();
  const limit = 20;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${page}`
        );
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page]);

  useEffect(() => {
    setSearchQuery("");
    setSortPrice({ value: "" });
  }, [category]);

  const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch("https://dummyjson.com/products/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  };

  const {
    data: categories,
    error: categoriesError,
    isPending: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setPage(0);
    const response = await fetch(
      category
        ? `${category}${
            sortPrice ? `?sortBy=price&order=${sortPrice.value}&` : "?"
          }limit=${limit}&skip=${page}&select=title,price,thumbnail,description`
        : `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${page}${
            sortPrice ? `&sortBy=price&order=${sortPrice.value}` : ""
          }&select=title,price,thumbnail,description`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    setData(data);
  };
  const totalPages = Math.ceil(data! && data!.total! / limit);
  if (categoriesLoading) return <p>Loading...</p>;
  if (categoriesError) return <p>Error loading data!</p>;

  return (
    <div className="w-full">
      <form
        className="grid p-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        onSubmit={handleSubmit}
      >
        {!category && (
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        )}
        <select
          className="py-2 px-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories!.map((cat) => (
            <option key={cat.slug} value={cat.url}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          className="py-2 px-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={sortPrice?.value}
          onChange={(e) => setSortPrice({ value: e.target.value })}
        >
          {[
            { label: "All prices", value: "" },
            { label: "Price ASC", value: "asc" },
            { label: "Price DESC", value: "desc" },
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Search
        </button>
      </form>
      <div className="grid p-2 sm:grid-cols-2 lg:3 xl:grid-cols-4 justify-center gap-4">
        {data &&
          data.products.map((product) => (
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
      <div className="flex justify-center mt-4 gap-3">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
          onClick={() => setPage((old) => Math.max(old - 20, 0))}
          disabled={page === 0}
        >
          Prev
        </button>

        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          {" "}
          {page / limit + 1}
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
          onClick={() => setPage((old) => old + 20)}
          disabled={page / 20 + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
