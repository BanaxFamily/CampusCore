/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from "@mui/material";
import Modal from "../../administrator/Modal";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../utils/AuthContext";
import * as IssueApi from "../../../network/issue_api"

export default function AddIssueModal(props) {
    const { userId } = useAuth()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    async function insertIssue(data){
        const response = await IssueApi.addNewIssue(data)
        console.log(response)
    }
    return (
        <Modal
            onDismiss={props.onDismiss}
            heading={<DashBoardHeading title="Add issue" desc="" />}
            width="md:w-[35rem]"
        >
            <form action="" onSubmit={handleSubmit(insertIssue)}>
                <div className="text-gray-900">
                    <Stack className="gap-4">
                        <input className="w-full !px-4 " value={props.submissionId} name="submissionId" {...register('submissionId', { required: true })} hidden />
                        <input className="w-full !px-4 " value={userId} name="userId" {...register('userId', { required: true })} hidden />
                        <Stack className="w-full flex gap-2 ">
                            <Stack className="!flex-row items-center">
                                <Typography >Title&nbsp;:</Typography>
                                <TextField className="w-full !px-4 " variant="standard" name="name" {...register('name', { required: true })} />
                            </Stack>
                            <Stack className="!flex-row items-center gap-2">
                                <Typography>Status :</Typography>
                                <TextField
                                    id="filled-role"
                                    select
                                    label=" status"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    name="status"
                                    size="small"
                                    {...register('status', {required: true})}
                                >
                                    <option value=""></option>
                                    <option value="open">Open</option>
                                    <option value="close">Close</option>
                                </TextField>
                            </Stack>
                        </Stack>
                        <Button type="submit" disabled={isSubmitting} variant="contained" size="small" className="!flex self-end !w-1/2">Add issue</Button>
                    </Stack>
                </div>
            </form>
        </Modal>
    )
}





                        {/* <Stack className="my-2" direction="row" spacing={1}>
                        <Typography variant="p" className="">opended by :</Typography>
                        <Typography variant="p">DEAN USER FULL NAME</Typography>
                    </Stack> */}

                        {/* <div className="my-4 border h-32" >
                        APPEND ISSUE HERE
                    </div> */}

                        {/* <Stack direction="row" spacing={1} className="w-full flex items-center">
                        <TextField
                            id="comment"
                            label="Comment"
                            placeholder="Issue"
                            margin="dense"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                        <Button variant="outlined"><Send className="-rotate-12" /></Button>
                    </Stack>
                    <Stack direction="row" className="w-full flex justify-end gap-1 mt-8">
                        <p className="text-md text-gray-500">Issue resolved?</p>
                        <Button variant="outlined" size="small" className="!border-paleRed !text-paleRed">Close issue</Button>
                    </Stack> */}
