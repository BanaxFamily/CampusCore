import { Button, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../../utils/AuthContext";
import { useParams } from "react-router-dom";
import * as Announcement from "../../../../../network/announcement_api"
import FacultyCreatedAnnouncement from "./FacultyCreatedAnnouncement";

export default function FacultyAnnouncement() {
    let { userId } = useAuth()
    let { offeredCourseId } = useParams()
    const { register, handleSubmit } = useForm()

    async function createAnnouncement(data) {
        const response = await Announcement.addAnnouncement(data)
        console.log(response)
    }
    return (
        <Stack className="w-full px-10 pt-4">
            <Stack>
                <Typography variant="subtitle1" className="!text-black" >Announcements</Typography>
                <Stack className="mt-2 py-2 border border-black rounded-md md:px-8">
                    <form action="" onSubmit={handleSubmit(createAnnouncement)}>
                        <input type="text" name="userId" value={userId} {...register('userId', { required: "userId is required" })} hidden />
                        <input type="text" name="offeredCourseId" value={offeredCourseId} {...register('offeredCourseId', { required: "Id is required" })} hidden />
                        <Stack className="gap-2">
                            <Stack className="!flex-row">
                                <Typography variant="subtitle1" className="!text-[13px] !tracking-wide">Title :</Typography>
                                <TextField variant="standard" size="small" name="title" className="!px-2" {...register('title', { required: "Title is reqired" })} />
                            </Stack>
                            <Stack>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    className="border border-slate-500  rounded-md px-4 text-[14px]"
                                    placeholder="Announce something..."
                                    name="content"
                                    minRows={3} maxRows={6}
                                    style={{ resize: 'none' }}
                                    {...register('content', { required: "Announcement required" })}
                                />
                                <Button type="submit" className="flex self-end !mt-2" variant="outlined">post</Button>
                            </Stack>
                        </Stack>
                    </form>

                    <Stack className="px-10 mt-2">
                        <FacultyCreatedAnnouncement />
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    )
}
