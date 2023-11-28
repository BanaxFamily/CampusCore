/* eslint-disable react-hooks/exhaustive-deps */
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
                <Typography variant="subtitle1" className="!text-[13px] !tracking-wide !font-bold" component={'h1'}> {data.title} </Typography>
                <Stack className="mt-2 border rounded-md border-gray-400 !h-26 overflow-y-auto" paddingX={3} >
                    <Typography fontSize={'small'} className="py-4"> {data.content} </Typography>
                </Stack>
                <Typography variant="subtitle2" className="!text-sm flex self-end"> Posted: {new Date(data.createdAt).toLocaleString()} </Typography>
            </Stack>
        ))
    )
}
