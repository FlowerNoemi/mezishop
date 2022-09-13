import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import React from 'react';
import './home.css'
import useAuth from "../hooks/useAuth";



const Home = () => {
    const { auth } = useAuth();
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {

        setAuth({});
        navigate('/home');
    }

    const shop = async () => {

        setAuth({});
        navigate('/termekek');
    }

    const level = auth?.roles?.find(role => role.includes('2001'))

    return (

        <>
           
            { level  ? (
            <section className="homeSection">
            <div className="homeBox">
                <Link to="/editor" >Szerkesztő</Link>
            </div>
            <div className="homeBox">
                <Link to="/admin">Admin felület</Link>
            </div>
            <div className="homeBox">
                <Link to="/message">Üzenetek</Link>
            </div>
            <div className="adminBtn">
                <button onClick={logout}>Kijelentkezés</button>
            </div>

            </section>
            ): (
                <section className="landingBox">
            <h1 className="homeh1">Üdvözöljük honlapunkon!</h1>
            
            <div >
                <button onClick={shop}  className="homeBtn">Irány a shop!</button>
            </div>
            </section>
            )}
</>
       
    )
}

export default Home;