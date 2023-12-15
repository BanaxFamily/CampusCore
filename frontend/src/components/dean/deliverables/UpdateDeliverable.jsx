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
                                        value={deliverable.forAdviser}
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
                                        value={deliverable.groupSubmission}
                                        {...register("groupSubmission", { required: "select one option" })}
                                    >
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </TextField>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className=" p-2 w-full" alignItems={'center'} direction={'row'} spacing={2}>
                            <Typography className="w-1/6 ">Approval</Typography>
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
                                defaultValue={deliverable.highestApprovalNeeded}
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
                                defaultValue={deliverable.name}
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
                                defaultValue={deliverable.description}
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
                                defaultValue={deliverable.instruction}
                                {...register('instruction')} />
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
