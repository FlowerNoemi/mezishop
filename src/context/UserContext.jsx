import { createContext, useState } from 'react';



export const UserContext = createContext({
   
});

export  const UserProvider = ({ children }) => {

    const [vname, setVname] = useState('');
    const [vname2, setVname2] = useState('');

    const [kname, setKname] = useState('');
    const [kname2, setKname2] = useState('');

    const [iranyito, setiranyito] = useState('');
    const [iranyito2, setiranyito2] = useState('');

    const [varos, setVaros] = useState('');
    const [varos2, setVaros2] = useState('');

    const [cim, setCim] = useState('');
    const [cim2, setCim2] = useState('');

    const [telefon, setTelefon] = useState('');
    const [telefon2, setTelefon2] = useState('');

    const [comment, setComment] = useState('');
    const [comment2, setComment2] = useState('');

    const [adoszam, setAdoszam] = useState('');
    const [EUadoszam, setEUAdoszam] = useState('');

    const [adozo, setAdozo] = useState('Magánszemély');
    const [szallitas, setSzallitas] = useState(true);
    const [fizetes, setFizetes] = useState('utanvétel');

    const value = {
        vname, 
        setVname,
        vname2,
        setVname2,  
        kname, 
        setKname, 
        kname2,
        setKname2,
        iranyito,
        setiranyito,
        iranyito2,
        setiranyito2,
        varos,
        setVaros,
        varos2,
        setVaros2,
        cim,
        setCim,
        cim2,
        setCim2,
        telefon,
        setTelefon,
        telefon2,
        setTelefon2,
        comment,
        setComment,
        comment2,
        setComment2,
        adoszam,
        setAdoszam,
        EUadoszam,
        setEUAdoszam,
        adozo,
        setAdozo,
        szallitas,
        setSzallitas,
        fizetes,
        setFizetes
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
