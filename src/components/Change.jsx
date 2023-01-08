import * as React from "react";
import { useContext } from "react";
import { AllProductContext } from "../context/AllProduct";
import Changelist from "../components/changeList/ChangeList";

const Change = () => {
  const { allproducts } = useContext(AllProductContext);

  return (
    <div className="productChangeBox">
      {allproducts.map((product, id) => {
        return <Changelist key={id} allproducts={product} />;
      })}
    </div>
  );
};

export default Change;
