/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Send } from "@mui/icons-material";
import { Alert, Avatar, Button, Divider, Stack, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
import * as AnnounceComment from "../../network/announcementComment_api";
import * as AnnouncementApi from "../../network/announcement_api";
import { useAuth } from "../../utils/AuthContext";


const CommentWithLimit = ({ comment }) => {
    const wordLimit = 20; // Set your desired word limit
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    const renderContent = () => {
        const words = comment.content.split(' ');

        if (isExpanded || words.length <= wordLimit) {
            return comment.content;
        } else {
            const truncatedContent = words.slice(0, wordLimit).join(' ');
            return (
                <>
                    {truncatedContent}{' '}
                    <span
                        onClick={toggleContent}
                        className="cursor-pointer text-blue-500"
                    >
                        See more
                    </span>
                </>
            );
        }
    };

    return (
        <Stack key={comment.id} className="my-2 !flex-row items-center gap-1">
            <Stack className="w-full">
                <Stack className="w-full border px-4 py-2 !text-[14px] bg-slate-100 rounded-xl">
                    <Typography variant="subtitle1" className="!text-[12px] !font-bold !text-gray-700  !tracking-wider">
                        {comment.userFullName}
                    </Typography>
                    <Typography variant="subtitle2" >
                        {renderContent()}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default function AllAnnouncement() {

    const { userId } = useAuth()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [specificAnnouncement, setSpecificAnnouncement] = useState([]);
    const [specificComment, setSpecificComment] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function showAnnouncementByUser() {
            try {
                const responseAnnouncement = await AnnouncementApi.getAnnouncementByStudent({ id: userId });
                if (responseAnnouncement.isSuccess) {
                    setSpecificAnnouncement(responseAnnouncement.data);
                    const responseComments = await AnnounceComment.viewAnnouncementComments({ id: responseAnnouncement.data[0].announcmentId });
                    if(responseComments.isSuccess){
                        setSpecificComment(responseComments.data);
                    }
                    return;
                }
            } catch (error) {
                console.error(error);
                setError(true);
            }
        }
        showAnnouncementByUser();
    }, []);


    async function createComment(data) {
        try {
            const response = await AnnounceComment.addAnnouncementComment(data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    const renderComments = () => {
        return specificComment.map((comment) => (
            <CommentWithLimit key={comment.id} comment={comment} />
        ));
    };

    return (
        <Stack className="2xl:w-3/4 2xl:mx-auto">
            {error && <Alert>Something went wrong, try again later</Alert>}

            {/* Populating the data from specific course */}
            {specificAnnouncement.map((announcement) => (
                <Stack key={announcement.announcmentId} paddingX={2} paddingY={2} className="w-full shadow-md border md:w-[70%] lg:w-[60%] mx-auto mt-4 rounded-xl">
                    <Stack direction={"row"} paddingBottom={4} spacing={2}>
                        <Avatar />
                        <Stack direction={"column"} className="w-full md:w-[30%]" justifyContent={"between"}>
                            <Typography variant="h6" className="!text-md !text-gray-700 !font-semibold tracking-wider">
                                {" "}
                                {announcement.posterName}{" "}
                            </Typography>
                            {/* <Typography className="!text-sm"> {announcement.createAt} </Typography> */}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography variant="h6" className="!text-md">
                            {" "}
                            {announcement.announcementTitle}{" "}
                        </Typography>

                        <Stack className=" ml-2 rounded-md" paddingY={2} paddingX={3}>
                            <Typography fontSize={"small"}> {announcement.announcementContent} </Typography>
                        </Stack>
                    </Stack>
                    <Divider className="!border-y" />
                    {/* Annoucement comments */}
                    {renderComments()}

                    {/* Add Comments */}
                    <Divider className="!border-y" />
                    <form action="" onSubmit={handleSubmit(createComment)}>
                        <input type="text" name="announcementId" value={announcement.announcmentId} hidden {...register("announcementId", { required: "ID is required" })} />
                        <input type="text" name="userId" value={userId} hidden {...register("userId", { required: "ID is required" })} />
                        <Stack className="mt-2 !flex-row items-center gap-1">
                            <Stack className="!flex-row w-full gap-2 items-center relative">
                                <TextareaAutosize className="w-full border px-2 focus:py-2 pr-20 !text-[14px] !text-black bg-slate-100 rounded-xl" placeholder="Write a comment" name="content" style={{ resize: "none" }} minRows={2} {...register('content', { required: "This is reqruied" })} />
                                <Button type="submit" disabled={isSubmitting} variant="contained" size="small" className="!absolute w-[8%] bottom-3 right-1 h-6">
                                    <Send fontSize="small" />
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Stack>
            ))}
        </Stack>
    );
}
