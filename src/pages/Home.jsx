import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import React from 'react';

import useAuth from "../hooks/useAuth";



const Home = () => {
    const { auth } = useAuth();
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {

        setAuth({});
        navigate('/linkpage');
    }

    const level = auth?.roles?.find(role => role.includes('2001'))

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
        
            { level  ? (
            <>
            <Link to="/editor" >Go to the Editor page</Link>
            <Link to="/admin">Go to the Admin page</Link>
            <Link to="/lounge">Go to the Lounge</Link>
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
            </>
            ): (
            <>
            <Link to="/lounge">Go to the Lounge</Link>
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
            </>
            )}

        </section>
    )
}

export default Home;