import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../context/UserContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import { MyinputField } from "../components/input/Myinput";
import { MyLittleButton } from "../components/button/Buttoncomponents";
import Datacard from "../components/datacard/Datacard";
import "./profile.css";
import Typography from "@mui/material/Typography";
import axios from "../api/axios";

const MyUpdate_URL = "/mezi_be/auth/shipCheckData.php";

const Profile = () => {
  const { auth } = useAuth();
  const { userData, setUserData2, userDataReq } = useContext(UserContext);

  const [email] = useState(auth.email);

  const [vname, setVname] = useState("");
  const [vname2, setVname2] = useState("");
  const [kname, setKname] = useState("");
  const [kname2, setKname2] = useState("");

  const [iranyito, setiranyito] = useState("");
  const [iranyito2, setiranyito2] = useState("");

  const [varos, setVaros] = useState("");
  const [varos2, setVaros2] = useState("");

  const [cim, setCim] = useState("");
  const [cim2, setCim2] = useState("");

  const [telefon, setTelefon] = useState("");
  const [telefon2, setTelefon2] = useState("");

  const [shipDataCheck, setShipChecked] = useState(false);

  const handleChangeShip = (event) => {
    setShipChecked(event.target.checked);
  };

  useEffect(() => {
    userDataReq(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    setUserData2({
      adozo: "Magánszemély",
      szallitas:
        "HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)",
      fizetes: "Utanvétel",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const Back = () => {
    setShipChecked(false);
  };

  const Finish = async () => {
    try {
      const response = await axios.post(
        MyUpdate_URL,
        {
          vname: vname,
          email: email,
          id: userData.id,
          shipid: userData.shipid,
          checkid: userData.checkid,
          kname: kname,
          iranyito: iranyito,
          cim: cim,
          varos: varos,
          telefon: telefon,
          vname2: vname2,
          kname2: kname2,
          iranyito2: iranyito2,
          cim2: cim2,
          varos2: varos2,
          telefon2: telefon2,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response?.data.code === "1") {
        console.log("Sikeres mentés");
      } else {
        console.log("Sikertelen mentés");
      }
    } catch (err) {
      if (!err?.response) {
        console.log("A szerver nem válaszol!");
      } else {
        console.log("Sikertelen üzenetküldés");
      }
    }
    userDataReq(email);
    setShipChecked(false);
  };

  useEffect(() => {
    if (userData.vname) {
      setVname(userData.vname);
    }
    if (userData.vname2) {
      setVname2(userData.vname2);
    }
    if (userData.kname) {
      setKname(userData.kname);
    }
    if (userData.kname2) {
      setKname2(userData.kname2);
    }
    if (userData.iranyito) {
      setiranyito(userData.iranyito);
    }
    if (userData.iranyito2) {
      setiranyito2(userData.iranyito2);
    }
    if (userData.cim) {
      setCim(userData.cim);
    }
    if (userData.cim2) {
      setCim2(userData.cim2);
    }
    if (userData.varos) {
      setVaros(userData.varos);
    }
    if (userData.varos2) {
      setVaros2(userData.varos2);
    }
    if (userData.telefon) {
      setTelefon(userData.telefon);
    }
    if (userData.telefon2) {
      setTelefon2(userData.telefon2);
    }
  }, [
    userData.vname,
    userData.vname2,
    userData.kname,
    userData.iranyito,
    userData.iranyito2,
    userData.cim,
    userData.cim2,
    userData.kname2,
    userData.varos,
    userData.varos2,
    userData.telefon,
    userData.telefon2,
  ]);

  return (
    <div>
      <>
        <CssBaseline />
        <Container maxWidth="xl" className=" backgroundProfile">
          <Box autoComplete="off" className="logProfile">
            <div className="ProfileBox">
              <Datacard></Datacard>
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={shipDataCheck}
                  onChange={handleChangeShip}
                  sx={{
                    color: "#E18D00",
                    "&.Mui-checked": {
                      color: "#E18D00",
                    },
                    p: 2,
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "Arima Madurai, sans-serif",
                  }}
                >
                  Adatok módosítása/megadása
                </Typography>
              }
            />
            <>
              {shipDataCheck && (
                <div>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2}
                    columns={{ xs: 1, sm: 6, md: 12 }}
                    sx={{
                      fontWeight: 600,
                      letterSpacing: ".1rem",
                      textDecoration: "none",
                      color: "#7F4E18",
                      m: 1,
                    }}
                  >
                    <Grid item xs={6}>
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        sx={{
                          color: "black",
                          fontFamily: "Arima Madurai, sans-serif",
                          "&.Mui-focused": {
                            color: "black",
                          },
                        }}
                      >
                        Szállítási adatok
                      </FormLabel>
                      <div>
                        <MyinputField
                          label="Vezetéknév"
                          value={vname}
                          onChange={(e) => setVname(e.target.value)}
                        />
                        <MyinputField
                          label="Keresztnév"
                          value={kname}
                          onChange={(e) => setKname(e.target.value)}
                        />
                      </div>
                      <div>
                        <MyinputField
                          label="Irányítószám"
                          value={iranyito}
                          onChange={(e) => setiranyito(e.target.value)}
                        />
                        <MyinputField
                          label="Város"
                          value={varos}
                          onChange={(e) => setVaros(e.target.value)}
                        />
                      </div>
                      <div>
                        <MyinputField
                          label="Cím"
                          value={cim}
                          onChange={(e) => setCim(e.target.value)}
                        />
                        <MyinputField
                          label="Telefonszám"
                          value={telefon}
                          onChange={(e) => setTelefon(e.target.value)}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <FormLabel
                          id="demo-radio-buttons-group-label"
                          sx={{
                            color: "black",
                            fontFamily: "Arima Madurai, sans-serif",
                            "&.Mui-focused": {
                              color: "black",
                            },
                          }}
                        >
                          Számlázási adatok
                        </FormLabel>
                      </div>
                      <div>
                        <div>
                          <MyinputField
                            label="Vezetéknév"
                            value={vname2}
                            onChange={(e) => setVname2(e.target.value)}
                          />
                          <MyinputField
                            label="Keresztnév"
                            value={kname2}
                            onChange={(e) => setKname2(e.target.value)}
                          />
                        </div>
                        <div>
                          <MyinputField
                            label="Irányítószám"
                            value={iranyito2}
                            onChange={(e) => setiranyito2(e.target.value)}
                          />
                          <MyinputField
                            label="Város"
                            value={varos2}
                            onChange={(e) => setVaros2(e.target.value)}
                          />
                        </div>
                        <div>
                          <MyinputField
                            label="Cím"
                            value={cim2}
                            onChange={(e) => setCim2(e.target.value)}
                          />
                          <MyinputField
                            label="Telefonszám"
                            value={telefon2}
                            onChange={(e) => setTelefon2(e.target.value)}
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <MyLittleButton onClick={Back} value="Mégse">
                    {" "}
                  </MyLittleButton>
                  <MyLittleButton onClick={Finish} value="Mentés">
                    {" "}
                  </MyLittleButton>
                </div>
              )}
            </>
          </Box>
        </Container>
      </>
    </div>
  );
};

export default Profile;
