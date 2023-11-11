import { Avatar, Stack, Typography } from "@mui/material";

export default function SettingWrapper() {
    return (
        <div className="border">
            <div className=" relative">
                <div className=" h-12" />
                <div className="bg-mainBlueColor h-12" />
                <div className="absolute top-4 right-3">

                    <Stack direction={"row"}>
                        <Typography className="  font-semibold tracking-wide pr-2">John Mark Abad</Typography>
                        <Stack direction={"column"}>
                            <Avatar alt="john mark" style={{ height: '60px', width: '60px' }} />

                            <span className="text-white text-xs flex justify-center  ">
                                Student
                            </span>
                        </Stack>
                    </Stack>
                </div>
            </div>

            <div>
                <div>
                    <form action="">
                    </form>
                </div>
            </div>
        </div>
    )
}
