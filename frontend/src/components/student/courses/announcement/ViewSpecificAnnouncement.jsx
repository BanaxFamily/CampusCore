/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Avatar, Button, Divider, Stack, TextareaAutosize, Typography } from "@mui/material";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as AnnouncementApi from "../../../../network/announcement_api";
import * as AnnounceComment from "../../../../network/announcementComment_api";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../utils/AuthContext";

export default function ViewSpecificAnnouncement() {

    const { userId } = useAuth()
    let { announcementId } = useParams();

    const [specificAnnouncement, setSpecificAnnouncement] = useState([]);
    const [error, setError] = useState(false);
    const breadCrumbUrl = [
        {
            url: "../../",
            name: "Enrolled courses",
        },
        {
            url: "../",
            name: `Information`,
        },
        {
            name: `View`,
        },
    ];

    useEffect(() => {
        async function showSpecificCourse() {
            try {
                const response = await AnnouncementApi.getSpecificCourse({ id: announcementId });

                console.log(response.data);
                if (response.isSuccess) {
                    setSpecificAnnouncement(response.data);
                    return;
                }
            } catch (error) {
                console.error(error);
                setError(true);
            }
        }
        showSpecificCourse();
    }, []);


    async function createComment(data){
        try {
            const response = await AnnounceComment.addAnnouncementComment(data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Stack>
            <BackNav>
                <BreadCrumb data={breadCrumbUrl} />
            </BackNav>
            <Stack className="my-4">
                <Divider className="!bg-black" />
            </Stack>
            <DashBoardHeading title={`Announcement details`} />
            {error && <Alert>Something went wrong, try again later</Alert>}

            {/* Populating the data from specific course */}
            {specificAnnouncement.map((announcement, index) => (
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
                    <form action="" onSubmit={handleSubmit(createComment)}>
                        <input type="text" name="announcementId" value={announcementId} hidden {...register("announcementId", { required: "ID is required" })} />
                        <input type="text" name="userId" value={userId} hidden {...register("userId", { required: "ID is required" })} />
                        <Stack className="mt-2 !flex-row items-center gap-1">
                            <Stack className="w-full">
  
                            </Stack>
                            <Button type="submit" variant="contained" size="small">
                                Comment
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            ))}
        </Stack>
    );
}
