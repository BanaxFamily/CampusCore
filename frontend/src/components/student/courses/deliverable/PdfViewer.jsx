/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Stack } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useEffect } from "react";

const PdfViewer = ({ fileBase64, fileType, showAllSubmissions, allSubmittedVersions }) => {
    useEffect(() => { console.log(allSubmittedVersions) }, [])
    return (
        <>

            {!showAllSubmissions && fileType === 'pdf' && (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={`data:application/pdf;base64,${fileBase64}`} />
                </Worker>)
                //  : (<img src={`data:application/jpeg;base64,${fileBase64}`} alt="Image" />)
            }
            {showAllSubmissions && allSubmittedVersions.map((version, index) => (
                <Stack key={index} className="hover:bg-slate-400 px-2 py-1 hover:!text-white cursor-pointer rounded-md">
                    <Stack className="!flex-row justify-between">
                        <span className="!text-md">{version.fileType}</span>
                        <span className="!text-md">{new Date(version.dateSubmitted).toLocaleDateString()}</span>
                    </Stack>
                    <Divider />
                </Stack>
            ))
            }
        </>
    );
};
export default PdfViewer;






