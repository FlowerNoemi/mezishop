import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./producttable.css";

import { CartContext } from "../../context/CartContext";

export default function BasicTable() {
  const { cartItems } = useContext(CartContext);
  return (
    <TableContainer
      component={Paper}
      sx={{
        "& 	.MuiTableCell-root": {
          fontFamily: "Arima Madurai, sans-serif",
        },
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Termék</TableCell>
            <TableCell align="left">Megnevezés</TableCell>
            <TableCell align="left">Mennyiség</TableCell>
            <TableCell align="left">Ár</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="left">
                <img
                  src={row.img}
                  alt={`${row.termeknev}`}
                  className="checkoutImgProd"
                />
              </TableCell>
              <TableCell align="left"> {row.termeknev}</TableCell>
              <TableCell align="left">{row.db}</TableCell>
              <TableCell align="left">{row.ar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
