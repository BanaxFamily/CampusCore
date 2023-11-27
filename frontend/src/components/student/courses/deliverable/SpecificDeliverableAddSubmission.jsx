/* eslint-disable react/prop-types */
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AddDeliverableModal from "./AddDeliverableModal";

export default function SpecificDeliverableAddSubmission({ deliverable }) {
    const [openSubmission, setOpenSubmission] = useState(false);
    return (
        <Stack className="mt-2 " >

            {
                deliverable.map((info, index) => {
                    return (

                        <Stack className=" w-full py-4 px-10 mx-auto gap-3" key={index}>
                            <Stack className="!flex-row items-center gap-2">
                                <Typography className="!text-[13px]">Description :</Typography>
                                <Typography className="underline underline-offset-4 !text-[13px] !font-semibold !tracking-wide">{info.deliverableDescription}</Typography>
                            </Stack>
                            <Stack className="!flex-row items-center gap-2">
                                <Typography className="!text-[13px]">Due date :</Typography>
                                <Typography className="underline underline-offset-4 !text-[13px] !font-semibold !tracking-wide">{new Date(info.deliverableDeadline).toLocaleString()}</Typography>
                            </Stack>

                            <Stack className="gap-4">
                                <Typography className="!text-[13px]">Instructions :</Typography>
                                <Stack className="border rounded-md p-4">
                                    <Typography className="!text-[13px] !font-medium !tracking-wider">{info.deliverableInstruction}</Typography>
                                </Stack>
                            </Stack>

                            <Stack className="my-4">
                                <Button variant="outlined" size="small" onClick={() => setOpenSubmission(true)} className="  flex self-end">Add submission</Button>
                            </Stack>
                        </Stack>
                    )
                })
            }

            {openSubmission && <AddDeliverableModal onDismiss={() => setOpenSubmission(false)} />}
        </Stack >
    )
}
