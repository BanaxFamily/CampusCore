import { Stack, Typography } from "@mui/material";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Link, NavLink } from "react-router-dom";
import sampleFile from '../../../../documents/sample.pdf';
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import BackNav from "./BackNav";
import { ArrowLeftSharp } from "@mui/icons-material";


export default function View() {
    return (
        <>
            <BackNav>
                <Link to="/courses/submission" className="text-blue-400 underline underline-offset-3 pr-2">
                    <ArrowLeftSharp className="text-blue-400" />
                    Submission
                </Link>
                <NavLink activeclassname="active" className="text-blue-400 underline underline-offset-3 pr-2">
                    <ArrowLeftSharp className="text-blue-400" />
                    View
                </NavLink>
            </BackNav>
            <div className="mt-4">

                <DashBoardHeading classname="!py-6" desc="For approval file" title="" />

                <Stack className="mt-2">
                    <Typography variant="h6" component="h1" className="text-center">Final Version</Typography>
                </Stack>
                <div className="w-full h-[650px]">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={sampleFile} />
                    </Worker>
                </div>
            </div>
        </>
    )
}
