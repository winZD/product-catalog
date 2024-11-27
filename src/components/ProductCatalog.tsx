import { useEffect, useState } from "react";
import { Product } from "../model/product";
import { ProductCard } from "./ProductCard";

export const ProductCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid p-2 sm:grid-cols-2 md:grid-cols-4 justify-center gap-4">
      {products.map((product) => (
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
  );
};
