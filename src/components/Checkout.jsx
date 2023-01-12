import "./checkout.css";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutItem from "./checkout-item/Checkout-item";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { MyLittleButton, MyButtonmedium } from "./button/Buttoncomponents";
import loginlogo from "../assets/logo1.webp";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  const navigate = useNavigate();

  const Basket = async () => {
    navigate("/basket");
  };
  const Shop = async () => {
    navigate("/termekek");
  };

  const steps = ["Kosár", "Szállítás, Fizetés, Számlázás", "Összesítő"];

  return (
    <>
      <div>
        {!cartTotal ? (
          <div className="basketEmpty">
            <h1>A kosár üres!</h1>
            <img
              src={loginlogo}
              loading="lazy"
              alt="Mézishop logó"
              title="Mézishop logó"
              className="imgLogo"
            />
            <MyButtonmedium
              onClick={Shop}
              value="Irány a shop"
            ></MyButtonmedium>
          </div>
        ) : (
          <div className="checkoutBox">
            <Box sx={{ width: "100%", p: 1 }}>
              <Stepper
                activeStep={1}
                alternativeLabel
                sx={{
                  "& 	.MuiStepIcon-root.Mui-completed": {
                    color: "#E18D00",
                  },
                  "& 	.MuiStepIcon-root": {
                    color: "#E18D00",
                  },
                  "& 	.MuiStepIcon-root.Mui-active": {
                    color: "#E18D00",
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label} </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <div className="checkout-container">
              {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
              ))}
              <p className="total">Összesen: {cartTotal} Ft </p>

              <MyLittleButton
                onClick={Shop}
                value="Shop"
                className="shopBtn"
              ></MyLittleButton>
              <MyLittleButton
                className="shopBtn"
                onClick={Basket}
                value="Tovább"
              ></MyLittleButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
