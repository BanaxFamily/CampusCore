/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as IssueCommentApi from "../../../network/issueComment_api";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import { useAuth } from "../../../utils/AuthContext";

export default function ViewIssue({ toViewIssue }) {
    let {userRole} = useAuth()
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function showAllComments() {
            try {
                const response = await IssueCommentApi.getComments({ "issueId": toViewIssue.issueId })
                if (response.isSuccess) {
                    setComments(response.data)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        showAllComments()
    }, [])
    return (
        <Stack className="gap-2 mt-2">
            <DashBoardHeading title="Details" classname="!py-2" desc="" />
            <Stack className="border shadow-sm h-64 overflow-y-auto rounded-md">
                {!loading && comments.length <= 0 && userRole === "Student" && <Alert severity="info">There is no comment for issue</Alert>}
                {!loading && comments.length <= 0 && userRole === "Faculty" && <Button variant="outlined">There is no comment for issue</Button>}
                {!loading && comments.length > 0 &&
                    <Stack className="px-2 pt-2">
                        <Typography className="!text-sm text-slate-600 font-semibold"><span className="font-bold">Issuer</span> : {toViewIssue.issueOpenedBy}</Typography>
                        <Stack className=" w-full px-2 !flex-row items-center justify-between">
                            <Stack>
                                <Typography className="!text-md text-slate-600">{toViewIssue.issueTitle}</Typography>
                            </Stack>
                        </Stack>
                        <Divider />
                    </Stack>
                }
            </Stack>
        </Stack>
    )
}
