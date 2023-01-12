import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { myData } from "../api/mydata";

export const UserContext = createContext({
  userData: [""],
});

export const UserProvider = ({ children }) => {
  const { auth } = useAuth();
  const email = auth.email;

  const [userData, setUserData] = useState({
    id: "",
    shipid: "",
    checkid: "",
    vname: "",
    email: "",
    vname2: "",
    kname: "",
    kname2: "",
    iranyito: "",
    iranyito2: "",
    varos: "",
    varos2: "",
    cim: "",
    cim2: "",
    telefon: "",
    telefon2: "",
    orderid: "",
  });

  const [userData2, setUserData2] = useState({
    id: "",
    comment: "",
    adoszam: "",
    EUadoszam: "",
    adozo: "Magánszemély",
    szallitas:
      "HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)",
    fizetes: "Utanvétel",
  });

  const userDataReq = async () => {
    try {
      const dataRequest = await myData(email);
      setUserData(dataRequest);
    } catch (e) {
      console.log("error message : ", e);
    }
  };

  const value = {
    userData,
    setUserData,
    userDataReq,
    userData2,
    setUserData2,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
