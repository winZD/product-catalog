import { ProductResponse } from "../model/product";

/**
 * Filters and sorts a list of products based on the provided criteria.
 *
 * @param title - The title or partial title to filter products by. Case-insensitive.
 * @param data - The product data containing a list of products and pagination metadata.
 * @param sortBy - The sorting criteria:
 *   - `"price_asc"`: Sort by price in ascending order.
 *   - `"price_desc"`: Sort by price in descending order.
 *   - `"title_asc"`: Sort by title in alphabetical (A to Z) order.
 *   - `"title_desc"`: Sort by title in reverse alphabetical (Z to A) order.
 *   - Any other value will result in no sorting.
 * @param priceRange - The price range to filter products by, with `min` as the minimum price and `max` as the maximum price.
 *
 * @returns An object containing:
 *   - `limit`: The maximum number of items per page (from the input `data`).
 *   - `skip`: The number of items to skip (from the input `data`).
 *   - `total`: The total number of products (from the input `data`).
 *   - `products`: The filtered and sorted list of products.
 *
 * @example
 * const data = {
 *   limit: 10,
 *   skip: 0,
 *   total: 100,
 *   products: [
 *     { title: "Product A", price: 50 },
 *     { title: "Product B", price: 100 },
 *   ],
 * };
 *
 * const result = handleFilter(
 *   "product",
 *   data,
 *   "price_asc",
 *   { min: 30, max: 80 }
 * );
 *
 * console.log(result.products); // [{ title: "Product A", price: 50 }]
 */
export const handleFilter = (
  title: string,
  data: ProductResponse,

  sortBy: string,
  priceRange: { min: number; max: number }
) => {
  const filterByTitle = data?.products.filter((product) =>
    product.title.toLowerCase().includes(title.toLowerCase())
  );

  // Step 1: Apply sorting based on the sortBy criteria
  const sortedProducts = filterByTitle
    .filter(
      (product) =>
        product?.price >= priceRange?.min && product?.price <= priceRange?.max
    )
    .sort((a, b) => {
      // Sort by price (Ascending)
      if (sortBy === "price_asc") {
        return a.price - b.price; // Price: Lowest to Highest
      }
      // Sort by price (Descending)
      if (sortBy === "price_desc") {
        return b.price - a.price; // Price: Highest to Lowest
      }
      // Sort by name (Alphabetical - Ascending)
      if (sortBy === "title_asc") {
        return a.title.toLowerCase().localeCompare(b.title); // Name: A to Z
      }
      // Sort by name (Alphabetical - Descending)
      if (sortBy === "title_desc") {
        return b.title.toLowerCase().localeCompare(a.title); // Name: Z to A
      }
      // Default: no sorting
      return 0;
    });

  // Step 2: Return the filtered and sorted result
  return {
    limit: data.limit,
    skip: data.skip,
    total: data.total,
    products: sortedProducts,
  };
};
