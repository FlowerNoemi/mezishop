import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import useAuth from "../../hooks/useAuth";
import { MyButtonsmall } from "../../components/button/Buttoncomponents";
import { myActualOrderData } from "../../api/getallorder";

const AllorderDatacard = () => {
  const [order, setOrder] = useState([""]);
  const { auth } = useAuth();

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

  const allOrder = async () => {
    try {
      const orderRequest = await myActualOrderData(auth.email);
      setOrder(orderRequest);
    } catch (e) {
      console.log("error message : ", e);
    }
  };

  useEffect(() => {
    allOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.email]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600, my: 5 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Rendelés azonosító</StyledTableCell>
              <StyledTableCell align="center">Rendelés státusz</StyledTableCell>
              <StyledTableCell align="center">Termék kód</StyledTableCell>
              <StyledTableCell align="center">Termék név</StyledTableCell>
              <StyledTableCell align="center">db</StyledTableCell>
              <StyledTableCell align="center">Ár</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((order, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {order.orderid}
                </StyledTableCell>
                <StyledTableCell align="center">{order.status}</StyledTableCell>
                <StyledTableCell align="center">{order.id}</StyledTableCell>
                <StyledTableCell align="center">
                  {order.termeknev}
                </StyledTableCell>
                <StyledTableCell align="center">{order.db}</StyledTableCell>
                <StyledTableCell align="center">{order.ar}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} direction="row" marginBottom="50px">
        <MyButtonsmall
          onClick={() => allOrder()}
          value="Frissítés"
        ></MyButtonsmall>
      </Stack>
    </div>
  );
};

export default AllorderDatacard;
