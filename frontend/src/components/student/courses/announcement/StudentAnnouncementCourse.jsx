/* eslint-disable react-hooks/exhaustive-deps */
import { ExpandLess, ExpandMore, MoreHoriz } from "@mui/icons-material";
import { Alert, Collapse, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as AnnouncementApi from "../../../../network/announcement_api"
import { NavLink, useParams } from "react-router-dom";
export default function StudentAnnouncementCourse() {
    let { offeredCourseId } = useParams()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [announcement, setAnnouncement] = useState([])
    const [error, setError] = useState(false)
    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        async function showAnnouncementByCourse() {
            try {
                const response = await AnnouncementApi.getAnnouncementByCourse({ "id": offeredCourseId })

                if (response.isSuccess) {
                    setAnnouncement(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
                setError(true)
            }
        }
        showAnnouncementByCourse()
    }, [])

    return (
        <Stack>
            <Stack onClick={handleToggleCollapse} className="!flex-row justify-between">
                <Typography fontSize={'small'} className={`${isCollapsed ? '!text-black' : ''}  !font-semibold pr-2`}>
                    Announcements
                </Typography>
                {isCollapsed ? <ExpandLess /> : <ExpandMore />}
            </Stack>
            <Collapse in={isCollapsed}>
                {error && <Alert>Something went wrong try again later</Alert>}
                {announcement.map((info, index) => (
                    <Stack key={index} className="px-4 rounded-t-md group">
                        <Stack className="w-full mx-auto">
                            <Stack direction={'row'} className="items-center">
                                <Stack className="w-full">
                                    <Typography className="!font-medium !text-[14px] !text-black">{info.title}</Typography>
                                    {/* <Typography className="!text-sm">{info.deliverableDescription}</Typography> */}
                                </Stack>
                                <Stack>
                                    <NavLink to={`announcements/view/${info.id}`}>
                                        <IconButton className="!rounded-none group-hover:hover:text-blue-300">
                                            <Typography className="!text-sm pr-2">view </Typography><MoreHoriz />
                                        </IconButton>
                                    </NavLink>
                                </Stack>
                            </Stack>
                            <Divider className="!bg-black" />
                        </Stack>
                    </Stack>
                ))}
            </Collapse>
        </Stack>
    )
}
