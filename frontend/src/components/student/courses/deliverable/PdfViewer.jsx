/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Viewer, Worker } from "@react-pdf-viewer/core";

const PdfViewer = ({ fileBase64, fileType }) => {

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






