/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";

export default function SpecificDeliverableAddSubmission({ deliverable }) {
    // const [openSubmission, setOpenSubmission] = useState(false);
    return (
        <Stack className="mt-2 " >

            {
                deliverable.map((info, index) => {
                    return (

                        <Stack className=" w-full py-4 mx-auto gap-3 " key={index}>
                            <Stack className="gap-2">
                                <Stack className="!flex-row gap-2 ">
                                    <Typography className="!text-md  ">Description:</Typography>
                                    <Typography className="underline underline-offset-4 !text-md !font-semibold !tracking-wide">{info.deliverableDescription}</Typography>
                                </Stack>
                                <Stack className="!flex-row gap-2 ">
                                    <Typography className="!text-md ">Deadline:</Typography>
                                    <Typography className="underline underline-offset-4 !text-md !font-semibold !tracking-wide">{new Date(info.deliverableDeadline).toLocaleString()}</Typography>
                                </Stack>
                            </Stack>

                            <Stack className="gap-4 ">
                                <Typography className="!text-md">Instructions :</Typography>
                                <Stack className="border border-black bg-slate-100 px-2 py-2 rounded-md p-4">
                                    <Typography className="!text-md !font-medium text-slate-600 !tracking-wider">{info.deliverableInstruction}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    )
                })
            }

        </Stack >
    )
}
