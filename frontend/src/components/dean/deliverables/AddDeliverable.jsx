/* eslint-disable react/prop-types */
import styled from '@emotion/styled'
import { FileUpload } from '@mui/icons-material'
import { Alert, Button, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as CourseDeliverable from '../../../network/courseDeliverable_api'
import * as Deliverable from '../../../network/deliverable'
import Modal from '../../administrator/Modal'
import DashBoardHeading from '../../reusable/DashBoardHeading'

export default function AddDeliverable(props) {
    let { courseName, courseId } = useParams()
    const navigate = useNavigate()
    const [file, setSelectedFile] = useState(null)
    const [error, setError] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const { register, reset, handleSubmit, formState: { isSubmitting } } = useForm();

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
    async function addDeliverableToCourse(data) {
        const formData = {
            'courseId': parseInt(courseId),
            'deliverableId': data
        }
        try {

            const response = await CourseDeliverable.createCourseDeliverable(formData)
            if (response.isSuccess) {
                setSuccessMessage(response.message)
                reset()
                return
            }

            if (!response.ok) {
                setError('Fail to create deliverable. Check your inputs')
                return
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function addDeliverable(credentials) {
        const adjustCredentials = {
            "name": credentials.name,
            "instruction": credentials.instruction,
            "description": credentials.description,
            "forAdviser": Boolean(credentials.forAdviser),
            "groupSubmission": Boolean(credentials.groupSubmission),
            "highestApprovalNeeded": credentials.highestApprovalNeeded
        }
        // console.log(adjustCredentials)
        const response = await Deliverable.addDeliverable(adjustCredentials);
        console.log(response)
        if (response.isSuccess) {
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
                    {!error && successMessage && <Alert severity='success'>{successMessage}</Alert>}
                </Stack>
                <Stack spacing={1}>
                    <Typography className="text-black">Course: <span className="underline font-semibold">{courseName}</span></Typography>
                </Stack>
                <form action="" onSubmit={handleSubmit(addDeliverable)}>

                    <Stack className="w-full items-center mt-2 rounded-md" >
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Stack className='w-1/2 !flex-row'>
                                <Stack className='w-full'>
                                    <TextField
                                        select
                                        label="For adviser"
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size='small'
                                        InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                        name="forAdviser"
                                        {...register("forAdviser", { required: "select one option" })}
                                    >
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </TextField>
                                </Stack>
                            </Stack>
                            <Stack className='w-1/2 !flex-row'>
                                <Stack className='w-full'>
                                    <TextField
                                        select
                                        label="For group submission "
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size='small'
                                        InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                        name="groupSubmission"
                                        {...register("groupSubmission", { required: "select one option" })}
                                    >
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </TextField>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Title</Typography>
                            <TextField
                                select
                                label="Highes approval needed"
                                SelectProps={{
                                    native: true,
                                }}
                                className="flex flex-grow"
                                variant="outlined"
                                size='small'
                                InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                name="highestApprovalNeeded"
                                {...register("highestApprovalNeeded", { required: "select one option" })}
                            >
                                <option value={'PRC Level'}>PRC Level</option>
                                <option value={'Dean Level'}>Dean Level</option>
                                <option value={'Faculty Level'}>Faculty Level</option>
                            </TextField>
                        </Stack>
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
