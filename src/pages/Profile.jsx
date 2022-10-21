import React from "react-router-dom"
import useAuth from '../hooks/useAuth';

const Contact = () => {
    const { auth } = useAuth();
    return (
        <main className="App">
        Üdvözöljük {auth.vname } {auth.kname}
        </main>
    )
}

export default Contact;