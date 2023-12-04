/* eslint-disable react-hooks/exhaustive-deps */
import { MoreHoriz } from "@mui/icons-material";
import { Alert, Button, Divider, LinearProgress, Stack, Typography } from "@mui/material";
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
    const [deliverable, setDeliverable] = useState([])
    const [submittedFiles, setSubmittedFiles] = useState([])
    const [latestVersion, setLatestVersion] = useState([])
    const [showSubmissionHistory, setShowSubmissionHistory] = useState(false)
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
                if (response.isSuccess) {
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
                    setLatestVersion(response.data[response.data.length - 1])
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
                        {loading && <LinearProgress color="inherit" />}
                        {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                        {
                            !loading && !error &&
                            <Stack className=" max-h-100px overflow-auto border-2 rounded-lg">
                                {/* Latest Version */}
                                <Typography className="!pl-2 !text-[14px] !font-bold">Latest submitted file</Typography>
                                <Stack className="gap-1 hover:bg-gray-300 pl-4">
                                    <Stack className=" w-full px-2 justify-between items-center !flex-row ">
                                        <Typography className="!text-[14px] ">{latestVersion.title}</Typography>
                                        <NavLink to={`${latestVersion.submissionId}`} className="!flex mt-1 border border-blue-500 rounded-md px-2 rounded-mg !text-blue-500  ">
                                            <Typography variant="subtitle2">view</Typography>
                                            <MoreHoriz />
                                        </NavLink>
                                    </Stack>
                                    <Divider />
                                </Stack>


                                {/* Show submitted files history */}
                                <Button onClick={() => setShowSubmissionHistory(!showSubmissionHistory)} className="!my-2 !flex self-end" variant="outlined" size="small">Show Submission history</Button>
                                {showSubmissionHistory &&
                                    <>
                                        <Stack className="bg-blue-400">
                                            <Typography className="!pl-2 !text-[14px] !text-white !font-bold">Latest submitted file</Typography>
                                        </Stack>
                                        {
                                            submittedFiles.map((data, index) => {
                                                return (
                                                    <Stack key={index} className="gap-1 hover:bg-gray-300">
                                                        <Stack className=" w-full pl-4 justify-between items-center !flex-row ">
                                                            <Typography className="!text-[14px] ">{data.title}</Typography>
                                                            <NavLink to={`${data.submissionId}`} className="!flex mt-1 hover:!text-blue-500 hover:!rounded-none ">
                                                                <Typography variant="subtitle2">view</Typography>
                                                                <MoreHoriz />
                                                            </NavLink>
                                                        </Stack>
                                                        <Divider />
                                                    </Stack>
                                                )
                                            })
                                        }
                                    </>
                                }
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    )
}
