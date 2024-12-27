import type { ReactNode } from "react";
import { useState } from "react";
import { CartContext, CartItemType } from "./cart-context";
import { Product } from "@/types/type";

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  //   const updateCart = (product: CartItemType) => {
  //     setCartItems((prevItems) => [...prevItems, product]);
  //   };
  const increaseQuantity = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      } else {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== product.id)
        );
      }
    }
  };
  const deleteFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
