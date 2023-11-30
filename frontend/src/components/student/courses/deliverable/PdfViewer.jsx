import { ZoomIn, ZoomOut } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useParams } from "react-router-dom";
import DashBoardHeading from "../../../reusable/DashBoardHeading";

const PdfViewer = () => {
    let { filePath } = useParams()
    // Create a URL representing the file content
    // const fileUrl = URL.createObjectURL(file);

    return (
        <>
            <div className="mt-4">

                <DashBoardHeading classname="!py-6" desc="For approval file" title="" />

                <Stack className="mt-2">
                    <Typography variant="h6" component="h1" className="text-center">Final Version</Typography>
                </Stack>
                <div className="flex justify-end">
                    <Button><ZoomIn /></Button>
                    <Button><ZoomOut /></Button>
                </div>
                <div className="w-full h-[500px]">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={filePath} />
                    </Worker>
                </div>
            </div>
        </>
    );
};
export default PdfViewer;