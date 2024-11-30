import { ProductResponse } from "../model/product";

export const handleFilter2 = (title: string, data: ProductResponse) => ({
  limit: data.limit,
  skip: data.skip,
  total: data.total,
  products:
    data?.products.filter((product) =>
      product.title.toLowerCase().startsWith(title.toLowerCase())
    ) || [],
});

export const handleFilter = (
  title: string,
  data: ProductResponse,

  sortBy: {
    name: string;

    price: string;
  },
  priceRange: { min: number; max: number }
) => {
  const filterByTitle = data?.products.filter((product) =>
    product.title.toLowerCase().startsWith(title.toLowerCase())
  );
  console.log(title);

  /*   if (priceRange) {
    console.log(priceRange);
    const a = filterByTitle.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );
    console.log(a);
  } */

  // Step 1: Apply sorting based on the sortBy criteria
  const sortedProducts = filterByTitle
    .filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    )
    .sort((a, b) => {
      // Sort by price (Ascending)
      if (sortBy.price === "asc") {
        return a.price - b.price; // Price: Lowest to Highest
      }
      // Sort by price (Descending)
      if (sortBy.price === "desc") {
        return b.price - a.price; // Price: Highest to Lowest
      }
      // Sort by name (Alphabetical - Ascending)
      if (sortBy.name === "asc") {
        return a.title.toLowerCase().localeCompare(b.title); // Name: A to Z
      }
      // Sort by name (Alphabetical - Descending)
      if (sortBy.name === "desc") {
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
