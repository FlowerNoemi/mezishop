import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";



function Home() {
    const { auth } = useAuth();
    const location = useLocation();
    
    function handleClick(e) {
    
     <Navigate to="/components/admin" state={{ from: location }} />;
    }

    
  return (
    auth.roles === '2001' ? (

      <div className="App">
      <div className="App">
      <Link href="./components/Admin">Visit Our Homepage</Link>
      </div>
    </div>

     ) : (

      <div className="App">
        <div className="App">
        Kiskugya
        </div>
      </div>

     )

    );  
} 

export default Home;