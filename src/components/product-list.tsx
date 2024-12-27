import { useEffect, useState } from "react";
import Product from "./product/product";
import type { ProductsResponse, Product as ProductType } from "@/types/type";

export default function ProductList() {
  const [products, setProducts] = useState<ProductsResponse["products"]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    async function fetchProducts(): Promise<void> {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("https://dummyjson.com/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Runtime type validation
        const isValidProduct = (product: unknown): product is ProductType => {
          return (
            typeof product === "object" &&
            product !== null &&
            "id" in product &&
            typeof (product as ProductType).id === "number" &&
            "title" in product &&
            typeof (product as ProductType).title === "string" &&
            // few products doesn't have brand so in this api this check is not valid
            // "brand" in product &&
            // typeof (product as ProductType).brand === "string" &&
            "price" in product &&
            typeof (product as ProductType).price === "number" &&
            "discountPercentage" in product &&
            typeof (product as ProductType).discountPercentage === "number" &&
            "thumbnail" in product &&
            typeof (product as ProductType).thumbnail === "string"
          );
        };

        const isValidProductsResponse = (
          data: unknown
        ): data is ProductsResponse => {
          return (
            typeof data === "object" &&
            data !== null &&
            "products" in data &&
            Array.isArray((data as ProductsResponse).products) &&
            (data as ProductsResponse).products.every(isValidProduct)
          );
        };

        if (!isValidProductsResponse(data)) {
          throw new Error("API response does not match expected type");
        }

        setProducts(data.products);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            setError(new Error("Request timed out"));
          } else {
            setError(err);
          }
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
        clearTimeout(timeoutId);
      }
    }

    // Initial fetch
    fetchProducts();

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) <div>Loading...</div>;
  if (error) <div>Error: {error.message}</div>;
  if (!products) <div>No products found</div>;

  return (
    <div className="flex flex-wrap justify-center w-full gap-4 bg-white">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
