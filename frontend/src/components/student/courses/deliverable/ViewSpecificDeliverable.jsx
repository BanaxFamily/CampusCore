/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as OfferedCourseDeliverable from "../../../../network/offeredCourseDeliverable_api";
import * as Submission from "../../../../network/submission_api";
import { useAuth } from "../../../../utils/AuthContext";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
// import PdfViewer from "./PdfViewer";
import PdfViewer from "./PdfViewer";
import SpecificDeliverableAddSubmission from "./SpecificDeliverableAddSubmission";

export default function ViewSpecificDeliverable() {
    let { deliverableName, offeredCourseDeliverableId } = useParams()
    const { userId } = useAuth()
    const [deliverable, setDeliverable] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [submittedFiles, setSubmittedFiles] = useState([])
    const [submissionIdState, setSubmissionIdState] = useState([])
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
                "userId": userId,
                "offeredDeliverableId": offeredCourseDeliverableId
            }
            try {
                const response = await Submission.getSubmissionList(data)
                if (response.isSuccess) {
                    setSubmittedFiles(response.data)
                    setSubmissionIdState(response.data[0].submissionId)
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
            <DashBoardHeading title={` ${deliverableName} `} />

            <Stack className="w-full border-2 " direction={'row'}>
                <Stack className="w-4/6 px-10 border-r-2">

                    {loading && <LinearProgress />}
                    {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                    {
                        !loading && !error &&
                        <>
                            <SpecificDeliverableAddSubmission deliverable={deliverable} />

                        </>
                    }
                    <Stack className="w-full h-[500px] gap-2">
                        <Typography className="!text-lg">Latest submitted file</Typography>
                        <PdfViewer submissionId={submissionIdState} />
                    </Stack>
                </Stack>

            </Stack>
        </Stack >
    )
}
