import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import React from 'react';
import './home.css'
import useAuth from "../hooks/useAuth";
import Background from '../assets/bg.webp';
import {MyButtonlarge, MyButtonmedium}  from '../components/button/Buttoncomponents';


const Home = () => {
    const mystyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize:'cover',
        backgroundRepeat: "no-repeat",
        height:'88vh',
        loading:'lazy',
        backgroundPosition: '10% 110%',
        
      }
    const { auth } = useAuth();
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {

        setAuth({});
        navigate('/home');
    }

    const shop = () => {
        navigate('/termekek');
    }

    const level = auth?.roles?.find(role => role.includes('2001'))

    return (

        <>
           <div className='homeBody' style={mystyle}>
            { level  ? (
            
            <section className="homeSection" >
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
                <MyButtonmedium onClick={logout} value="Kijelentkezés"></MyButtonmedium>
            </div>

            </section>
            ): (

            <section className="landingBox" >
            <div className="hom1"> 
            <h1 className="homeh1">Üdvözöljük honlapunkon!</h1>
            <div className="homeBtnBox">
            <MyButtonlarge onClick={shop} value="Irány a shop"></MyButtonlarge>
            </div>
            </div>
            
            </section>
            )}
            </div>
</>
       
    )
}

export default Home;