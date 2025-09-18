// product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  rating?: number;
  badge?: string;
  category?: string;
  inStock?: boolean;
  isFavorite?: boolean;
}
