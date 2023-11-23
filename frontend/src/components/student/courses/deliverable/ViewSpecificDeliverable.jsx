/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Divider, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Deliverable from "../../../../network/deliverable";
import * as Submission from "../../../../network/submission_api"
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import SpecificDeliverableAddSubmission from "./SpecificDeliverableAddSubmission";
import { useAuth } from "../../../../utils/AuthContext";
import { MoreHoriz } from "@mui/icons-material";

export default function ViewSpecificDeliverable() {
    let { courseId, deliverableName, deliverableId, courseDeliverabelId } = useParams()
    const { userId } = useAuth()
    const [deliverable, setDeliverable] = useState([])
    const [submittedFiles, setSubmittedFiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const breadCrumbUrl = [
        {
            url: '../../',
            name: 'List of offered courses',
        },
        {
            url: '../',
            name: `Submissions`
        },
        {
            name: `View`
        }
    ]

    useEffect(() => {
        async function getSpecificDeliverable() {
            try {
                const response = await Deliverable.getOneDeliverable({ 'id': deliverableId })
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
                "courseDeliverableId": courseDeliverabelId,
                "userId": userId,
                "offeredCourseId": courseId
            }
            try {
                const response = await Submission.getSubmissionList(data)
                if (response.isSuccess) {
                    setSubmittedFiles(response.data)
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
                <Stack className="w-3/4">

                    {loading && <LinearProgress />}
                    {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                    {
                        !loading && !error &&
                        <>
                            <SpecificDeliverableAddSubmission deliverable={deliverable} />
                        </>
                    }
                </Stack>
                <Stack className="border-5 border-red-400 w-1/2 overflow-hidden">
                    <Stack className="my-2">
                        <Typography variant="h6" className="!text-lg !font-semibold tracking-wide underline underline-offset-4">Submitted files</Typography>
                    </Stack>
                    <Stack className="">
                        {loading && <LinearProgress />}
                        {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                        {
                            !loading && !error &&
                            <Stack className="h-40 overflow-auto border-2 rounded-lg pt-4">
                                {
                                    submittedFiles.length > 0 ? (
                                        submittedFiles.map((data, index) => {
                                            return (
                                                <Stack key={index} className="gap-1 hover:bg-gray-300">
                                                    <Stack className=" w-full px-2 justify-between items-center !flex-row ">
                                                        <Typography className="!text-[14px] ">{data.title}</Typography>
                                                        <IconButton className="hover:!text-blue-500 hover:!rounded-none "><Typography variant="subtitle2">view</Typography><MoreHoriz /></IconButton>
                                                    </Stack>
                                                </Stack>
                                            )
                                        })
                                    ) : (<Alert severity="info">No submissions yet</Alert>)
                                }
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
