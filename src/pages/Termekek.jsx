import React from "react";
import "./termekek.css";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { ProductContext } from "../context/Productcontext";

const Termekek = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="product">
      {products.map((product, id) => {
        return <ProductCard key={id} product={product} />;
      })}
    </div>
  );
};

export default Termekek;
