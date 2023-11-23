/* eslint-disable react/prop-types */
import styled from '@emotion/styled'
import { FileUpload } from '@mui/icons-material'
import { Alert, Button, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../administrator/Modal'
import DashBoardHeading from '../../reusable/DashBoardHeading'
import { useNavigate, useParams } from 'react-router-dom'
import * as Deliverable from '../../../network/deliverable'
import * as CourseDeliverable from '../../../network/courseDeliverable_api'

export default function AddDeliverable(props) {
    let { courseName, courseId } = useParams()
    const navigate = useNavigate()
    const [file, setSelectedFile] = useState(null)
    const [error, setError] = useState(false)
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
    async function addDeliverableToCourse(data){
        const formData = {
            'CourseId': courseId,
            'deliverableId': data,
            'deliverableDeadline': null
        }

        const response = await CourseDeliverable.createCourseDeliverable(formData)
        if(!response.ok){
            setError('Fail to create deliverable. Check your inputs')
        }
    }

    async function addDeliverable(credentials) {
        const response = await Deliverable.addDeliverable(credentials);
        if(response.isSuccess){
            const deliverableId = response.data
            addDeliverableToCourse(deliverableId);
        }
    }

    return (
        <>
            <Modal
                onDismiss={() => {
                    props.onDismiss
                    navigate(0)
                }}
                heading={<DashBoardHeading title="Add deliverables" desc="" />}
                width="md:w-[35rem]"
            >
                <Stack className="mb-2">
                    {error && <Alert severity='error'>{error}</Alert>}
                </Stack>
                <Stack spacing={1}>
                    <Typography className="text-black">Course: <span className="underline font-semibold">{courseName}</span></Typography>
                </Stack>
                <form action="" onSubmit={handleSubmit(addDeliverable)}>

                    <Stack className="w-full items-center mt-2 rounded-md" paddingBottom={4}>
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
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Instructions"
                                className="!pl-4 flex flex-grow border-[1.5px] border-gray-300 rounded-md"
                                name="instruction"
                                {...register('instruction')} />
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Resources</Typography>
                            <Button disabled component="label" variant="contained" className="flex flex-grow" startIcon={<FileUpload />}  >
                                {file ? file.name : 'Upload file'} (conditional rendering title not working yet)
                                <VisuallyHiddenInput type="file" onChange={selectFileUpload} />
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
