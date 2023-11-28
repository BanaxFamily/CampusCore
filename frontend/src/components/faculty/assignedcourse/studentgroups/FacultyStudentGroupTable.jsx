/* eslint-disable react/prop-types */

import { Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import DynamicTable from "../../../reusable/DynamicTable"

export default function FacultyStudentGroupTable() {

    return (
        <Stack className="mx-auto rounded-t-md group">
            <DynamicTable>
                <TableHead>
                    <TableRow className="bg-slate-300">
                        <TableCell className="border !text-black !font-bold"> Group name </TableCell>
                        <TableCell className="border !text-black !font-bold"> Leader </TableCell>
                        <TableCell className="border !text-black !font-bold"> Status </TableCell>
                        <TableCell className="border !text-black !font-bold" align="center" colSpan={2}> Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    </TableRow>
                </TableBody>

            </DynamicTable>
        </Stack>
    )
}
