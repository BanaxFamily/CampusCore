import { ArrowLeftSharp, FileUpload, Folder } from "@mui/icons-material";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { Link, NavLink, useParams } from "react-router-dom";
import BackNav from "../../reusable/BackNav";
import styled from "@emotion/styled";
import { useState } from "react";

export default function Deliverables() {
    let { courseName } = useParams()
    const [file, setSelectedFile] = useState(null)

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    function selectFileUpload(event){
        setSelectedFile(event.target.files[0])
    }
    return (
        <>
            <Stack direction={'row'} justifyContent="space-between">
                <BackNav>
                    <Link to="../" className="text-gray-400 underline font-semibold underline-offset-4 pr-2">
                        <ArrowLeftSharp className="text-gray-400" />
                        Manage Deliverables Templates
                    </Link>
                    <NavLink activeclassname="active" className="text-gray-400 underline font-semibold underline-offset-4 pr-2">
                        <ArrowLeftSharp className="text-gray-400" />
                        {`${courseName} Deliverables`}
                    </NavLink>
                </BackNav>

                <Button className="flex self-end" variant="outlined"> Add <Folder /> </Button>
            </Stack>
            <Divider className="py-2" />

            <Stack className="border-2 w-full items-center mt-5 rounded-md shadow-md">
                <Stack className=" my-2 p-2 w-[35rem]" alignItems={'center'} direction={'row'} spacing={2}>
                    <Typography className="w-1/6 ">Title</Typography>
                    <TextField variant="outlined" size="small" className="w-[70%]" />
                </Stack>
                <Stack className=" my-2 p-2 w-[35rem]" alignItems={'center'} direction={'row'} spacing={2}>
                    <Typography className="w-1/6 ">Instructions</Typography>
                    <TextField variant="outlined" size="small" className="w-[70%]" />
                </Stack>
                <Stack className=" my-2 p-2 w-[35rem]" alignItems={'center'} direction={'row'} spacing={2}>
                    <Typography className="w-1/6 ">Resources</Typography>
                    <Button component="label" variant="contained" className="w-[70%]" startIcon={<FileUpload />}>
                        {file ? file.name: 'Upload file'}
                        <VisuallyHiddenInput type="file" onChange={selectFileUpload}/>
                    </Button>

                </Stack>
                <Stack className=" my-2 p-2 w-[35rem]" alignItems={'center'} direction={'row'} spacing={2}>
                    <Typography className="w-1/6 ">Due date</Typography>
                    <TextField variant="outlined" size="small" className="w-[70%]" />
                </Stack>
            </Stack>

        </>
    )
}
