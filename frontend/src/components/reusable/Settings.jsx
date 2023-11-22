/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from "@mui/material";

export default function Settings({children}) {
    return (
        <section>
            <div className="border">
                <div className=" relative">
                    <div className=" h-20" />
                    <div className="bg-mainBlueColor h-20 " />
                    <div className="absolute top-6 right-3">

                        <Stack direction={"row"}>
                            <Typography className="  font-semibold tracking-wide pr-2" variant="h5">John Mark Abad</Typography>
                            <Stack direction={"column"}>
                                <Avatar alt="john mark" style={{ height: '90px', width: '90px' }} />

                                <span className="text-white text-sm mt-2 uppercase flex justify-center  ">
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

            <div className="flex">
                {children}
            </div>
        </section>
    )
}
