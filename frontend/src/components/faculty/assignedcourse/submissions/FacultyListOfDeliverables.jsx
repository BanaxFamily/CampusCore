/* eslint-disable react/prop-types */
import { ExpandLess, ExpandMore, MoreHoriz } from "@mui/icons-material";
import { Collapse, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function FacultyListOfDeliverables({ data }) {
    // const { userId } = useAuth()
    // let { offeredCourseId } = useParams()
    const navigate = useNavigate()
    const [isCollapsed, setIsCollapsed] = useState(false);
    // const [studentGroupId, setStudentGroupId] = useState(null)

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    async function viewDeliverable(deliverableTitle, deliverableId, offeredCourseDeliverableId) {
        navigate(`deliverable/${deliverableTitle}/${deliverableId}/${offeredCourseDeliverableId}`)
    }

    return (
        <>
            <Stack onClick={handleToggleCollapse} className="!flex-row justify-between">
                <Typography fontSize={'small'} className={`${isCollapsed ? '!text-black' : ''}  !font-semibold pr-2`}>
                    Deliverables
                </Typography>
                {isCollapsed ? <ExpandLess /> : <ExpandMore />}
            </Stack>
            <Collapse in={isCollapsed}>
                {data.map((info, index) => (
                    <Stack key={index} className="px-4 rounded-t-md group">
                        <Stack className="w-full mx-auto">
                            <Stack direction={'row'} className="items-center">
                                <Stack className="w-full">
                                    <Typography className="!font-medium !text-[14px] !text-black">{info.deliverableTitle}</Typography>
                                </Stack>
                                <Stack>
                                    <IconButton onClick={() => viewDeliverable(info.deliverableTitle, info.deliverableId, info.offeredCourseDeliverableId)} className="!rounded-none group-hover:hover:text-blue-300">
                                        <Typography className="!text-sm pr-2">view </Typography><MoreHoriz />
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <Divider className="!bg-black" />
                        </Stack>
                    </Stack>
                ))}
            </Collapse>
        </>
    );
}
