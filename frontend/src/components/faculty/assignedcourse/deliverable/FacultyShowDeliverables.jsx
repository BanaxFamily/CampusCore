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
                        <Stack key={index} className="mx-auto rounded-t-md group">
                            <DynamicTable>
                                <TableHead>
                                    <TableRow className="bg-slate-300">
                                        <TableCell className="border !text-black !font-bold"> Deliverable name </TableCell>
                                        <TableCell className="border !text-black !font-bold"> Description </TableCell>
                                        <TableCell className="border !text-black !font-bold"> Instruction </TableCell>
                                        <TableCell className="border !text-black !font-bold"> Date </TableCell>
                                        <TableCell className="border !text-black !font-bold" align="center" colSpan={2}> Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="border">{info.deliverableTitle}</TableCell>
                                        <TableCell className="border">{info.deliverableDescription}</TableCell>
                                        <TableCell className="border">{info.deliverableInstruction}</TableCell>
                                        <TableCell className="border">{info.deliverableDeadline}</TableCell>
                                        <TableCell className="border !text-center">
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
