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
import {MyButtonsmall}  from '../components/button/Buttoncomponents';
import {getAllUsers} from '../api/getallaxios';
import './admin.css';

const Admin = () => {
    const [users, setUsers] = useState(['']);


const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        background: '#E8C07A',
        color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
},
    
    '&:last-child td, &:last-child th': {
    border: 1,
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
} , []);

return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 , marginTop:5 }} aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>id</StyledTableCell>
                            <StyledTableCell align='center'>Email</StyledTableCell>
                            <StyledTableCell align='center'>Vezetéknév</StyledTableCell>
                            <StyledTableCell align='center'>Keresztnév</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, id) => (
                            <StyledTableRow key={id}>
                            <StyledTableCell component='th' scope='row' >{user.id}</StyledTableCell>
                            <StyledTableCell align='center' >{user.email}</StyledTableCell>
                            <StyledTableCell align='center'>{user.vname}</StyledTableCell>
                            <StyledTableCell align='center'>{user.kname}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2} direction='row' marginBottom='50px'>
                <MyButtonsmall  onClick={() => allUser()} value='Frissítés'></MyButtonsmall>
            </Stack>
        </>
    )
}

export default Admin;