/* eslint-disable react/prop-types */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';


export default function DynamicTable({children}) {


  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: 'fixed', width:'100%' }} size="small" aria-label="a dense table">
          {children}
      </Table>
    </TableContainer>
  );
}