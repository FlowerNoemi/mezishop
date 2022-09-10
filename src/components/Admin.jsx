import React, { useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {getAllUsers} from '../api/getallaxios';


const Admin = () => {
  const [users, setUsers] = useState(['']);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  
  const allUser = async () => {
    try {
      const userRequest = await  getAllUsers();
      console.log(userRequest)
      setUsers(userRequest);
      
      } catch(e) {
      console.log('error message : ', e);
      }
  };

  useEffect(() => {
    
    allUser();    
} , [] 
);



  return (
    <>
      <Stack spacing={2} direction="row">
  
        <Button variant="contained" onClick={() => allUser()}>Contained</Button>
      
      </Stack>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell align="right">Vezetéknév</StyledTableCell>
            <StyledTableCell align="right">Keresztnév</StyledTableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((user) => (
            <StyledTableRow key={user.email}>
              <StyledTableCell component="th" scope="row">
                {user.email}
              </StyledTableCell>
              <StyledTableCell align="right">{user.kname}</StyledTableCell>
              <StyledTableCell align="right">{user.vname}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}


export default Admin;