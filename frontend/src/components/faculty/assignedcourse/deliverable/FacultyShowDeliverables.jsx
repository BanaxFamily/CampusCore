/* eslint-disable react/prop-types */
import { Edit } from "@mui/icons-material";
import { IconButton, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import DynamicTable from "../../../reusable/DynamicTable";
import FacultyModalDeadline from "./FacultyModalDeadline";

export default function FacultyShowDeliverables({ data }) {
    const [showModalDeadline, setShowModalDeadline] = useState(false)
    const [deliverableToEdit, setDeliverableToEdit] = useState([])

    return (
        <>
            {

                data.map((info, index) => {
                    return (
                        <Stack key={index} className="rounded-t-md group">
                            <DynamicTable>
                                <TableHead>
                                    <TableRow className="bg-slate-300">
                                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold"> Deliverable name </TableCell>
                                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold"> Description </TableCell>
                                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold"> Instruction </TableCell>
                                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold"> Date </TableCell>
                                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold" align="center"> Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="!text-[12px] 2xl:text-[14px] border">{info.deliverableTitle}</TableCell>
                                        <TableCell className="!text-[12px] 2xl:text-[14px] border">{info.deliverableDescription}</TableCell>
                                        <TableCell className="!text-[12px] 2xl:text-[14px] border">{info.deliverableInstruction}</TableCell>
                                        <TableCell className="!text-[12px] 2xl:text-[14px] border">{
                                            new Date(info.deliverableDeadline).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            } )}
                                        </TableCell>
                                        <TableCell className="!text-[12px] 2xl:text-[14px] border !text-center">
                                            <IconButton
                                                type="submit"
                                                size="small"
                                                onClick={() => {
                                                    setDeliverableToEdit(info)
                                                    setShowModalDeadline(true)
                                                }}
                                                className="group hover:!bg-green-300">
                                                <Edit fontSize="inherit" className=" text-green-400" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                            </DynamicTable>
                        </Stack>
                    )
                })
            }
            {showModalDeadline && <FacultyModalDeadline onDismiss={() => setShowModalDeadline(false)} data={deliverableToEdit} />}
        </>
    )
}
