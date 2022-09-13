import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.css';
import axios from '../api/axios';
const LOGIN_URL = '/mezi_be/auth/auth.php';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email:email, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log(roles);

            
            setAuth({ email, pwd, roles, accessToken });
            navigate(from , { replace: true });
            setEmail('');
            setPwd('');
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Szerver nem válaszol!');
            } else if (err.response?.status === 400) {
                setErrMsg('Hibás jelszó vagy email');
            } else if (err.response?.status === 401) {
                setErrMsg('Nincs jogosultság!');
            } else {
                setErrMsg('Sikertelen bejelentkezés!');
            }
            errRef.current.focus();
        }
    }

    return (

        <div className='logDiv'>
                <section className='logBox'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Bejelentkezés</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email cím:</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Jelszó:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='loginBtn'>Bejelentkezés</button>
                    </form>
                    <p>
                        Még nem regisztrált?<br />
                        <span className="line">
                            
                        <Link to="/register">Regisztráció</Link>
                        </span>
                    </p>
                </section>
                </div>   
    )
}

export default Login
