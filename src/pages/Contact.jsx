import { useState, useEffect, useRef} from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@mui/material/Link';
import axios from '../api/axios';
import './contact.css';
import { useNavigate} from "react-router-dom";
import Iframe from 'react-iframe'
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CallIcon from '@mui/icons-material/Call';
import AddLocationIcon from '@mui/icons-material/AddLocation';

const MESSAGE_URL = '/mezi_be/message/newmessage.php';

//eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



function Contact() {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [message, setMessage] = useState('');
    const [validMessage, setValidMessage] = useState(false);
    const [messageFocus, setMessageFocus] = useState(false);

    const MESSAGE_REGEX = (message) => 
    {if(message.length > 1) {
        return true;
    }
    
    };





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
        const result = MESSAGE_REGEX(message);
        console.log(result);
        console.log(message);
        setValidMessage(result);
    }, [message]);

    useEffect(() => {
        setErrMsg('');
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
            const response = await axios.post(MESSAGE_URL,
                { email: email, message: message },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data.code);
            console.log(JSON.stringify(response));
            if (response?.data.code === '1') {
                setSuccess(true);
                setEmail('');
                setMessage('');

            }
            else {
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
    };


    return (
        <>
            {success ? (
                <section className='regSuccses'>
                    <h1>Sikeres üzenetküldés</h1>
                    <p>Hamarosan jelentkezünk!</p>
                    <Link onClick={() => navigate('/termekek')} sx={{ color: 'white', textDecorationColor: 'white', cursor: 'pointer' }}>Irány a shop!</Link>
                </section>
            ) : (
                <div className='regBox'>
                    <section className='regSection'>
                        <p
                            ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                            aria-live="assertive">{errMsg}</p>
                        <h1>Írjon nekünk!</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">
                                Email cím:
                                <span className={validEmail ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validEmail || !email ? "hide" : "invalid"}>
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
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)} />
                            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Elküldés előtt add meg az email címed! <br />
                                Az e-mail cím formátuma nem megfelelő! <br />
                            </p>
                            <label htmlFor="message">
                                Üzenet
                                <span className={validMessage ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMessage || !message ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <textarea
                                type="text"
                                id="message"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                aria-describedby="messagenote"
                                onFocus={() => setMessageFocus(true)}
                                onBlur={() => setMessageFocus(false)} />
                            <p id="message" className={messageFocus && message && !validMessage ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Minimum 2 karakter szükséges! <br />
                            </p>
                            <button disabled={!validEmail || !validMessage ? true : false} className='regBtn'>Küldés</button>
                        </form>
                     
                    
                        <div className='containerContact'>
        <h3 className='title'>Keressen minket!</h3>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 6 }}>
            <List sx={{ width: '100%', maxWidth: 390, paddingY:'50px'}}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <CallIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Hívjon!" secondary="+36307094447" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ContactMailIcon />
                        </Avatar>
                    </ListItemAvatar>
                <ListItemText primary="Küldjön emailt!" secondary="testmail@gmail.com" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AddLocationIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Látogasson meg minket!" secondary="4002, Debrecen Diószegi út 10" />
                    </ListItem>
                </List>
        </Stack>  
                        </div>
                    <div>

                    <Iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3812.686497890489!2d21.7186868652938!3d47.49037160886998!3m2!1i1024!2i768!4f13.1!5e0!3m2!1shu!2shu!4v1663099687388!5m2!1shu!2shu" 
                    
                    width="350px"
                    id="myId"
                    height= "300px"
                    className="myClassname"
                    sx={{}}/>
                    </div>
                    </section>
                </div>
            )}

        </>
    );
}

export default Contact;

