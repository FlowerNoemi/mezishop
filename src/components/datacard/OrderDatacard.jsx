import "./orderdatacard.css";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import React from "react";

const OrderDatacard = () => {
  const { userData2 } = useContext(UserContext);
  const { cartCount, cartItems, myActualData, myOrderIdReq, orderId } =
    useContext(CartContext);

  return (
    <article
      style={{ padding: "30px" }}
      className="flex-container-Orderdatacard"
    >
      <div className="flex-item-left-Orderdatacard">
        {userData2.szallitas === "Személyes átvétel" ? (
          <div>
            <h1>Egyéb adatok:</h1>
            <p>Rendelés azonosító: {orderId.id}</p>
            <p className="OrderDataP">Számlázási adatok: {userData2.adozo}</p>
            <p className="OrderDataP2">
              Adószám:{" "}
              {userData2.adozo === "Jogi személy" ? userData2.adoszam : "-"}
            </p>
            <p className="OrderDataP2">
              EU adószám:{" "}
              {userData2.adozo === "Jogi személy" ? userData2.EUadoszam : "-"}
            </p>
            <p className="OrderDataP">Fizetési mód: {userData2.fizetes}</p>
            <p className="OrderDataP">
              Megjegyzés:
              {userData2.comment === "" ? "-" : userData2.comment}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex-item-left-Orderdatacard">
              <h1>Egyéb adatok:</h1>
              <p>Rendelés azonosító: {orderId.id}</p>
              <p className="OrderDataP">Számlázási adatok: {userData2.adozo}</p>
              <p className="OrderDataP2">
                Adószám:{" "}
                {userData2.adozo == "Jogi személy" ? userData2.adoszam : "-"}
              </p>
              <p className="OrderDataP2">
                EU adószám:{" "}
                {userData2.adozo == "Jogi személy" ? userData2.EUadoszam : "-"}
              </p>
              <p className="OrderDataP">Fizetési mód: {userData2.fizetes}</p>
              <p className="OrderDataP">
                Megjegyzés:
                {userData2.comment == "" ? "-" : userData2.comment}
              </p>
              <p className="OrderDataP">
                {" "}
                Szállítási mód: {userData2.szallitas}
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default OrderDatacard;
