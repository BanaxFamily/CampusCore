/* eslint-disable react/prop-types */
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AddDeliverableModal from "./AddDeliverableModal";

export default function SpecificDeliverableAddSubmission({ deliverable }) {
    const [openSubmission, setOpenSubmission] = useState(false);
    return (
        <Stack className="mt-2 " >
            <Stack className="w-3/4 py-4 px-2 mx-auto gap-3">
                <Stack className="!flex-row items-center gap-2">
                    <Typography>Description :</Typography>
                    <Typography className="underline underline-offset-4 !font-semibold !tracking-wide">{deliverable.description}</Typography>
                </Stack>

                <Stack className="gap-4">
                    <Typography>Instructions :</Typography>
                    <Stack className="border-2 rounded-md ml-10 p-4">
                        <Typography className="!text-[14px] !font-medium !tracking-wider">{deliverable.instruction}</Typography>
                    </Stack>
                </Stack>

                <Stack className="my-4">
                    <Button variant="outlined" onClick={() => setOpenSubmission(true)} className="flex self-end">Add submission</Button>
                </Stack>
            </Stack>

            {openSubmission && <AddDeliverableModal />}
        </Stack >
    )
}
