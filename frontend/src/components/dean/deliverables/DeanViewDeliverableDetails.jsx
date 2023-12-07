/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Stack, Typography } from '@mui/material';
import Modal from '../../administrator/Modal';
import DashBoardHeading from '../../reusable/DashBoardHeading';

export default function DeanViewDeliverableDetails({ deliverable, onDismiss }) {


    return (
        <Modal
            onDismiss={onDismiss}
            heading={<DashBoardHeading title="Deliverable Details" desc="" />}
            width="md:w-[35rem]"
        >
            <Stack className='gap-2'>
                <Stack className=' justify-between'>
                    <Typography className='!text-md'>Deliverable name : <span className='font-bold text-black underline underline-offset-4 tracking-wide'>{deliverable.deliverable.name}</span> </Typography>
                </Stack>
                <Stack>
                    <Typography className='!text-md'>Description : <span className='font-bold text-black underline underline-offset-4 tracking-wide'>{deliverable.deliverable.instruction}</span> </Typography>
                </Stack>
                <Stack className='border border-gray-500 rounded-lg p-2'>
                    <Typography>Instructions :</Typography>
                    <span className='font-bold text-black underline underline-offset-4 pl-5'>{deliverable.deliverable.instruction}</span>
                </Stack>
                <Stack className=''>
                    <Typography className='!text-md'>Submission Type : <span className='font-bold text-black underline underline-offset-4 tracking-wide'>{deliverable.deliverable.groupSubmission ? "Group" : "Individual"}</span> </Typography>
                </Stack>
                <Stack className=''>
                    <Typography className='!text-md'>Submit To : <span className='font-bold text-black underline underline-offset-4 tracking-wide'>{deliverable.deliverable.forAdviser ? "Adviser" : "Individual"}</span> </Typography>
                </Stack>
            </Stack>
        </Modal>
    )
}
