import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import DynamicTable from '../../../reusable/DynamicTable'

export default function Approved() {
  return (
    <>
      <DynamicTable>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell >Student Group Name</TableCell>
            <TableCell >Author(s)</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableCell>Dummy</TableCell>
            <TableCell>Dummy</TableCell>
            <TableCell>Dummy</TableCell>
            <TableCell align='center'>
              <Link to={`view/file/${'123'}`} className='text-blue-400 hover:text-blue-600'>
                View
              </Link>
            </TableCell>
        </TableBody>
      </DynamicTable>
    </>
  )
}
