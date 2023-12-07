/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useEffect, useState } from "react";
import * as SubmissionApi from "../../../../network/submission_api";

const PdfViewer = ({ submissionId }) => {
    const [fileBase64, setFileBase64] = useState(null)
    const [fileType, setFileType] = useState(null)

    useEffect(() => {
        async function showAllSubmittedFiles() {

            const response = await SubmissionApi.getLatestVerionOfFile({ "id": submissionId })
            setFileBase64(response.data.fileB64)
            setFileType(response.data.fileType)
        }
        showAllSubmittedFiles()
    }, [])

    return (
        <>

            {
                fileType === 'pdf' ? (
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={`data:application/pdf;base64,${fileBase64}`} />
                    </Worker>) : <img alt="Your Image" src={`data:image/png;base64,${fileBase64}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            }
        </>
    );
};
export default PdfViewer;






