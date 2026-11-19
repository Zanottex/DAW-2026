import { api } from "../../../lib/axios";
import type { Product } from "../dtos/product";

type MockarooProduct = Omit<Product, "id" | "price"> & {
  id: number | string;
  price: number | string;
};

const ENDPOINT = "/products.json";

export const ProductServices = {
  async listAll(): Promise<Product[]> {
    const apiKey = import.meta.env.VITE_MOCKAROO_API_KEY;
    if (!apiKey) {
      throw new Error("Configure VITE_MOCKAROO_API_KEY em cardapio-react/.env.local.");
    }

    const result = await api.get<MockarooProduct[]>(ENDPOINT, {
      params: { key: apiKey },
    });

    return result.data.map((product) => {
      const id = Number(product.id);
      const price = Number(product.price);

      if (!Number.isFinite(id) || !Number.isFinite(price)) {
        throw new Error("A API do Mockaroo retornou um id ou preço inválido.");
      }

      const image = product.image.replace(/(^|\/)burguer(?=[.-])/i, "$1burger");
      return { ...product, id, price, image };
    });
  },
};
