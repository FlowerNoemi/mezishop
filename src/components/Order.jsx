import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { MyButtonsmall } from "../components/button/Buttoncomponents";
import { getOrder } from "../api/getorder";
import { active, getOrderData } from "../api/activorder";
import axios from "../api/axios";
import "./admin.css";
import ListItem from "@mui/material/ListItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "./order.css";

const orderStatus_URL = "/mezi_be/order/shipfinish.php";

const Order = () => {
  const [order, setOrder] = useState([""]);
  const [activeOrder, setActiveOrder] = useState([""]);
  const [datas, setData] = useState([""]);
  const [errMsg, setErrMsg] = useState("");
  const [shipid, setId] = useState("");
  const errRef = useRef();
  const [open, setOpen] = useState(false);
  const [shipDataCheck, setShipChecked] = useState(false);

  const handleChangeShip = async (e) => {
    e.preventDefault();
    setShipChecked(e.target.checked);
    try {
      const orderRequest = await getOrderData(shipid);
      setData(orderRequest);
    } catch (e) {
      console.log("error message : ", e);
    }
  };

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      background: "#E8C07A",
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      border: 1,
    },
  }));

  const allActiveOrder = async () => {
    try {
      const orderRequest = await getOrder();
      setOrder(orderRequest);
    } catch (e) {
      console.log("error message : ", e);
    }
  };

  useEffect(() => {
    allActiveOrder();
  }, []);

  const finish = async (id) => {
    try {
      const response = await axios.post(
        orderStatus_URL,
        {
          orderid: id,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response?.data.code === "1") {
        allActiveOrder();
      } else {
        setErrMsg(response?.data);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("A szerver nem válaszol!");
      } else {
        setErrMsg("Sikertelen módosítás");
      }
    }
    errRef.current.focus();
  };

  const handleToggle = async (id) => {
    setOpen(true);

    try {
      const orderRequest = await active(id);
      setActiveOrder(orderRequest);
    } catch (e) {
      console.log("error message : ", e);
    }
    setId(id);
  };

  const back = async () => {
    setOpen(false);
    setShipChecked(false);
  };

  return (
    <>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      {!open ? (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600, mb: 10 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Rendelés azonosító</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">
                    Rendelés státusz
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Rendelés részletei
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Rendelés lezárás
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.map((order, id) => (
                  <StyledTableRow key={id}>
                    <StyledTableCell component="th" scope="row">
                      {order.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.status}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      <ListItem
                        key={id}
                        secondaryAction={
                          <AssignmentIcon
                            onClick={() => handleToggle(order.id)}
                            sx={{ color: "#E18D00" }}
                          />
                        }
                        disablePadding
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <MyButtonsmall
                        onClick={() => finish(order.id)}
                        value="Lezárás"
                      ></MyButtonsmall>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={2} direction="row" marginBottom="50px">
            <MyButtonsmall
              onClick={() => allActiveOrder()}
              value="Frissítés"
            ></MyButtonsmall>
          </Stack>
        </div>
      ) : (
        <div className="orderitems">
          <h1>Rendelés részletek</h1>
          <MyButtonsmall onClick={() => back()} value="Vissza"></MyButtonsmall>
          <div>
            <TableContainer
              component={Paper}
              sx={{
                "& 	.MuiTableCell-root": {
                  fontFamily: "Arima Madurai, sans-serif",
                },
              }}
            >
              <Table
                sx={{ minWidth: 700, my: 1 }}
                aria-label="customized table"
              >
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left">Termék</StyledTableCell>
                    <StyledTableCell align="left">Megnevezés</StyledTableCell>
                    <StyledTableCell align="left">Mennyiség</StyledTableCell>
                    <StyledTableCell align="left">Ár</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {activeOrder.map((row, id) => (
                    <StyledTableRow key={id}>
                      <StyledTableCell component="th" scope="row" align="left">
                        <img
                          src={row.img}
                          alt={`${row.termeknev}`}
                          className="checkoutImgProd"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {row.termeknev}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.db}</StyledTableCell>
                      <StyledTableCell align="left">{row.ar}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={shipDataCheck}
                  onChange={(e) => handleChangeShip(e)}
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
                  Egyéb adatok
                </Typography>
              }
            />
          </div>
          <div>
            <>
              {shipDataCheck && (
                <div>
                  {datas.map((data, id) => (
                    <div key={id}>
                      <div className="flex-item-left-Orderdatacard">
                        <h1>Egyéb adatok:</h1>
                        <p>Rendelés azonosító: {data.orderid}</p>
                        <p className="OrderDataP">
                          Számlázási adatok: {data.adozo}
                        </p>
                        <p className="OrderDataP2">
                          Adószám:{" "}
                          {data.adozo === "Jogi személy" ? data.adoszam : "-"}
                        </p>
                        <p className="OrderDataP2">
                          EU adószám:{" "}
                          {data.adozo === "Jogi személy" ? data.EUadoszam : "-"}
                        </p>
                        <p className="OrderDataP">Fizetési mód: {data.pay}</p>
                        <p className="OrderDataP">
                          Megjegyzés:
                          {data.comment === "" ? "-" : data.comment}
                        </p>
                        <p className="OrderDataP">
                          {" "}
                          Szállítási mód: {data.shipping}
                        </p>
                        <p className="OrderDataP">
                          {" "}
                          Összesen fizetendő: {data.total}
                        </p>
                        <TableContainer component={Paper}>
                          <h3>Szállítási cím:</h3>
                          <Table
                            aria-label="simple table"
                            sx={{
                              "& 	.MuiTableCell-root": {
                                fontFamily: "Arima Madurai, sans-serif",
                              },
                            }}
                          >
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell align="left">
                                  Vezetéknév
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Keresztnév
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Irányítószám
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Város
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Cím
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Telefonszám
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody>
                              {datas.map((row, id) => (
                                <StyledTableRow key={row.id}>
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="left"
                                  >
                                    {row.kname}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {" "}
                                    {row.vname}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.iranyitoszam}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.varos}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.cim}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.telefonszam}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TableContainer
                          component={Paper}
                          sx={{
                            "& 	.MuiTableCell-root": {
                              fontFamily: "Arima Madurai, sans-serif",
                            },
                          }}
                        >
                          <h3>Számlázási cím:</h3>
                          <Table
                            sx={{ minWidth: 700, mb: 2 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell align="left">
                                  Vezetéknév
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Keresztnév
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Irányítószám
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Város
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Cím
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Telefonszám
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody>
                              {datas.map((row, id) => (
                                <StyledTableRow key={id}>
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="left"
                                  >
                                    {row.kname2}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {" "}
                                    {row.vname2}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.iranyitoszam2}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.varos2}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.cim}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    {row.telefonszam2}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
