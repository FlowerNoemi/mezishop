import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import React from 'react';
import './home.css'
import useAuth from '../hooks/useAuth';
import Background from '../assets/bg.webp';
import {MyButtonlarge, MyButtonmedium}  from '../components/button/Buttoncomponents';



const Home = () => {
    const mystyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height:'84vh',
        loading:'lazy',
        backgroundPosition: '10% 110%',
        backgroundAttachment: 'fixed',
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

    const editor = () => {
        navigate('/editor');
    }

    const users = () => {
        navigate('/admin');
    }

    const message = () => {
        navigate('/message');
    }





    const level = auth?.roles?.find(role => role.includes('2001'))

    return (

        <>
           <div className='homeBody' style={mystyle}>
            { level  ? (
            
                <section className='homeSection' >
                    <div className='homeBox'>
                        <MyButtonmedium  onClick={editor} value='Szerkesztő'></MyButtonmedium>
                    </div>
                    <div className='homeBox'>
                        <MyButtonmedium onClick={users} value='Felhasználók'></MyButtonmedium>
                    </div>
                    <div className='homeBox'>
                        <MyButtonmedium onClick={message} value='Üzenetek'></MyButtonmedium>
                    </div>
                    <div className='adminBtn'>
                        <MyButtonmedium onClick={logout} value='Kijelentkezés'></MyButtonmedium>
                    </div>
                </section>
            ): (
                <section className='landingBox' >
                    <div className='hom1'> 
                        <h1 className='homeh1'>Üdvözöljük honlapunkon!</h1>
                        <div className='homeBtnBox'>
                        <MyButtonlarge onClick={shop} value='Irány a shop'></MyButtonlarge>
                        </div>
                    </div>
                </section>)}
            </div>
        </>  
    )
}

export default Home;