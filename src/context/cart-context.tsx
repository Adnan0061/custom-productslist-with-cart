import { Product } from "@/types/type";
import { createContext } from "react";

export interface CartItemType extends Product {
  quantity: number;
}
export type CartContextType = {
  cartItems: CartItemType[] | undefined;
  increaseQuantity: (product: Product) => void | undefined;
  decreaseQuantity: (product: Product) => void | undefined;
  deleteFromCart: (id: number) => void | undefined;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  deleteFromCart: () => {},
});
