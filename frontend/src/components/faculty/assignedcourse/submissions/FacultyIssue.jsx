/* eslint-disable react/prop-types */
import { MoreHoriz } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddIssueModal from "../../../dean/courses/AddIssueModal";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
// import * as IssueApi from "../../../../network/issue_api"

export default function FacultyIssue({ issueTitle }) {
    let { submissionId } = useParams()
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     async function showAllIssue(){
    //         const data = {
    //             "submissionId" : submissionId,
    //         }
    //         const respone = await IssueApi.getAllIssue()
    //     }
    // }, [])
    return (
        <div className="py-2 ">
            {submissionId && <DashBoardHeading desc="" title={`${issueTitle}`} classname="py-6"  />}
            <div className={` px-2 ${submissionId ? 'max-h-[200px]' : 'max-h-[100px]'} py-2 overflow-y-auto`}>
                <Stack direction="column" spacing={1}>
                    <div className="w-full flex justify-between border bg-slate-100 border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
                        <Typography variant="p">Issue 1</Typography>
                        <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
                    </div>
                </Stack>
            </div>
            {submissionId &&
                <Stack className="mt-4 px-2">
                    <Button variant="contained" onClick={() => setOpen(true)}>Add new issue</Button>
                </Stack>
            }

            {/* Component can be found in Dean Folders */}
            {open && <AddIssueModal onDismiss={() => setOpen(false)} submissionId={submissionId} />}
        </div>
    )
}
