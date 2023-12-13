/* eslint-disable react/prop-types */
import { Alert, Button, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import * as OfferedCourseDeliverable from '../../../../network/offeredCourseDeliverable_api';
import Modal from '../../../administrator/Modal';
import DashBoardHeading from '../../../reusable/DashBoardHeading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FacultyModalDeadline({ onDismiss, data }) {
    const navigate = useNavigate()
    const { register, setValue, handleSubmit } = useForm()
    const [error, setError] = useState(false)

    async function setDeadline(data) {
        try {
            const response = await OfferedCourseDeliverable.setDeadlineOfferedCourseDeliverable(data)
            if(response.isSuccess){
                navigate(0)
                return
            }
        } catch (error) {
            console.error()
            setError(error)
        }
    }
    return (
        <Modal
            onDismiss={onDismiss}
            heading={<DashBoardHeading title="set deadline" desc="" />}
            width="md:w-[35rem]"
        >
            {error && <Alert></Alert>}
            <form action="" onSubmit={handleSubmit(setDeadline)}>
                <input type="text" name='id' value={data.offeredCourseDeliverableId} {...register('id')} hidden />
                <Stack className='gap-2'>
                    <Stack className='!flex-row items-center gap-2'>
                        <Typography className='w-[30%]'>Deliverable name</Typography>
                        <Stack className='w-full'>
                            <TextField size='small' variant='standard' value={data.deliverableTitle} />
                        </Stack>
                    </Stack>
                    <Stack className='!flex-row items-center gap-2'>
                        <Typography className='w-[30%]'>Description</Typography>
                        <Stack className='w-full'>
                            <TextField size='small' variant='standard' value={data.deliverableDescription} />
                        </Stack>
                    </Stack>
                    <Stack className='!flex-row items-start gap-2'>
                        <Typography className='w-[30%]'>Instructions</Typography>
                        <Stack className='w-full'>

                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Instructions"
                                className="!pl-4 flex flex-grow border-[1.5px] border-gray-300 rounded-md"
                                name="instruction"
                                value={data.deliverableInstruction}
                            />
                        </Stack>
                    </Stack>
                    <Stack className='!flex-row items-center gap-2'>
                        <Typography className='w-[30%]'> Deadline</Typography>
                        <Stack className='w-full'>

                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={[
                                    'DateTimePicker',
                                    'MobileDateTimePicker',
                                    'DesktopDateTimePicker',
                                    'StaticDateTimePicker',
                                ]}>

                                    <DemoItem label="Responsive variant">
                                        <DateTimePicker name="deadline" label="Set deadline" value={dayjs(data.deliverableDeadline)} onChange={(date) => {setValue('deadline', date, { shouldValidate: true });}} disablePast/>
                                    </DemoItem>
                                </DemoContainer>

                            </LocalizationProvider>
                        </Stack>
                    </Stack>

                    <Button type='submit' variant='contained' className=' !my-2 flex self-end'>Set deadline</Button>
                </Stack>
            </form>
        </Modal>
    )
}
