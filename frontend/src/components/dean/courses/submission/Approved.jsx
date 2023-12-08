import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DynamicTable from '../../../reusable/DynamicTable'

export default function Approved() {
  return (
    <DynamicTable>
      <TableHead>
        <TableRow className="bg-slate-300">
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold !text-left !pl-4" >For Course</TableCell>
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Submission Title</TableCell>
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Group name</TableCell>
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">By Faculty</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      </TableBody>
    </DynamicTable>
  )
}
