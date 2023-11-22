/* eslint-disable react/prop-types */
import styled from '@emotion/styled'
import { FileUpload } from '@mui/icons-material'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../administrator/Modal'
import DashBoardHeading from '../../reusable/DashBoardHeading'
import { useParams } from 'react-router-dom'

export default function AddDeliverable(props) {
    let { courseName, courseId } = useParams()
    const [file, setSelectedFile] = useState(null)
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

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

    function selectFileUpload(event) {
        setSelectedFile(event.target.files[0])
        console.log(file)

    }

    function addDeliverable(credentials) {
        console.log(credentials)

    }

    return (
        <>
            <Modal
                onDismiss={props.onDismiss}
                heading={<DashBoardHeading title="Add deliverables" desc="" />}
                width="md:w-[35rem]"
            >
                <Stack className="relative">
                </Stack>
                <Stack spacing={1} className="mb-4">
                    <Typography className="text-black">Course: <span className="underline font-semibold">{courseName}</span></Typography>
                </Stack>
                <form action="" onSubmit={handleSubmit(addDeliverable)}>

                    <Stack className="w-full items-center mt-5 rounded-md" paddingY={4}>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Title</Typography>
                            <TextField
                                variant="outlined"
                                label="Title"
                                size="small"
                                className="flex flex-grow"
                                name="name"
                                {...register('name')} />
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 " >Description</Typography>
                            <TextField
                                variant="outlined"
                                label="Description"
                                size="small"
                                className="flex flex-grow"
                                name="description"
                                {...register('description')} />
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Instructions</Typography>
                            <TextField
                                variant="outlined"
                                label="Instructions"
                                size="small"
                                className="flex flex-grow"
                                name="instruction"
                                {...register('instruction')} />
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Resources</Typography>
                            <Button disabled component="label" variant="contained" className="flex flex-grow" startIcon={<FileUpload />}  >
                                {file ? file.name : 'Upload file'} (conditional rendering title not working yet)
                                <VisuallyHiddenInput type="file" onChange={selectFileUpload} {...register('file')} />
                            </Button>

                        </Stack>
                        <Stack className="w-full px-2">
                            <Button type="submit" disabled={isSubmitting} variant="outlined" className="flex self-end w-32">Add</Button>
                        </Stack>
                    </Stack>

                </form>
            </Modal>
        </>
    )
}
