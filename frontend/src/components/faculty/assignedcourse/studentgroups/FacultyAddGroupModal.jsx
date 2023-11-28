/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from '@mui/material';
import Modal from '../../../administrator/Modal';
import DashBoardHeading from '../../../reusable/DashBoardHeading';

export default function FacultyAddGroupModal({ onDismiss }) {
    return (
        <Modal
            onDismiss={onDismiss}
            heading={<DashBoardHeading title="set deadline" desc="" />}
            width="md:w-[35rem]"
        >
            <form action="">
                <Stack className='gap-2'>
                    <Stack className='!flex-row items-center'>
                        <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Group name {" "} :</Typography>
                        <Stack className='w-full'>
                            <TextField size='small' variant='outlined' label="Name of the group" InputLabelProps={{style: { fontSize: '0.775rem' }}} />
                        </Stack>
                    </Stack>
                        <Stack className='!flex-row items-center'>
                            <Typography className='w-[20%] 2xl:!text-lg' fontSize={'small'}>Members {" "} :</Typography>
                            <Stack className='w-full'>
                                <Button className=''  size='small' variant='outlined'>Choose member</Button>
                                {/* <TextField size='small' variant='standard' label="Member" InputLabelProps={{style: { fontSize: '0.775rem' }}} /> */}
                            </Stack>
                        </Stack>
                    <Button type='submit' variant='contained' size='small' className=' !my-2 flex self-end'>Add</Button>
                </Stack>
            </form>
        </Modal>
    )
}
