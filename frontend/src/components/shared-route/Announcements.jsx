import { Edit } from "@mui/icons-material";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import EditAnnouncement from "./EditAnnouncement";

export default function Announcements() {
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)
    return (
        <Stack paddingX={2} paddingY={2} className="border-2 border-gray-400 w-full md:w-[80%] rounded-lg">
            <Stack direction={'row'} paddingBottom={4} spacing={2}>
                <Avatar />
                <Stack direction={'column'} className="w-full md:w-[30%]" justifyContent={'between'}>
                    <Typography variant="h6" fontSize={'medium'} component={'span'}> User full name </Typography>
                    <Typography fontSize={'small'}> Date posted </Typography>
                </Stack>
                <Stack className="md:w-full">
                    <Button onClick={() => setShowAnnouncementModal(true)} className="flex self-end !border-none !text-green-500" variant="standard" ><Edit /></Button>
                </Stack>
            </Stack>
            <Stack className=" md:px-8">
                <Typography variant="h5" fontSize={'medium'} component={'h1'}> Announcement Title </Typography>

                <Stack className="mt-4 border border-gray-400 rounded-md" paddingY={2} paddingX={3}>
                    <Typography fontSize={'small'}> Announcement Desccription </Typography>
                </Stack>
            </Stack>

            {showAnnouncementModal && <EditAnnouncement onDismiss={() => setShowAnnouncementModal(false)}/>}
        </Stack>

    )
}
