import { ProductResponse } from "../model/product";

export const handleFilter = (title: string, data: ProductResponse) => ({
  limit: data.limit,
  skip: data.skip,
  total: data.total,
  products:
    data?.products.filter((product) =>
      product.title.toLowerCase().startsWith(title.toLowerCase())
    ) || [],
});
