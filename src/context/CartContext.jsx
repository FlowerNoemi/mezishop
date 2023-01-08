import { createContext, useEffect, useState } from "react";
import { myActualOrderData } from "../api/myactualorder";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, db: parseInt(cartItem.db) + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, db: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (parseInt(existingCartItem.db) === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? {
          ...cartItem,
          db: parseInt(cartItem.db) - 1,
        }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFroCart: () => {},
  clearItemFromCart: () => {},
  clearFromCart: () => {},
  cartCount: 0,
  total: 0,
  myActualData: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + parseInt(cartItem.db),
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + parseInt(cartItem.db) * cartItem.ar,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemToCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

  const clearItemFromCart = (cartItemToClear) =>
    setCartItems(clearCartItem(cartItems, cartItemToClear));

  const clearFromCart = () => {
    setCartItems([]);
  };

  const myActualData = async (email) => {
    try {
      const dataRequest = await myActualOrderData(email);
      setCartItems(dataRequest);
    } catch (e) {
      console.log("error message : ", e);
    }
  };

  const value = {
    cartItems,
    addItemToCart,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
    clearFromCart,
    myActualData,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
