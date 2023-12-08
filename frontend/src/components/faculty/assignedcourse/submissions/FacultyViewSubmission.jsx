/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Submission from "../../../../network/submission_api";
// import PdfViewer from "./PdfViewer";
import * as IssueApi from "../../../../network/issue_api";
import * as SubmissionApi from "../../../../network/submission_api";
import { useAuth } from "../../../../utils/AuthContext";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import PdfViewer from "../../../student/courses/deliverable/PdfViewer";
import Issues from "../../../student/issues/Issues";


export default function FacultyViewSubmission() {
    let { deliverableName, offeredCourseDeliverableId, submissionId, courseName } = useParams()
    const { userId, userRole } = useAuth()
    // eslint-disable-next-line no-unused-vars
    const [submittedFiles, setSubmittedFiles] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [allIssues, setAllIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [fileBase64, setFileBase64] = useState(null)
    const [fileInfo, setFileInfo] = useState(null)
    const [fileType, setFileType] = useState(null)
    const [error, setError] = useState(false)
    const breadCrumbUrl = [
        {
            url: '../../../../',
            name: 'Assigned courses',
        },
        {
            url: '../../../',
            name: courseName
        },
        {
            url: '../../',
            name: `Deliverables`
        }, {
            url: '../',
            name: deliverableName
        }, {
            name: 'View'
        }
    ]
    const breadCrumbUrlDean = [
        {
            url: '../',
            name: 'Submission List'
        }, {
            name: 'View'
        }
    ]

    useEffect(() => {


        async function getSubmittedFiles() {

            const data = {
                "userId": userId,
                "offeredDeliverableId": offeredCourseDeliverableId
            }
            try {
                const file = await SubmissionApi.getLatestVerionOfFile({ "id": submissionId })
                setFileInfo(file.data)
                setFileBase64(file.data.fileB64)
                setFileType(file.data.fileType)

                const issues = await IssueApi.getAllIssue({
                    "submissionId": submissionId,
                    "filter": "open"
                })
                setAllIssues(issues.data)
                return
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        getSubmittedFiles()
    }, [])
    return (
        <Stack className="h-full">
            <BackNav>
                <BreadCrumb data={userRole === "Dean" ? breadCrumbUrlDean:breadCrumbUrl} />
            </BackNav>
            <Stack className="my-4">
                <Divider className="!bg-black" />
            </Stack>

            <Stack className="w-full border-x-2  " direction={'row'}>
                <Stack className="w-4/6 px-10 border-r-2">

                    <Stack className="w-full h-[500px] gap-2">
                        {fileInfo && <Typography className="!text-md">Date Submitted: {new Date(fileInfo.dateSubmitted).toLocaleDateString()}</Typography>}
                        <PdfViewer fileBase64={fileBase64} fileType={fileType} />
                    </Stack>
                </Stack>
                <Stack className="px-4 pt-2 flex-grow">
                    {/* Show all issues */}
                    <Issues submissionId={submissionId} issues={allIssues} />
                </Stack>

            </Stack>
        </Stack >
    )
}
