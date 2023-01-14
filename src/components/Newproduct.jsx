import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./newproduct.css";
import axios from "../api/axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MyinputField } from "./input/Myinput";
import { MyButtonsmall } from "./button/Buttoncomponents";
import { MyButtonmedium } from "../components/button/Buttoncomponents";
const PRODUCT_URL = "/mezi_be/product/newproduct.php";

const NewProduct = () => {
  const navigate = useNavigate();

  const errRef = useRef();
  const [termeknev, setTermeknev] = useState("");
  const [mennyiseg, setMennyiseg] = useState("");
  const [ar, setAr] = useState("");
  const [currency, setCurrency] = useState("active");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChangeList = (event) => {
    setCurrency(event.target.value);
  };

  const currencies = [
    {
      value: "active",
      label: "aktív",
    },
    {
      value: "noactive",
      label: "nem aktív",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        PRODUCT_URL,
        {
          termeknev: termeknev,
          mennyiseg: mennyiseg,
          ar: ar,
          status: currency,
          img: selectedFile,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response?.data.code);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

      if (response?.data.code === "1") {
        setSuccess(true);
        setTermeknev("");
        setMennyiseg("");
        setAr("");
        setCurrency("");
        setSelectedFile("");
      } else {
        setSuccess(false);
        setErrMsg(response.data.message);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("A szerver nem válaszol!");
      } else {
        setErrMsg("Sikertelen módosítás");
      }
      errRef.current.focus();
    }
  };

  const editor = () => {
    navigate("/editor");
  };
  return (
    <div className="backgroundNew">
      {success ? (
        <section className="NewProductSuccses">
          <h1>Termék hozzáadva!</h1>
          <MyButtonmedium onClick={editor} value="Szerkesztő "></MyButtonmedium>
        </section>
      ) : (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="newBoxClass"
        >
          <h1>Új termék</h1>
          <div>
            <p
              ref={errRef}
              className={errMsg ? "errmsgNewProduct" : "offscreenNewProduct"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </div>
          <div>
            <MyinputField
              onChange={(e) => setTermeknev(e.target.value)}
              label="Terméknév"
              value={termeknev}
              type="text"
            />
          </div>
          <div>
            <MyinputField
              label="Mennyiség"
              onChange={(e) => setMennyiseg(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <MyinputField
              onChange={(e) => setAr(e.target.value)}
              label="Ár"
              type="text"
            />
          </div>
          <div>
            <TextField
              sx={{
                "& label.Mui-focused": {
                  color: "black",
                  fontFamily: "Arima Madurai, sans-serif",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#D69967",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#D69967",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D69967",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#D69967",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#e44444",
                  },
                },
                m: 1,
              }}
              id="standard-helperText"
              select
              value={currency}
              onChange={handleChangeList}
              SelectProps={{
                native: true,
                style: { fontFamily: "Arima Madurai, sans-serif" },
              }}
              helperText="Állítsa be a termékstátuszt"
              FormHelperTextProps={{
                style: { fontFamily: "Arima Madurai, sans-serif" },
              }}
              variant="standard"
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
          <div>
            <input
              className="inputFile"
              type="file"
              onChange={handleFileSelect}
              placeholder="Kép hozzáadása"
            />
          </div>
          <div>
            <MyButtonsmall className="regBtn" value="Küldés"></MyButtonsmall>
          </div>
        </Box>
      )}
    </div>
  );
};

export default NewProduct;
