import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

const CART_KEY = "@final_assignment_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(CART_KEY).then((raw) => {
      if (raw) {
        setItems(JSON.parse(raw));
      }
    });
  }, []);

  const persistCart = async (nextItems: CartItem[]) => {
    setItems(nextItems);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(nextItems));
  };

  const addToCart = (product: Product) => {
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      persistCart(
        items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      persistCart([...items, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    persistCart(items.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    persistCart([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
