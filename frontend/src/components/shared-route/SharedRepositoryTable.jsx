/* eslint-disable react/prop-types */
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { NavLink } from "react-router-dom";
import DynamicTable from "../reusable/DynamicTable";

export default function SharedRepositoryTable({ published }) {
    return (
        <DynamicTable>
            <TableHead>
                <TableRow className="bg-slate-300">
                    <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Title</TableCell>
                    <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Authors</TableCell>
                    <TableCell className=" !w-[20%] !text-[13px] 2xl:text-md border !text-black !font-bold">Date uploaded</TableCell>
                    <TableCell className=" !w-[15%] !text-[13px] 2xl:text-md !text-black !font-bold">View File</TableCell>
                    <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">View Count</TableCell>
                    {/* <TableCell className=" !w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">View</TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
                {published && published.map((rq, index) => (
                    <TableRow key={index}>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black border ">{rq.title}</TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black border ">{rq.authors}</TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black border ">
                            {new Date(rq.dateUploaded).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black border ">
                            <NavLink to={`${rq.researchId}`} className="!text-md !text-blue-400 uppercase">View</NavLink>
                        </TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black border ">
                            {/* <Button size="small" className="!text-md">Publish<Publish /></Button> */}
                            {rq.viewCount}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </DynamicTable >
    )
}
