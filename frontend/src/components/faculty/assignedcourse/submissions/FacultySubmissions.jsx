/* eslint-disable react/prop-types */
import { MoreHoriz } from '@mui/icons-material'
import { Divider, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function FacultySubmissions({submittedFiles}) {
    return (
        <>
            <Stack className="bg-blue-400">
                <Typography className="!pl-2 !text-[14px] !text-white !font-bold">Latest submitted file</Typography>
            </Stack>

            {
                submittedFiles.map((data, index) => {
                    return (
                        <Stack key={index} className="gap-1 bg-slate-100 hover:text-blue-400">
                            <Stack className=" w-full px-4 justify-between items-center !flex-row ">
                                <Typography className="!text-[14px] ">{data.title}</Typography>
                                <NavLink to={`${data.submissionId}`} className="!flex mt-1 hover:!text-blue-500 hover:!rounded-none ">
                                    {/* <Typography variant="subtitle2">view</Typography> */}
                                    <MoreHoriz />
                                </NavLink>
                            </Stack>
                            <Divider />
                        </Stack>
                    )
                })
            }
        </>
    )
}
