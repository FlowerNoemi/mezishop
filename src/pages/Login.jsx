import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.css";
import axios from "../api/axios";
import { Myinput, MyinputPasswordLogin } from "../components/input/Myinput";
import loginlogo from "../assets/logo1.webp";
import { MyButtonmedium } from "../components/button/Buttoncomponents";
const LOGIN_URL = "/mezi_be/auth/auth.php";

const EMAIL_REGEX =
  //eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({
        email,
        roles,
        accessToken,
      });
      navigate(from, { replace: true });
      setEmail("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Szerver nem válaszol!");
      } else if (err.response?.status === 400) {
        setErrMsg("Hibás jelszó vagy email");
      } else if (err.response?.status === 401) {
        setErrMsg("Nincs jogosultság!");
      } else {
        setErrMsg("Sikertelen bejelentkezés!");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="backgroundlog">
      <div className="logDiv">
        <div className="imgBox">
          <h1 className="logh1">Bejelentkezés</h1>
          <img
            src={loginlogo}
            loading="lazy"
            alt="Mézishop logó"
            title="Mézishop logó"
            className="imgLogo"
          />
          <p className="logP">
            Még nem regisztrált?
            <br />
            <span className="logline">
              <Link to="/register">Regisztráció</Link>
            </span>
          </p>
        </div>
        <section className="logBox">
          <p
            ref={errRef}
            className={errMsg ? "errmsglog" : ".offscreenlog"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <Myinput
              type="email"
              id="email"
              label="E-mail cím:"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              className={
                emailFocus && email && !validEmail
                  ? "instructionslog"
                  : "offscreenlog"
              }
            >
              Elküldés előtt add meg az email címed! <br />
              Az e-mail cím formátuma nem megfelelő! <br />
            </p>

            <MyinputPasswordLogin
              label="Jelszó:"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && pwd && !validPwd
                  ? "instructionslog"
                  : "offscreenlog"
              }
            >
              8-24 karakter
              <br />
              Tartalmaznia kell kis és nagybetűt, számot, speciális karaktert.{" "}
              <br />
              Engedélyezett speciális karakterek:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <div className="btnBox">
              <MyButtonmedium
                disabled={!validEmail || !validPwd ? true : false}
                className="loginBtn"
                value="Bejelentkezés"
              ></MyButtonmedium>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
