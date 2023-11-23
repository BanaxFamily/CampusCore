/* eslint-disable react/prop-types */
import { Avatar, Button, Stack, Typography } from '@mui/material'
import Modal from '../administrator/Modal'
import { Edit, Save } from '@mui/icons-material'
import DashBoardHeading from '../reusable/DashBoardHeading'

export default function EditAnnouncement(props) {
    return (
        <Modal
            onDismiss={props.onDismiss}
            heading={<DashBoardHeading title="Edit Announcement" desc="" />}
        >
            <Stack paddingX={2} paddingY={2} className="border-2 border-gray-400 w-full rounded-lg">
                <Stack direction={'row'} paddingBottom={4} spacing={2}>
                    <Avatar />
                    <Stack direction={'column'} className="w-full md:w-[30%]" justifyContent={'between'}>
                        <Typography variant="h6" fontSize={'medium'} component={'span'}> (not editable) </Typography>
                        <Typography fontSize={'small'}> (not editable/ automatic ) </Typography>
                    </Stack>
                    <Stack className="md:w-full">
                        <Button type='submit' className="flex self-end !border-none !text-blue-500" variant="standard" >Save<Save /></Button>
                    </Stack>
                </Stack>
                <Stack className=" md:px-8">
                    <Typography variant="h5" fontSize={'medium'} component={'h1'}> Announcement Title (EDITABLE) </Typography>

                    <Stack className="mt-4 border border-gray-400 rounded-md" paddingY={2} paddingX={3}>
                        <Typography fontSize={'small'}> Announcement Desccription (EDITABLE) </Typography>
                    </Stack>
                </Stack>
            </Stack>

        </Modal>
    )
}
