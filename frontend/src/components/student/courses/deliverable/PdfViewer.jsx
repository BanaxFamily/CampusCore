/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider, Stack, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as RepoApi from "../../../../network/publicresearchrepo_api"
import { AiFillSafetyCertificate } from "react-icons/ai";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";

const PdfViewer = ({ fileBase64, fileType, showAllSubmissions, allSubmittedVersions }) => {
    let { researchId } = useParams()
    const [files, setFiles] = useState([])
    const [filesBase64MB, setFileBase64] = useState([])
    const breadCrumbUrl = [
        { url: '../', name: 'Repository', },
        { name: 'View Published Repo', }
    ]
    useEffect(() => {
        async function getOnePublished() {
            const response = await RepoApi.getOnePublished({ "id": researchId })
            setFiles(response.data)
            setFileBase64(response.data.fileB64)
        }
        getOnePublished()
    }, [])
    return (
        <>
            <Stack className="w-full h-[500px] overflow-y-auto gap-2">

                {!showAllSubmissions && fileType === 'pdf' ? (
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={`data:application/pdf;base64,${fileBase64}`} />
                    </Worker>) : (<img src={`data:application/png;base64,${fileBase64}`} alt="Image" />)
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

                {researchId &&
                    <>
                        <Stack className="gap-4">
                            <span className="px-4">
                                <BackNav>
                                    <BreadCrumb data={breadCrumbUrl} />
                                </BackNav>
                            </span>
                            <Divider />
                        </Stack>
                        <Stack className="w-3/4  mt-4 mx-auto">
                            <Stack className="gap-4">
                                <Stack className="!flex-row justify-between w-[85%]">
                                    <Typography><span className="font-bold">Title :</span>&nbsp;<span className="underline underline-offset-4">{files.title}</span></Typography>
                                    <Typography><span className="font-bold">Author(s) :</span>&nbsp;<span className="underline underline-offset-4">{files.authors}</span></Typography>
                                </Stack>
                                <Stack className="!flex-row justify-between w-[85%]">
                                    <Typography><span className="font-bold">Author(s) :</span>&nbsp;<span className="underline underline-offset-4">{files.authors}</span></Typography>
                                    <Button>Approval Certifcates<AiFillSafetyCertificate /> </Button>
                                </Stack>
                            </Stack>
                            <Divider />

                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                                <Viewer fileUrl={`data:application/pdf;base64,${filesBase64MB}`} />
                            </Worker>
                        </Stack>

                    </>
                }
            </Stack>
        </>
    );
};
export default PdfViewer;






