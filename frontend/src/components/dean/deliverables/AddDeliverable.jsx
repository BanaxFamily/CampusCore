/* eslint-disable react/prop-types */
import styled from '@emotion/styled'
import { FileUpload } from '@mui/icons-material'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../administrator/Modal'
import DashBoardHeading from '../../reusable/DashBoardHeading'

export default function AddDeliverable(props) {
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
                <form action="" onSubmit={handleSubmit(addDeliverable)}>

                    <Stack className="border-2 w-full items-center mt-5 rounded-md shadow-md" paddingY={4}>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Title</Typography>
                            <TextField variant="outlined" size="small" className="flex flex-grow" name="title" {...register('name')} />
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Instructions</Typography>
                            <TextField variant="outlined" size="small" className="flex flex-grow" name="instruction" {...register('instruction')} />
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Resources</Typography>
                            <Button component="label" variant="contained" className="flex flex-grow" startIcon={<FileUpload />}  >
                                {file ? file.name : 'Upload file'} (conditional rendering title not working yet)
                                <VisuallyHiddenInput type="file" onChange={selectFileUpload} {...register('file')} />
                            </Button>

                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Due date</Typography>
                            <TextField variant="outlined" size="small" className="flex flex-grow" name="date" {...register('date')} />
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
