import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { MyLittleButton } from "./button/Buttoncomponents";
import { CartContext } from "../context/CartContext";
import useAuth from "../hooks/useAuth";
import Datacard from "./datacard/Datacard";
import OrderDatacard from "./datacard/OrderDatacard";
import BasicTable from "../components/table/Producttable";
import "./finish.css";
import axios from "../api/axios";
import { MyButtonmedium } from "../components/button/Buttoncomponents";
import loginlogo from "../assets/logo1.webp";

const steps = ["Kosár", "Szállítás, Fizetés, Számlázás", "Összesítő"];

const Finish_URL = "/mezi_be/order/veglegesites.php";

const Finish = () => {
  const { auth } = useAuth();
  const [email] = useState(auth.email);
  const { userDataReq, userData2, userData } = useContext(UserContext);
  const { cartTotal, orderId, myActualData, clearFromCart, myOrderIdReq } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const errRef = useRef();

  useEffect(() => {
    userDataReq(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    myActualData(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(
    () => {
      myOrderIdReq(email);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email]
  );

  const Order = async () => {
    try {
      const response = await axios.post(
        Finish_URL,
        {
          id: orderId.id,
          comment: userData2.comment,
          adoszam: userData2.adoszam,
          EUadoszam: userData2.EUadoszam,
          adozo: userData2.adozo,
          szallitas: userData2.szallitas,
          fizetes: userData2.fizetes,
          shipid: userData.shipid,
          checkid: userData.checkid,
          total: cartTotal,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response?.data.code === "1") {
        setSuccess(true);
        clearFromCart();
        console.log();
      } else {
        setErrMsg(response?.data);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("A szerver nem válaszol!");
      } else {
        setErrMsg(err?.response);
      }
    }
    navigate("/finish");

    errRef.current.focus();
  };

  const Basket = () => {
    console.log(orderId.id);
    console.log(userData2.EUadoszam);
    navigate("/basket");
  };

  return (
    <div className="backgroundFinish">
      {success ? (
        <div className="FinishDiv">
          <div className="imgBoxFinish">
            <img
              src={loginlogo}
              loading="lazy"
              alt="Mézishop logó"
              title="Mézishop logó"
              className="imgLogoFinish"
            />
          </div>
          <section className="FinishBox ">
            <h1>Sikeres rendelés! </h1>
            <p>Hamarosan jelentkezünk!</p>
            <div className="btnBoxFinish">
              <MyButtonmedium
                onClick={() => navigate("/termekek")}
                value="Irány a shop!"
                className="loginBtn"
              ></MyButtonmedium>
            </div>
          </section>
        </div>
      ) : (
        <>
          <Box sx={{ width: "100%" }}>
            <Stepper
              activeStep={3}
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
          <p
            ref={errRef}
            className={errMsg ? "errmsgFinish" : "offscreenNewFinish"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <section className="finishBox">
            <div>
              <Datacard></Datacard>
              <OrderDatacard></OrderDatacard>

              <BasicTable></BasicTable>
              <h1 className="totalFinish">Összesen: {cartTotal} Ft </h1>
              <MyLittleButton onClick={Basket} value="Vissza"></MyLittleButton>
              <MyLittleButton onClick={Order} value="Megrendelés">
                {" "}
              </MyLittleButton>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Finish;
