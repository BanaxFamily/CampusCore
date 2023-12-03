/* eslint-disable react-hooks/exhaustive-deps */
import { MoreHoriz } from "@mui/icons-material";
import { Alert, CircularProgress, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import * as OfferedCourseDeliverable from "../../../../network/offeredCourseDeliverable_api";
import * as Submission from "../../../../network/submission_api";
import { useAuth } from "../../../../utils/AuthContext";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
// import PdfViewer from "./PdfViewer";
import SpecificDeliverableAddSubmission from "./SpecificDeliverableAddSubmission";

export default function ViewSpecificDeliverable() {
    let { deliverableName, offeredCourseDeliverableId } = useParams()
    const { userId } = useAuth()
    // const navigate = useNavigate()
    const [deliverable, setDeliverable] = useState([])
    // const [openSubmission, setOpenSubmission] = useState(false);

    // const [pdfFile, setPdfFile] = useState(null);
    const [submittedFiles, setSubmittedFiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const breadCrumbUrl = [
        {
            url: '../../',
            name: 'Enrolled courses',
        },
        {
            url: '../',
            name: `Information`
        },
        {
            name: `View`
        }
    ]

    useEffect(() => {
        async function getSpecificDeliverable() {
            try {
                const response = await OfferedCourseDeliverable.getSingleOfferedCourseDeliverable({ 'id': offeredCourseDeliverableId })
                if (response.isSuccess ) {
                    setDeliverable(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        async function getSubmittedFiles() {

            const data = {
                "id": userId,
            }
            try {
                const response = await Submission.getSubmissionList(data)
                if (response.isSuccess) {
                    setSubmittedFiles(response.data)
                    console.log(response.data)
                    return
                }
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        getSubmittedFiles()
        getSpecificDeliverable()
    }, [])
    return (
        <Stack>
            <BackNav>
                <BreadCrumb data={breadCrumbUrl} />
            </BackNav>
            <Stack className="my-4">
                <Divider className="!bg-black" />
            </Stack>
            <DashBoardHeading title={`Viewing ${deliverableName} details`} />

            <Stack className="w-full border-2 " direction={'row'}>
                <Stack className="w-4/6 border-r-2">

                    {loading && <LinearProgress />}
                    {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                    {
                        !loading && !error &&
                        <>
                            <SpecificDeliverableAddSubmission deliverable={deliverable} />

                        </>
                    }
                </Stack>
                <Stack className="w-1/2 px-1 overflow-hidden">
                    <Stack className="my-2">
                        <Typography variant="h6" className="!text-lg !font-semibold tracking-wide underline underline-offset-4">Submitted files</Typography>
                    </Stack>
                    <Stack>
                        {loading && <CircularProgress color="inherit" />}
                        {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                        {
                            !loading && !error &&
                            <Stack className="h-40 overflow-auto border-2 rounded-lg pt-4">
                                {
                                    // submittedFiles.length > 0 ? (
                                        submittedFiles.map((data, index) => {
                                            return (
                                                <Stack key={index} className="gap-1 hover:bg-gray-300">
                                                    <Stack className=" w-full px-2 justify-between items-center !flex-row ">
                                                        <Typography className="!text-[14px] ">{data.title}</Typography>
                                                        <NavLink to={`${data.file}`} className="hover:!text-blue-500 hover:!rounded-none "><Typography variant="subtitle2">view</Typography><MoreHoriz /></NavLink>
                                                        {/* ERROR : FILE IS DISPLAYING */}
                                                    </Stack>
                                                </Stack>
                                            )
                                        })
                                    // ) : (<Alert severity="info">No submissions yet</Alert>)
                                }
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    )
}
