import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import "./productcard.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { MyBigButton } from "../components/button/Buttoncomponents";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { auth } = useAuth();
  const { id, termeknev, img, ar, mennyiseg } = product;
  const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const level = auth?.roles?.find((role) => role.includes("2000"));

  const addProductToCart = () => {
    if (level) {
      addItemToCart(product);
    } else {
      navigate("/login");
    }
  };

  return (
    <Card className="cards" data-tilt key={id} sx={{ marginBottom: "60px" }}>
      <article className="post">
        <div className="card-title">
          <h2>{termeknev}</h2>
        </div>
        <div className="post-img-box">
          <img
            src={img}
            alt={`${termeknev}`}
            title={`${termeknev}`}
            className="post-img"
          />
        </div>
        <CardContent className="post-content">
          <h4>{mennyiseg}</h4>
          <div className="ar">{ar} Ft</div>
          <CardActions className="cardactions">
            <div className="buttonBox">
              <MyBigButton value="Kosárba" onClick={addProductToCart}>
                Kosárba
              </MyBigButton>
            </div>
          </CardActions>
        </CardContent>
      </article>
    </Card>
  );
};
export default ProductCard;
