import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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


const TableData = ({ userData, updataData, deleteData}) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>USER ID</StyledTableCell>
            <StyledTableCell align="right">NAME</StyledTableCell>
            <StyledTableCell align="right">EMAIL</StyledTableCell>
            <StyledTableCell align="right">PHONENUMBER</StyledTableCell>
            <StyledTableCell align="right">ACTIONS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((data) => (
            <StyledTableRow key={data.id}>
              <StyledTableCell component="th" scope="row">{data.id}</StyledTableCell>
              <StyledTableCell align='right'>{data.first_name} {data.last_name }</StyledTableCell>
              <StyledTableCell align="right">{data.email}</StyledTableCell>
              <StyledTableCell align="right">{data.phone_no}</StyledTableCell>
              <StyledTableCell align="right">
                <button onClick={(e)=>updataData(data)}>edit</button>
                <button onClick={() => deleteData(data.id)} >delete</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableData;