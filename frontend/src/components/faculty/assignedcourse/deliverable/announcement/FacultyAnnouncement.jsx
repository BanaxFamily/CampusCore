import { Alert, Button, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../../utils/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import * as Announcement from "../../../../../network/announcement_api"
import FacultyCreatedAnnouncement from "./FacultyCreatedAnnouncement";
import { useState } from "react";

export default function FacultyAnnouncement() {
    let { userId } = useAuth()
    let { offeredCourseId } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    async function createAnnouncement(data) {
        try {
            const response = await Announcement.addAnnouncement(data)

            if (response.isSuccess) {
                navigate(0)
                return
            }

            if (!response.ok) {
                setErrorMessage("Please check your inputs")
                return
            }

        } catch (error) {
            console.error(error)
            setError(true)
        }
    }
    return (
        <Stack className="w-full px-10 pt-4">
            {error && <Alert>Something went wrong try again later</Alert>}
            {errorMessage && <Alert>{errorMessage}</Alert>}
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

                    <Stack className=" px-10 mt-2">
                        <FacultyCreatedAnnouncement />
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    )
}
