import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../context/UserContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./basket.css";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { MyinputField } from "./input/Myinput";
import { MyinputFieldArea } from "./input/Myinput";
import { MyLittleButton } from "./button/Buttoncomponents";
import axios from "../api/axios";
import Typography from "@mui/material/Typography";

const MyUpdate_URL = "/mezi_be/auth/shipCheckData.php";

const steps = ["Kosár", "Szállítás, Fizetés, Számlázás", "Összesítő"];

const Basket = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { userData, userDataReq, userData2, setUserData2 } =
    useContext(UserContext);

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

  const [comment, setComment] = useState("");

  const [adoszam, setAdoszam] = useState("");
  const [EUadoszam, setEUAdoszam] = useState("");

  const [adozo, setAdozo] = useState("");
  const [szallitas, setSzallitas] = useState("");
  const [fizetes, setFizetes] = useState("");

  useEffect(
    () => {
      userDataReq(email);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email]
  );

  const Back = () => {
    navigate("/checkout");
  };

  const Finish = async () => {
    setUserData2({
      id: "",
      comment: comment,
      adoszam: adoszam,
      EUadoszam: EUadoszam,
      adozo: adozo,
      szallitas: szallitas,
      fizetes: fizetes,
    });
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
    navigate("/finish");
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
    if (userData2.szallitas) {
      setSzallitas(userData2.szallitas);
    }
    if (userData2.fizetes) {
      setFizetes(userData2.fizetes);
    }
    if (userData2.adozo) {
      setAdozo(userData2.adozo);
    }
    if (userData2.adoszam) {
      setAdoszam(userData2.adoszam);
    }
    if (userData2.EUadoszam) {
      setEUAdoszam(userData2.EUadoszam);
    }
    if (userData2.comment) {
      setComment(userData2.comment);
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
    userData.comment,
    userData.varos,
    userData.varos2,
    userData.telefon,
    userData.telefon2,
    userData2.szallitas,
    userData2.fizetes,
    userData2.adozo,
    userData2.adoszam,
    userData2.EUadoszam,
    userData2.comment,
  ]);

  const handleChange = (event) => {
    setSzallitas(event.target.value);
  };

  const handleChangeFizetes = (event) => {
    setFizetes(event.target.value);
  };

  const handleChangeAdozo = (event) => {
    setAdozo(event.target.value);
  };

  return (
    <div className="backgroundBasket">
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={2}
          alternativeLabel
          sx={{
            "& 	.MuiStepIcon-root.Mui-completed": {
              color: "#E18D00",
            },
            "& 	.MuiStepIcon-root": {
              color: "#E18D00",
            },
            "& 	.MuiStepIcon-root.Mui-active": {
              color: "#E18D00",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label} </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <>
        <CssBaseline />
        <Container maxWidth="xl" className="logBasket">
          <Box className="basketBox" autoComplete="off">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={1}
              columns={{ xs: 2, md: 12 }}
            >
              <Grid item xs={6}>
                <FormControl>
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
                    Szállítási mód
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={szallitas}
                    name="radio-buttons-group"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#E18D00",
                            "&.Mui-checked": {
                              color: "#E18D00",
                            },
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
                          HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT
                          utánvét, +1200 FT előre utalás esetén)
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="Személyes átvétel"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#E18D00",
                            "&.Mui-checked": {
                              color: "#E18D00",
                            },
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
                          Személyes átvétel
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
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
                    Fizetési mód
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={fizetes}
                    name="radio-buttons-group"
                    onChange={handleChangeFizetes}
                  >
                    <FormControlLabel
                      value="Utanvétel"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#E18D00",
                            "&.Mui-checked": {
                              color: "#E18D00",
                            },
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
                          UTÁNVÉTEL
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="utalás"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#E18D00",
                            "&.Mui-checked": {
                              color: "#E18D00",
                            },
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
                          Előre utalás
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={1}
              columns={{ xs: 2, sm: 8, md: 12 }}
            >
              <Grid item xs={6}>
                <div>
                  {szallitas !== "Személyes átvétel" && (
                    <div>
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        sx={{
                          "&.Mui-focused": {
                            color: "rgba(0, 0, 0, 0.6)",
                          },
                          color: "black",
                          fontFamily: "Arima Madurai, sans-serif",
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
                    </div>
                  )}
                </div>
                <div>
                  <MyinputFieldArea
                    label="Megjegyzés"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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
                    }}
                  >
                    Számlázási adatok
                  </FormLabel>
                </div>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={adozo}
                    name="radio-buttons-group"
                    onChange={handleChangeAdozo}
                  >
                    <FormControlLabel
                      value="Magánszemély"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#E18D00",
                            "&.Mui-checked": {
                              color: "#E18D00",
                            },
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
                          Magánszemély
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="Jogi személy"
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#E18D00",
                            "&.Mui-checked": {
                              color: "#E18D00",
                            },
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
                          Jogi személy
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>

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

                <div>
                  {adozo === "Jogi személy" && (
                    <div>
                      <MyinputField
                        label="Adószám"
                        value={adoszam}
                        onChange={(e) => setAdoszam(e.target.value)}
                      />
                      <MyinputField
                        label="EU adószám"
                        value={EUadoszam}
                        onChange={(e) => setEUAdoszam(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
            <MyLittleButton onClick={Back} value="Vissza">
              {" "}
            </MyLittleButton>
            <MyLittleButton onClick={Finish} value="Tovább">
              {" "}
            </MyLittleButton>
          </Box>
        </Container>
      </>
    </div>
  );
};

export default Basket;
