/* eslint-disable react/prop-types */
import { Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import DynamicTable from "../../reusable/DynamicTable";
import DeanConfirmDialogPublishRequest from "./DeanConfirmDialogPublishRequest";
import DeanViewCertificationsModal from "./DeanViewCertificationsModal";

export default function DeanPublishRequestTable({ allRequest }) {
    const [showCertification, setShowCertifications] = useState(false)
    const [submissionIdCertificate, setSubmissionIdCertificate] = useState(null)

    function viewCertifications(submissionId) {
        setSubmissionIdCertificate(submissionId)
        setShowCertifications(true)
    }
    return (
        <>
            <DynamicTable>
                <TableHead>
                    <TableRow className="bg-slate-300">
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Title</TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Authors</TableCell>
                        <TableCell className=" !w-[20%] !text-[13px] 2xl:text-md border !text-black !font-bold">Date uploaded</TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Approval Certificates</TableCell>
                        <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Publish</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allRequest && allRequest.map((rq, index) => (
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
                                <Button onClick={() => viewCertifications(rq.submissionId)} size="small" className="!text-md">View Certificates</Button>
                            </TableCell>
                            <TableCell className=" !text-[13px] 2xl:text-md !text-black border ">
                                {/* <Button size="small" className="!text-md">Publish<Publish /></Button> */}
                                <DeanConfirmDialogPublishRequest requestId={rq.requestId}/>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </DynamicTable>
            { showCertification && <DeanViewCertificationsModal onDismiss={() => setShowCertifications(false)} submissionIdCertificate={submissionIdCertificate}/>}
        </>
    )
}
