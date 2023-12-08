import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DynamicTable from "../reusable/DynamicTable";

export default function SharedRepositoryTable() {
    return (
        <DynamicTable>
            <TableHead>
                <TableRow className="bg-slate-300">
                    <TableCell className=" !w-[15%] !text-[13px] 2xl:text-md !text-black border !font-bold !text-left !pl-4" >For Course</TableCell>
                    <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Submission Title</TableCell>
                    <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Group name</TableCell>
                    <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Status</TableCell>
                    {/* <TableCell className=" !w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">View</TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
                
            </TableBody>
        </DynamicTable >
    )
}
