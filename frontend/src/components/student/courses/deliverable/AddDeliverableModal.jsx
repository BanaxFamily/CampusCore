/* eslint-disable react/prop-types */
import { FileUpload } from "@mui/icons-material";
import { Alert, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Submission from "../../../../network/submission_api";
import { useAuth } from "../../../../utils/AuthContext";
import Modal from "../../../administrator/Modal";
import DashBoardHeading from "../../../reusable/DashBoardHeading";

export default function AddDeliverableModal({ issues, submissionId, onDismiss }) {
    let { offeredCourseDeliverableId, groupId } = useParams()
    const navigate = useNavigate()
    const { userId } = useAuth()
    const { register, handleSubmit } = useForm()
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false)
    const [selectedIssues, setSelectedIssues] = useState([]);
    // const [leader, setLeader] = useState("")


    function handleCheckboxChange(member) {
        if (selectedIssues.includes(member)) {
            setSelectedIssues(selectedIssues.filter((m) => m !== member));
        } else {
            setSelectedIssues([...selectedIssues, member]);
        }
    }


    async function submitDeliverable(data) {

        try {
            if (submissionId) {
                const formData = new FormData()
                formData.append("submissionId", submissionId)
                formData.append("file", data.file[0])
                formData.append("fileType", data.FileType)
                formData.append("targetedIssues", selectedIssues)
                console.log('FormData content:');
                for (let pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                const response = await Submission.addNewSubmissionDeliverableVersion(formData)
                if (response.isSuccess) {
                    navigate(0)
                    return
                }
            } else {
                const formData = new FormData()
                formData.append("title", data.title)
                formData.append("submitterId", data.submitterId)
                formData.append("offeredCourseDeliverableId", data.offeredCourseDeliverableId)
                formData.append("file", data.file[0])
                formData.append("fileType", data.FileType)
                // formData.append("targetedIssues", [1])
                if (groupId !== "null") {
                    formData.append("groupId", groupId);
                }
                const firstSubmission = await Submission.firstSubmissionDeliverable(formData)
                if (firstSubmission.isSuccess) {
                    navigate(0)
                    return
                }

            }
        } catch (error) {
            console.error(error)
            setError(true)
        }
    }


    return (
        <Modal
            onDismiss={onDismiss}
            heading={<DashBoardHeading title="Upload your files here" desc="" />}
            width="md:w-[35rem]"
        >
            {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <form action="" onSubmit={handleSubmit(submitDeliverable)}>

                <Stack className="w-full items-center mt-2 rounded-md" paddingBottom={4}>
                    <input type="text" value={userId} name="submitterId" hidden  {...register('submitterId')} />
                    <input type="text" value={offeredCourseDeliverableId} name="offeredCourseDeliverableId" hidden  {...register('offeredCourseDeliverableId')} />
                    <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                        <Typography className="w-1/6 ">Title</Typography>
                        <TextField
                            variant="outlined"
                            label="Title"
                            size="small"
                            className="flex flex-grow"
                            InputLabelProps={{ style: { fontSize: '0.775rem' } }} {...register('name')}
                            name="title"
                            {...register('title')}
                        />
                    </Stack>
                    <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>

                        <Typography className="w-1/6 ">Targeted Issues</Typography>
                        <Stack className='border max-h-32 px-2 flex-grow overflow-y-scroll'>
                            {
                                issues.map((issue, index) => (
                                    <Stack key={index}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label={<Typography className="md:!text-md">{issue.issueTitle}</Typography>}
                                            onChange={() => handleCheckboxChange(issue.issueId)}
                                        />
                                    </Stack>
                                ))
                            }
                        </Stack>

                    </Stack>
                    <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                        <Typography className='w-[20%]' >File type {" "} </Typography>
                        <Stack className='w-full'>
                            <TextField
                                select
                                label="FileType"
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                                size='small'
                                InputLabelProps={{ style: { fontSize: '0.775rem' } }} {...register('name')}
                                name="FileType"
                                {...register("FileType", { required: "select one option" })}
                            >
                                <option value=""></option>
                                <option value="image">image</option>
                                <option value="pdf">pdf</option>
                            </TextField>
                        </Stack>
                    </Stack>
                    <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                        <Typography className="w-1/6 ">File</Typography>
                        <Button component="label" variant="contained" className="flex flex-grow" startIcon={<FileUpload />}  >
                            <input type="file" {...register('file')} />
                        </Button>

                    </Stack>
                    <Stack className="w-full px-2">
                        <Button type="submit" variant="outlined" className="flex self-end w-32">Add</Button>
                    </Stack>
                </Stack>

            </form>
        </Modal >
    )
}
