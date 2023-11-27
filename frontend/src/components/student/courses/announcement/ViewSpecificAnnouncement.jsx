import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";

export default function ViewSpecificAnnouncement() {
    const breadCrumbUrl = [
        {
            url: '../../',
            name: 'Enrolled courses',
        },
        {
            url: '../',
            name: `Information`
        },
        {
            name: `View`
        }
    ]

    return (
        <Stack>
            <BackNav>
                <BreadCrumb data={breadCrumbUrl} />
            </BackNav>
            <Stack className="my-4">
                <Divider className="!bg-black" />
            </Stack>
            <DashBoardHeading title={`Announcement details`} />

            <Stack paddingX={2} paddingY={2} className="w-full border md:w-[70%] lg:w-[60%] mx-auto mt-4 rounded-lg">
                <Stack direction={'row'} paddingBottom={4} spacing={2}>
                    <Avatar />
                    <Stack direction={'column'} className="w-full md:w-[30%]" justifyContent={'between'}>
                        <Typography variant="h6"    className="!text-md"> User full name </Typography>
                        <Typography className="!text-sm"> Date posted </Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <Typography variant="h6"  className="!text-md"> Announcement Title </Typography>

                    <Stack className="mt-4 ml-6 border border-gray-400 rounded-md" paddingY={2} paddingX={3}>
                        <Typography fontSize={'small'}> Announcement Desccription </Typography>
                    </Stack>
                </Stack>

                <Stack className="mt-2">
                    <Button className="flex self-end !text-green-600 !border-green-600" variant="outlined" size="small">Comment</Button>
                </Stack>
            </Stack>
        </Stack >
    )
}
