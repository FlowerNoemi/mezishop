import React, { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import useAuth from "../../hooks/useAuth";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Badge from "@mui/material/Badge";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "../../api/axios";
const rendeles_URL = "/mezi_be/order/rendeles.php";

const CartIcon = () => {
  const { auth } = useAuth();
  const [email] = useState(auth.email);
  const { cartCount, cartItems, myActualData } = useContext(CartContext);
  const { userData, userDataReq } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    userDataReq(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(
    () => {
      myActualData(email);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email]
  );

  const Back = async () => {
    for (const cartItem of cartItems) {
      console.log(userData.id);
      console.log(cartItem);

      try {
        const response = await axios.post(
          rendeles_URL,
          {
            email: email,
            userid: userData.id,
            termekid: cartItem.id,
            termeknev: cartItem.termeknev,
            db: cartItem.db,
            ar: cartItem.ar,
            img: cartItem.img,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response?.data.code === "1") {
          console.log("Kosárbe helyezve");
        } else {
          console.log("Sikertelen kosárba helyezés");
        }
      } catch (err) {
        if (!err?.response) {
          console.log("A szerver nem válaszol!");
        } else {
          console.log("Sikertelen kosárba helyezés");
        }
      }
    }
    navigate("/checkout");
  };
  return (
    <IconButton
      size="small"
      aria-label="show 4 new mails"
      sx={{
        color: "black",
        background:
          "linear-gradient(45deg, #E18D00 0%, #E8C07A  51%, #E18D00  100%)",
        padding: 0.5,
        marginRight: 1,
      }}
      onClick={Back}
    >
      <Badge
        badgeContent={cartCount}
        sx={{
          "& 	.MuiBadge-badge": {
            color: "#fafafa",
            background: "black",
          },
        }}
      >
        <ShoppingBasketIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
