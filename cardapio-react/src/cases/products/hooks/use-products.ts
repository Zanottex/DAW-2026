import { useEffect, useState } from "react";
import { ProductServices } from "../services/product-services";
import type { Product } from "../dtos/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ProductServices.listAll()
      .then(setProducts)
      .catch((cause: unknown) => {
        setError(cause instanceof Error ? cause.message : "Falha ao carregar produtos.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
