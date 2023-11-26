import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import * as Announcement from "../../../../../network/announcement_api"
import { useAuth } from "../../../../../utils/AuthContext";

export default function FacultyCreatedAnnouncement() {
    let {userId} = useAuth()

    useEffect(() => {
        console.log(userId)
        async function getCreatedAnnouncement(){
            const response = await Announcement.getAnnouncementByFaculty({'id': userId})
            console.log(response)
        }

        getCreatedAnnouncement()

    }, [])
    return (
        <Stack>
            <Typography variant="subtitle1" className="!text-[13px] !tracking-wide" component={'h1'}> Title : TITLE HERE </Typography>
            <Stack className="mt-2 border border-gray-400 rounded-md" paddingX={3}>
                <Typography fontSize={'small'}> Announcement Desccription </Typography>
            </Stack>
        </Stack>
    )
}
