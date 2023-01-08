import React, { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import "./contact.css";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CallIcon from "@mui/icons-material/Call";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Myinput, MyTextArea } from "../components/input/Myinput";
import { MyButtonmedium } from "../components/button/Buttoncomponents";
import loginlogo from "../assets/logo1.webp";
import Background from "../assets/bg.webp";
const MESSAGE_URL = "/mezi_be/message/newmessage.php";

//eslint-disable-next-line
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Contact() {
  const errRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [message, setMessage] = useState("");
  const [validMessage, setValidMessage] = useState(false);
  const [messageFocus, setMessageFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const MESSAGE_REGEX = (message) => {
    if (message.length > 1) {
      return true;
    }
  };

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = MESSAGE_REGEX(message);
    setValidMessage(result);
  }, [message]);

  useEffect(() => {
    setErrMsg("");
  }, [email, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = MESSAGE_REGEX(message);

    if (!v1 || !v2) {
      setErrMsg("Érvénytelen mező");
      return;
    }
    try {
      const response = await axios.post(
        MESSAGE_URL,
        { email: email, message: message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response?.data.code === "1") {
        setSuccess(true);
        setEmail("");
        setMessage("");
      } else {
        setSuccess(false);
        setErrMsg(response.data.message);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("A szerver nem válaszol!");
      } else {
        setErrMsg("Sikertelen üzenetküldés");
      }
      errRef.current.focus();
    }
  };
  const mystyle = {
    backgroundImage: `url(${Background})`,
    loading: "lazy",
    backgroundRepeat: "no-repeat",
    height: "30vh",
    backgroundPosition: "100% 0%",
  };

  return (
    <>
      <div className="backgroundContact">
        {success ? (
          <div className="ContactDiv">
            <div className="imgBoxContact">
              <img
                src={loginlogo}
                loading="lazy"
                alt="Mézishop logó"
                title="Mézishop logó"
                className="imgLogoContact"
              />
            </div>
            <section className="contactBox ">
              <h1>Sikeres üzenetküldés! </h1>
              <p>Hamarosan jelentkezünk!</p>
              <div className="btnBox">
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
            <div style={mystyle}></div>
            <section className="contactContainer">
              <div className="ContactDivCont1">
                <h1 className="Contacth1">Keressen minket!</h1>
                <Stack>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: "black",
                            background:
                              "linear-gradient(45deg, #E18D00 0%, #E8C07A  51%, #E18D00  100%)",
                          }}
                        >
                          <CallIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          "& .MuiTypography-root": {
                            fontFamily: "Arima Madurai, sans-serif",
                          },
                        }}
                        primary="Hívjon bizalommal!"
                        secondary="+36307774447"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: "black",
                            background:
                              "linear-gradient(45deg, #E18D00 0%, #E8C07A  51%, #E18D00  100%)",
                          }}
                        >
                          <ContactMailIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          "& .MuiTypography-root": {
                            fontFamily: "Arima Madurai, sans-serif",
                          },
                        }}
                        primary="Küldjön e-mailt!"
                        secondary="testmail@gmail.com"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: "black",
                            background:
                              "linear-gradient(45deg, #E18D00 0%, #E8C07A  51%, #E18D00  100%)",
                          }}
                        >
                          <AddLocationIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          "& .MuiTypography-root": {
                            fontFamily: "Arima Madurai, sans-serif",
                          },
                        }}
                        primary="Jöjjön el hozzánk!"
                        secondary="4002, Tesz-Vesz Város Teszt út 10"
                      />
                    </ListItem>
                  </List>
                </Stack>
              </div>
              <div className="ContactDivCont2">
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <h1 className="Contacth1">Írjon nekünk!</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">
                    E-mail cím:
                    <span className={validEmail ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <Myinput
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                  <p
                    id="emailnote"
                    className={
                      emailFocus && email && !validEmail
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Elküldés előtt add meg az email címed! <br />
                    Az e-mail cím formátuma nem megfelelő! <br />
                  </p>
                  <label htmlFor="message">
                    Üzenet
                    <span className={validMessage ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={validMessage || !message ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <MyTextArea
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    aria-describedby="messagenote"
                    onFocus={() => setMessageFocus(true)}
                    onBlur={() => setMessageFocus(false)}
                  />
                  <p
                    id="message"
                    className={
                      messageFocus && message && !validMessage
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Minimum 2 karakter szükséges! <br />
                  </p>
                  <div className="btnBox">
                    <MyButtonmedium
                      disabled={!validEmail || !validMessage ? true : false}
                      value="Küldés"
                      className="loginBtn"
                    ></MyButtonmedium>
                  </div>
                </form>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default Contact;
