/* eslint-disable react/prop-types */
import { FileUpload } from "@mui/icons-material";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../utils/AuthContext";
import Modal from "../../../administrator/Modal";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import * as Submission from "../../../../network/submission_api"
import { useState } from "react";

export default function AddDeliverableModal({onDismiss}) {
    let { courseDeliverabelId } = useParams()
    const navigate = useNavigate()
    const { userId } = useAuth()
    const { register, handleSubmit } = useForm()
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false)

    async function submitDeliverable(data) {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("submitterId", data.submitterId)
        formData.append("forCourseDeliverable", data.forCourseDeliverable)
        formData.append("file", data.file[0])

        try {
            const response = await Submission.submissionOfDeliverable(formData)
            if(response.isSuccess){
                navigate(0)
                return
            }

            if(!response.ok){
                const errorValues = Object.values(data.errors).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
                // Set the error state with values
                setErrorMessage(errorValues.join(', '));
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
                    <input type="text" value={courseDeliverabelId} name="forCourseDeliverable" hidden  {...register('forCourseDeliverable')} />
                    <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                        <Typography className="w-1/6 ">Title</Typography>
                        <TextField
                            variant="outlined"
                            label="Title"
                            size="small"
                            className="flex flex-grow"
                            name="title"
                            {...register('title')}
                        />
                    </Stack>
                    <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                        <Typography className="w-1/6 ">Resources</Typography>
                        <Button component="label" variant="contained" className="flex flex-grow" startIcon={<FileUpload />}  >
                            <input type="file" {...register('file')} hidden />
                            Upload file
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
