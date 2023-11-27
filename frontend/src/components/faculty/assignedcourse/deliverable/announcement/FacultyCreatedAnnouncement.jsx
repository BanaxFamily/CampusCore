import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Announcement from "../../../../../network/announcement_api";

export default function FacultyCreatedAnnouncement() {
    let { offeredCourseId } = useParams()
    const [announcement, setAnnouncement] = useState([])

    useEffect(() => {
        async function getCreatedAnnouncement() {
            const response = await Announcement.getAnnouncementByCourse({ 'id': offeredCourseId })
            setAnnouncement(response.data)
            console.log(response)
        }

        getCreatedAnnouncement()

    }, [])
    return (

        announcement.map((data, index) => (
            <Stack key={index}>
                <Typography variant="subtitle1" className="!text-[13px] !tracking-wide" component={'h1'}> Title : {data.title} </Typography>
                <Stack className="mt-2 border border-gray-400 !h-26 overflow-y-auto" paddingX={3} >
                    <Typography fontSize={'small'} className="py-4"> {data.content} </Typography>
                </Stack>
                <Typography variant="subtitle2" className="!text-sm flex self-end"> Posted: {data.createdAt} </Typography>
            </Stack>
        ))
    )
}
