import { createContext, useState, useEffect } from "react";
import { getAllProduct } from "../api/getallproduct";

export const ProductContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([""]);
  const allProduct = async () => {
    try {
      const dataRequest = await getAllProduct();
      setProducts(dataRequest);
    } catch (e) {
      console.log("error message : ", e);
    }
  };

  useEffect(() => {
    allProduct();
  }, []);

  const value = { products, setProducts };

  return (
    <ProductContext.Provider value={value}> {children}</ProductContext.Provider>
  );
};
