import { MoreHoriz } from "@mui/icons-material";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function ListOfDeliverables({ data }) {
    return (
        data.map((info, index) => (
            <Stack key={index} className="px-4 rounded-t-md group">
                <Stack className="w-full mx-auto">
                    <Stack direction={'row'} className="items-center">
                        <Stack className="w-full">
                            <Typography className="!font-bold !text-xl !text-black">{info.deliverable.name}</Typography>
                            <Typography fontSize={'small'}>{info.deliverable.description}</Typography>
                        </Stack>
                        <Stack>
                            <NavLink to={`view/${info.deliverable.name}/${info.deliverable.id}/${info.id}`}>
                                <IconButton className="!rounded-none group-hover:hover:text-blue-300">
                                    <Typography fontSize={'small'} className="pr-2">View </Typography><MoreHoriz />
                                </IconButton>
                            </NavLink>
                        </Stack>
                    </Stack>
                    <Divider className="!bg-black" />
                </Stack>
            </Stack>
        ))
    )
}
