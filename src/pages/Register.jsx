import { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { Myinput, MyinputPassword } from "../components/input/Myinput";
import { MyButtonmedium } from "../components/button/Buttoncomponents";
import loginlogo from "../assets/logo1.webp";

const REGISTER_URL = "/mezi_be/register/register.php";

const EMAIL_REGEX =
  //eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Érvénytelen mező");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        { email: email, password: pwd },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response?.data.code === "1") {
        setSuccess(true);
        setEmail("");
        setPwd("");
        setMatchPwd("");
      } else {
        setSuccess(false);
        setErrMsg(response.data.message);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("A szerver nem válaszol!");
      } else if (err.response?.status === 409) {
        setErrMsg("Regisztrált email cím");
      } else {
        setErrMsg("Sikertelen regisztráció");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="backgroundreg">
      {success ? (
        <div className="regSection">
          <div className="imgBoxReg">
            <img
              src={loginlogo}
              loading="lazy"
              alt="Mézishop logó"
              title="Mézishop logó"
              className="imgLogoReg"
            />
          </div>
          <section className="regSuccses ">
            <h1>Sikeres regisztráció </h1>
            <div className="btnBoxReg">
              <MyButtonmedium
                onClick={() => navigate("/login")}
                value="Bejelentkezés!"
                className="loginBtn"
              ></MyButtonmedium>
            </div>
          </section>
        </div>
      ) : (
        <section className="regBox">
          <section className="regSection">
            <div className="imgBox">
              <h1 className="logh1">Regisztráció</h1>
              <img
                src={loginlogo}
                loading="lazy"
                alt="Mézishop logó"
                title="Mézishop logó"
                className="imgLogo"
              />
            </div>
            <div className="formRegsec">
              <form onSubmit={handleSubmit} className="formReg">
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
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
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
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

                <label htmlFor="password">
                  Jelszó:
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <MyinputPassword
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8-24 karakter
                  <br />
                  Tartalmaznia kell kis és nagybetűt, számot, speciális
                  karaktert. <br />
                  Engedélyezett speciális karakterek:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
                <label htmlFor="confirm_pwd">
                  Jelszó megerősítés:
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <MyinputPassword
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />A megadott jelszavak
                  nem egyeznek!
                </p>
                <MyButtonmedium
                  disabled={
                    !validEmail || !validPwd || !validMatch ? true : false
                  }
                  className="regBtn"
                  value="Regisztráció"
                >
                  Regisztráció
                </MyButtonmedium>
              </form>
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default Register;
