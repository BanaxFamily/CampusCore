/* eslint-disable react/prop-types */
import { Alert, Backdrop, Button, CircularProgress, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Deliverable from '../../../network/deliverable'
import Modal from '../../administrator/Modal'
import DashBoardHeading from '../../reusable/DashBoardHeading'

export default function UpdateDeliverable({ deliverable, onDismiss }) {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [error, setError] = useState(false)
    const [clientUpdateError, setClientUpdateError] = useState(false)
    const [clientUpdateSuccess, setClientUpdateSuccess] = useState(false)
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    async function saveUpdateDeliverable(data) {
        try {
            const response = await Deliverable.updateDeliverable(data);
            if (response.isSuccess) {
                setMessage(response.message)
                setClientUpdateSuccess(true)
                setTimeout(() => {
                    setClientUpdateSuccess(false)
                    navigate(0)
                }, 2000)
                return
            }

            if (!response.ok) {
                const error = await response.json()
                setMessage(error.errors)
                setClientUpdateError(true)
                setTimeout(() => {
                    setClientUpdateError(false)
                }, 2000)
                return
            }
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <Modal
                onDismiss={() => {
                    onDismiss()
                    navigate(0)
                }}
                heading={<DashBoardHeading title="Update deliverable" desc="" />}
                width="md:w-[35rem]"
            >
                <Stack spacing={1}>
                    {error && <Alert severity='error'>{message}</Alert>}
                    {clientUpdateError && <Alert severity='error'>{message}</Alert>}
                    {clientUpdateSuccess && <Alert severity='success'>{message}</Alert>}
                    {loading && <Backdrop open={open}><CircularProgress color='inherit' /></Backdrop>}

                    {/* { error && !loading && <Alert severity='success'>{message}</Alert>} */}
                </Stack>
                <form action="" onSubmit={handleSubmit(saveUpdateDeliverable)}>
                    <input type="text" hidden name='id' value={deliverable.id} {...register('id')} />
                    <Stack className="w-full items-center mt-2 rounded-md" paddingBottom={2}>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Title</Typography>
                            <TextField
                                variant="standard"
                                size="small"
                                className="flex flex-grow"
                                name="name"
                                defaultValue={deliverable.name}
                                {...register('name')}
                            />
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 " >Description</Typography>
                            <TextField
                                variant="standard"
                                size="small"
                                className="flex flex-grow"
                                name="description"
                                defaultValue={deliverable.description}
                                {...register('description')}
                            />
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Instructions</Typography>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Instructions"
                                className="!pl-4 flex flex-grow border-[1.5px] !text-black border-gray-300 rounded-md"
                                name="instruction"
                                defaultValue={deliverable.instruction}
                                {...register('instruction')}
                            />
                        </Stack>
                        <Stack className="w-full">
                            <Button disabled={isSubmitting} type="submit" onClick={() => setOpen(true)} variant="outlined" className="flex self-end w-32">Update</Button>
                        </Stack>
                    </Stack>

                </form>
            </Modal>
        </>
    )
}
