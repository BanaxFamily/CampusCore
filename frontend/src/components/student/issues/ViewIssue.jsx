/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Send } from "@mui/icons-material";
import { Alert, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as IssueCommentApi from "../../../network/issueComment_api";
import { useAuth } from "../../../utils/AuthContext";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import ConfirmDialogIssue from "./ConfirmDialogIssue";


export default function ViewIssue({ toViewIssue }) {
    let { userRole, userId } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    useEffect(() => {
        async function showAllComments() {
            try {
                const response = await IssueCommentApi.getComments({ "issueId": toViewIssue.issueId })
                if (response.isSuccess) {
                    setComments(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        showAllComments()
    }, [])

    async function insertIssueComment(data) {
        let dataToSent = {
            ...data,
            "issueId": toViewIssue.issueId,
            "userId": userId
        }
        try {
            const response = await IssueCommentApi.addIssueComment(dataToSent)
            if (response.isSuccess) {
                navigate(0)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Stack className="gap-2 my-2 relative">
            <DashBoardHeading title="Details" classname="!py-2" desc="" />
            {/* <input type="text" value={toViewIssue.issueId} name="issueId" hidden {...register('issueId', {required: true})} /> */}
            <Stack className="!absolute right-0 top-[-4px] uppercase !text-sm hover:!text-red-400 !text-red-600 font-bold ">
                {userRole !== "Student" && <ConfirmDialogIssue issueId={toViewIssue.issueId} />}
            </Stack>
            {/* <IconButton type="submit" className="!absolute right-0 top-[-4px] uppercase !text-sm hover:!text-red-400 !text-red-600 font-bold " size="small">Close&nbsp; issue</IconButton> */}
            <Stack className="border shadow-sm h-64 overflow-y-auto rounded-md gap-2">
                <Stack className="border shadow-sm overflow-y-auto rounded-md gap-2">
                    {!loading && comments.length <= 0 && userRole === "Student" && <Alert severity="info">There is no comment for this issue</Alert>}
                    {!loading && comments.length <= 0 && userRole === "Faculty" && <Alert severity="info">There is no comment for this issue</Alert>}
                    {!loading && comments.length > 0 &&
                        comments.map((comment, index) => (
                            <Stack className=" h-full " key={index}>
                                <Stack className="px-2">
                                    <Typography className="!text-md text-slate-600 !font-bold underline underline-offset-4">{comment.commenter}</Typography>
                                    <Stack>
                                        <Typography className="!text-md text-slate-600 ">{comment.comment}</Typography>
                                    </Stack>
                                    <Divider />
                                </Stack>
                            </Stack>
                        ))
                    }

                </Stack>
                <form action="" onSubmit={handleSubmit(insertIssueComment)}>
                    <Stack className="!flex-row">
                        <TextField label="comment" size="small" name="commentText" {...register('commentText', { required: true })} />
                        <Button type="submit" disabled={isSubmitting}><Send /></Button>
                    </Stack>
                </form>

            </Stack>
        </Stack>
    )
}
