import * as React from "react";
import flowerNoemi from "../assets/fn.webp";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footerBox">
      <p className="copy">
        <sup>&copy;</sup> 2022
      </p>
      <img
        src={flowerNoemi}
        loading="lazy"
        alt="FlowerNoemi logó"
        title="FlowerNoemi logó"
        className="logoFlowerNoemi"
      />
    </div>
  );
};

export default Footer;
