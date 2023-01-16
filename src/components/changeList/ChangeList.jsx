import React, { useState, useRef, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "../../api/axios.js";
import TextField from "@mui/material/TextField";
import { MyinputField } from "../input/Myinput";
import Box from "@mui/material/Box";
import { MyButtonsmall } from "../button/Buttoncomponents";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./changelist.css";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AllProductContext } from "../../context/AllProduct";

const Edit_URL = "/mezi_be/product/updateproduct.php";

const ChangeList = ({ allproducts }) => {
  const { id, termeknev, mennyiseg, ar, status, img } = allproducts;
  const { getallProductsset } = useContext(AllProductContext);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const [termeknevmod, setTermeknevmod] = useState(termeknev);
  const [mennyisegmod, setMennyisegmod] = useState(mennyiseg);
  const [armod, setArmod] = useState(ar);
  const [currency, setCurrency] = useState(status);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgMod, setImgMod] = useState(img);
  const [fileSelectedBox, setfileSelectedBox] = useState(true);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const errRef = useRef();

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

  const handleToggle = () => () => {
    setOpen(true);
    setSuccess("");
    setfileSelectedBox(false);
    setErrMsg("");
    getallProductsset(allproducts);
    setImgMod(img);
  };

  const Cancel = () => {
    setOpen(false);
    setErrMsg("");
    setfileSelectedBox(false);
  };

  const chek = () => {
    if (fileSelectedBox) {
      setfileSelectedBox(false);
    } else {
      setfileSelectedBox(true);
    }
  };

  const handleChangeList = (e) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        Edit_URL,
        {
          id: id,
          termeknev: termeknevmod,
          mennyiseg: mennyisegmod,
          ar: armod,
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
        setErrMsg("");
        setSuccess(response?.data.message);
        setOpen(false);
        setfileSelectedBox(false);
        getallProductsset(allproducts);
      } else {
        setOpen(true);
        setErrMsg(response?.data.message);
        setSuccess("");
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

  return (
    <div className="backgroundChange">
      <div>
        <p
          className={
            success ? "successChangeProduct" : "offscreenChangeProduct"
          }
          aria-live="assertive"
        >
          {success}
        </p>
      </div>
      <div>
        <p
          ref={errRef}
          className={errMsg ? "errmsgChangeProduct" : "offscreenChangeProduct"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </div>
      {open ? (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="ChangeBox"
        >
          <h2>Termék módosítás</h2>
          <HighlightOffIcon
            onClick={Cancel}
            sx={{ marginLeft: "250px", color: "#E18D00" }}
          ></HighlightOffIcon>
          <div>
            <MyinputField
              onChange={(e) => setTermeknevmod(e.target.value)}
              label="Terméknév"
              value={termeknevmod}
              type="text"
            />
          </div>
          <div>
            <MyinputField
              label="Mennyiség"
              value={mennyisegmod}
              onChange={(e) => setMennyisegmod(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <MyinputField
              value={armod}
              onChange={(e) => setArmod(e.target.value)}
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
                m: 2,
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
            <img src={imgMod} alt={`${termeknev}`} className="changeImage" />
          </div>
          <div className="CheckBoxChange">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#E18D00",
                    "&.Mui-checked": {
                      color: "#E18D00",
                    },
                  }}
                  onClick={chek}
                />
              }
            />
            <p className="checkBoxParag">Képcsere szükséges?</p>
          </div>
          {fileSelectedBox ? (
            <div>
              <input
                className="inputChangeFile"
                type="file"
                onChange={handleFileSelect}
                placeholder="Kép hozzáadása"
              />
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <MyButtonsmall value="Küldés"></MyButtonsmall>
          </div>
        </Box>
      ) : (
        <div className="listBox">
          <List
            dense
            sx={{
              minWidth: "100%",
              height: 100,
              marginBottom: "50px",
            }}
            className="list"
          >
            <ListItem
              key={id}
              allproducts={allproducts}
              secondaryAction={
                <EditIcon
                  edge="end"
                  onClick={handleToggle(id)}
                  sx={{ color: "#E18D00" }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": {
                      color: "black",
                      fontFamily: "Arima Madurai, sans-serif",
                    },
                  }}
                  id={id}
                  primary={termeknevmod}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      )}
    </div>
  );
};

export default ChangeList;
