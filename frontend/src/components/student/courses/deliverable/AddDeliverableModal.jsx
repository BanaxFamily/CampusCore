import styled from "@emotion/styled";
import { FileUpload } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../utils/AuthContext";
import Modal from "../../../administrator/Modal";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import { useParams } from "react-router-dom";

export default function AddDeliverableModal() {
    let { courseDeliverabelId } = useParams()
    const { userId } = useAuth()
    const [file, setSelectedFile] = useState(null)
    const [fileEmpty, setFileEmpty] = useState(true)
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    async function submitDeliverable(data) {
        console.log(data)

    }

    function selectedFileUpload(event) {
        setSelectedFile(event.target.files[0])
        setFileEmpty(false)
    }

    return (
        <Modal
            heading={<DashBoardHeading title="Upload your files here" desc="" />}
            width="md:w-[35rem]"
        >
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
                            <VisuallyHiddenInput onChange={selectedFileUpload} type="file" {...register('file')} />
                            {fileEmpty ? <Typography fontSize={'small'}>Upload File</Typography> : <Typography fontSize={'small'}>{file.name}</Typography>}
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
