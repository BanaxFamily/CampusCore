/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Button, Divider, LinearProgress, Stack, Typography } from "@mui/material";
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
import * as SubmissionApi from "../../../../network/submission_api";
import Issues from "../../issues/Issues";
import * as IssueApi from "../../../../network/issue_api"


export default function ViewSpecificDeliverable() {
    let { deliverableName, offeredCourseDeliverableId } = useParams()
    const { userId } = useAuth()
    const [deliverable, setDeliverable] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [submittedFiles, setSubmittedFiles] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [submissionId, setSubmissionId] = useState(null)
    const [allIssues, setAllIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [fileBase64, setFileBase64] = useState(null)
    const [fileType, setFileType] = useState(null)
    const [error, setError] = useState(false)
    const [showAllSubmissions, setShowAllSubmission] = useState(false)
    const [allSubmittedVersions, setAllSubmittedVersions] = useState(false)
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
                    if (response.data.length > 0) {
                        setSubmittedFiles(response.data)
                        setSubmissionId(response.data[0].submissionId)
                        // Get the base64 file or image
                        const file = await SubmissionApi.getLatestVerionOfFile({ "id": response.data[0].submissionId })
                        setFileBase64(file.data.fileB64)
                        setFileType(file.data.fileType)

                        const issues = await IssueApi.getAllIssue({
                            "submissionId": response.data[0].submissionId,
                            "filter": "open"
                        })
                        setAllIssues(issues.data)
                        return
                    }
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

    async function getAllSubmittedVersions() {
        try {
            const response = await SubmissionApi.getAllSubmissionVersions({ 'id': submissionId })
            setAllSubmittedVersions(response.data)
        } catch (error) {
            console.error(error)
        }
        setShowAllSubmission(!showAllSubmissions)
    }
    return (
        <Stack className="h-full">
            <BackNav>
                <BreadCrumb data={breadCrumbUrl} />
            </BackNav>
            <Stack className="my-4">
                <Divider className="!bg-black" />
            </Stack>
            <DashBoardHeading title={` ${deliverableName} `} />

            <Stack className="w-full border-x-2  !flex-col-reverse md:!flex-row" >
                <Stack className="md:w-4/6 px-10 border-r-2">

                    {loading && <LinearProgress />}
                    {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                    {
                        !loading && !error &&
                        <>
                            <SpecificDeliverableAddSubmission deliverable={deliverable} />

                        </>
                    }
                    {/* <Stack className="w-full h-[500px] overflow-y-auto gap-2"> */}
                    <Stack className="!flex-row w-full justify-between ">
                        <Typography className="!text-lg">Latest submitted file</Typography>
                        <Button size="small" onClick={getAllSubmittedVersions} className="!text-sm"> submission history</Button>
                    </Stack>
                    {!showAllSubmissions && <PdfViewer showAllSubmissions={showAllSubmissions} fileBase64={fileBase64} fileType={fileType} />}
                    {showAllSubmissions && <PdfViewer showAllSubmissions={showAllSubmissions} allSubmittedVersions={allSubmittedVersions} />}
                    {/* </Stack> */}
                </Stack>
                <Stack className="px-4 pt-2 flex-grow">
                    {/* Show all issues */}
                    <Issues submissionId={submissionId} issues={allIssues} />
                </Stack>

            </Stack>
        </Stack >
    )
}
