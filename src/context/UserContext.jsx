import { createContext, useState} from 'react';
import useAuth from '../hooks/useAuth';
export const UserContext = createContext({
    userData: [''],
});



export  const UserProvider = ({ children }) => {
    const { auth } = useAuth();
    const [userData, setUserData] = useState(
        {vname:auth.vname,
            email:'',
            vname2:'',
            kname:'',
            kname2:'',
            iranyito:'' ,
            iranyito2:'', 
            varos:'', 
            varos2:'',
            cim:'', 
            cim2:'',
            telefon:'',
            telefon2:'', 
            comment:'', 
            comment2:'', 
            adoszam:'', 
            EUadoszam:'',
            adozo:'', 
            szallitas:'',
            fizetes:''})
const value = {
        userData,
        setUserData
}

return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
