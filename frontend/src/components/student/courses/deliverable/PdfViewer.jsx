import { ZoomIn, ZoomOut } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useParams } from "react-router-dom";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import * as SubmissionApi from "../../../../network/submission_api"
import { useEffect, useState } from "react";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";

const PdfViewer = () => {
    let { submissionId } = useParams()
    const [fileBase64, setFileBase64] = useState(null)
    const [fileType, setFileType] = useState(null)
    const breadCrumbUrl = [
        {
            url: '../../../',
            name: 'Enrolled courses',
        },
        {
            url: '../../',
            name: `Information`
        },
        {
            url: '../',
            name: `View`
        },
        {
            name: "File"
        }
    ]

    useEffect(() => {
        async function showAllSubmittedFiles() {

            const response = await SubmissionApi.getAllSubmissionVersions({ "id": submissionId })
            setFileBase64(response.data[0].fileB64)
            setFileType(response.data[0].fileType)
        }
        showAllSubmittedFiles()
    }, [])

    return (
        <>

            <BackNav>
                <BreadCrumb data={breadCrumbUrl} />
            </BackNav>
            <div className="mt-4 px-10">

                <DashBoardHeading classname="!py-6" title="For approval file" desc="" />

                <Stack className="mt-2">
                    <Typography variant="h6" component="h1" className="text-center">Final Version</Typography>
                </Stack>
                <div className="flex justify-end">
                    <Button><ZoomIn /></Button>
                    <Button><ZoomOut /></Button>
                </div>
                <div className="w-full h-[500px]">
                    {/* <iframe
                        title="PDF Viewer"
                        width="100%"
                        height="500px"
                        src={`data:application/pdf;base64,${fileBase64}`}
                        frameBorder="0"
                        allowFullScreen
                    /> */}
                    {
                        fileType === 'pdf' ? (
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                                <Viewer fileUrl={`data:application/pdf;base64,${fileBase64}`} />
                            </Worker>) : <img alt="Your Image" src={`data:image/png;base64,${fileBase64}`} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                    }
                </div>
            </div>
        </>
    );
};
export default PdfViewer;