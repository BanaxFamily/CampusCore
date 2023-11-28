import { Avatar, Button, Divider, Stack, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as AnnouncementApi from "../../network/announcement_api";

export default function Announcements() {
    const [allAnnouncement, setAllAnnouncement] = useState([])

    useEffect(() => {
        async function showAllAnnouncement() {
            try {
                const response = await AnnouncementApi.getAllAnnouncement()

                if (response.isSuccess) {
                    setAllAnnouncement(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
            }
        }
        showAllAnnouncement()
    }, [])


    return (
        allAnnouncement.map((announcement, index) => (
            <Stack key={index} paddingX={2} paddingY={2} className="w-full shadow-md border md:w-[70%] lg:w-[60%] mx-auto mt-4 rounded-lg">
                <Stack direction={"row"} paddingBottom={4} spacing={2}>
                    <Avatar />
                    <Stack direction={"column"} className="w-full md:w-[30%]" justifyContent={"between"}>
                        <Typography variant="h6" className="!text-md">
                            {" "}
                            {announcement.user.fullName}{" "}
                        </Typography>
                        <Typography className="!text-sm"> {announcement.createAt} </Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <Typography variant="h6" className="!text-md">
                        {" "}
                        {announcement.title}{" "}
                    </Typography>

                    <Stack className=" ml-2 rounded-md" paddingY={2} paddingX={3}>
                        <Typography fontSize={"small"}> {announcement.content} </Typography>
                    </Stack>
                </Stack>
                <Divider className="!border-y" />
                <Stack className="mt-2 !flex-row items-center gap-1">
                    <Stack className="w-full">
                        <TextareaAutosize className="w-full border px-2 !text-black bg-slate-100 rounded-lg" placeholder="Write a comment" style={{ resize: "none" }} minRows={2} />
                    </Stack>
                    <Button variant="contained" size="small">
                        Comment
                    </Button>
                </Stack>
            </Stack>
        ))

    )
}
