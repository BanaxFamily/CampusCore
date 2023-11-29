/* eslint-disable react/prop-types */
import { ExpandLess, ExpandMore, MoreHoriz } from "@mui/icons-material";
import { Collapse, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ListOfDeliverables({ data, groupId }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <Stack onClick={handleToggleCollapse} className="!flex-row justify-between">
                <Typography fontSize={'small'} className={`${isCollapsed ? '!text-black':''}  !font-semibold pr-2`}>
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
                                    {/* <Typography className="!text-sm">{info.deliverableDescription}</Typography> */}
                                </Stack>
                                <Stack>
                                    <NavLink to={`deliverable/${info.deliverableTitle}/${info.deliverableId}/${info.offeredCourseDeliverableId}/group/${groupId}`}>
                                        <IconButton className="!rounded-none group-hover:hover:text-blue-300">
                                            <Typography  className="!text-sm pr-2">view </Typography><MoreHoriz />
                                        </IconButton>
                                    </NavLink>
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
