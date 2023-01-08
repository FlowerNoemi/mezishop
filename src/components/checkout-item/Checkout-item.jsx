import React, { useState, useContext } from "react";
import "./checkout-item.css";
import { CartContext } from "../../context/CartContext";
import axios from "../../api/axios";
import { UserContext } from "../../context/UserContext";
import useAuth from "../../hooks/useAuth";

const delete_URL = "/mezi_be/order/delete.php";
const remove_URL = "/mezi_be/order/remove.php";
const rendeles_URL = "/mezi_be/order/rendeles.php";

const CheckoutItem = ({ cartItem }) => {
  const { auth } = useAuth();
  const [email] = useState(auth.email);
  const { termeknev, img, ar, db } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);
  const { userData } = useContext(UserContext);

  const clearItemHandler = async () => {
    clearItemFromCart(cartItem);
    console.log(userData.id);
    console.log(cartItem);
    try {
      const response = await axios.post(
        delete_URL,
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
        console.log("Sikeres törlés");
      } else {
        console.log("Sikertelen törlés");
      }
    } catch (err) {
      if (!err?.response) {
        console.log("A szerver nem válaszol!");
      } else {
        console.log("Sikertelen törlés");
      }
    }
  };

  const removeItemToHandler = async () => {
    try {
      const response = await axios.post(
        remove_URL,
        {
          email: email,
          userid: userData.id,
          termekid: cartItem.id,
          termeknev: cartItem.termeknev,
          db: parseInt(cartItem.db) - 1,
          ar: cartItem.ar,
          img: cartItem.img,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response?.data.code === "1") {
        console.log(response?.data.message);
      } else {
        console.log(response?.data.message);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("A szerver nem válaszol!");
      } else {
        console.log("Sikertelen törlés");
      }
    }

    removeItemToCart(cartItem);
  };

  const addItemToHandler = async () => {
    try {
      const response = await axios.post(
        rendeles_URL,
        {
          email: email,
          userid: userData.id,
          termekid: cartItem.id,
          termeknev: cartItem.termeknev,
          db: parseInt(cartItem.db) + 1,
          ar: cartItem.ar,
          img: cartItem.img,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response?.data.code === "1") {
        console.log(response?.data.message);
      } else {
        console.log(response?.data.message);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("A szerver nem válaszol!");
      } else {
        console.log("Sikertelen törlés");
      }
    }

    addItemToCart(cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={img} alt={`${termeknev}`} className="checkoutImg" />
      </div>
      <span className="name">{termeknev}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemToHandler}>
          &#10094;
        </div>
        <span className="value"> {db}</span>
        <div className="arrow" onClick={addItemToHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{ar} Ft</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
