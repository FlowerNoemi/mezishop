import { useState, useEffect, useRef} from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@mui/material/Link';
import axios from '../api/axios';
import './register.css';

const REGISTER_URL = '/mezi_be/register/register.php';
//eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const  Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [vname, setVname] = useState('');
 
  const [kname, setKname] = useState('');


  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);


  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();

  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
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
      const response = await axios.post(REGISTER_URL,
           {email:email, vname:vname, kname:kname , password:pwd} ,
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(response?.data.code);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))

      if(response?.data.code == '1') {
      setSuccess(true);
      setEmail('');
      setPwd('');
      setMatchPwd('');
      setKname('');
      setVname('');
    }
      else  {
        setSuccess(false);
        setErrMsg(response.data.message);
      }

  } catch (err) {
      if (!err?.response) {
          setErrMsg('A szerver nem válaszol!');
      } else if (err.response?.status === 409) {
          setErrMsg('Regisztrált email cím');
      } else {
          setErrMsg('Sikertelen regisztráció');
      }
      errRef.current.focus();
  }
}


  return (
    <>
    {success ? (
                <section className='regSuccses'>
                    <h1>Sikeres regisztráció!</h1>
                    <p>
                    <Link href="/pages/Login">Bejelentkezés</Link>
                    </p>
                </section>
            ) : (
    <div className='regBox'>
    <section>
      <p 
      ref={errRef} className={errMsg? "errmsg" : "offscreen"}
      aria-live="assertive">{errMsg}</p>
      <h1>Regisztáció</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email cím: 
            <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck}  />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"} >
            <FontAwesomeIcon icon={faTimes} />
            </span>
            
          </label>
          <input 
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false": "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon  icon={faInfoCircle}  />
                Elküldés előtt add meg az összes adatot! <br/>
                Az e-mail cím formátuma nem megfelelő! <br/>
            </p>
            <label htmlFor="vname">
            Vezetéknév
            
            </label>
          <input 
            type="text"
            id="vname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setVname(e.target.value)}
            required
            aria-invalid={validEmail ? "false": "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon  icon={faInfoCircle}  />
                Elküldés előtt add meg az összes adatot! <br/>
                Az e-mail cím formátuma nem megfelelő! <br/>
            </p>
            <label htmlFor="kname">
            Keresztnév
            </label>
            <input 
            type="text"
            id="kname"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setKname(e.target.value)}
            required
            aria-invalid={validEmail ? "false": "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon  icon={faInfoCircle}  />
                Elküldés előtt add meg az összes adatot! <br/>
                Az e-mail cím formátuma nem megfelelő! <br/>
            </p>
            <label htmlFor="password">
            Jelszó: 
            <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck}  />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"} >
            <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input 
            type="password"
            id="password"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false": "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon  icon={faInfoCircle}  />
                8-24 karakter<br/>
                Tartalmaznia kell kis és nagybetűt, számot, speciális karaktert. <br/>
                Engedélyezett speciális karakterek: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>
          <label htmlFor="confirm_pwd">
            Jelszó megerősítés: 
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck}  />
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"} >
            <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input 
            type="password"
            id="confirm_pwd"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false": "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p id="confirmnote" className={matchFocus && !validMatch? "instructions" : "offscreen"}>
                <FontAwesomeIcon  icon={faInfoCircle}  />
                A megadott jelszavak nem egyeznek!
          </p>

          <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Regisztráció</button>
      </form>
            <p>
                        Van már regisztrációd?<br />
                        <span className="line">
                        <Link href="/pages/Login">Bejelentkezés</Link>
                            
                        </span>
            </p>

    </section>
    </div>
  )}
  </>
  )
}

export default Register;
