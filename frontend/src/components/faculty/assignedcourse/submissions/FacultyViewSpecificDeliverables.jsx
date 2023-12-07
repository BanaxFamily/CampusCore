/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Button, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as OfferedCourseDeliverable from "../../../../network/offeredCourseDeliverable_api";
import * as SubmissionApi from "../../../../network/submission_api";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import SpecificDeliverableAddSubmission from "../../../student/courses/deliverable/SpecificDeliverableAddSubmission";
import FacultySubmissions from "./FacultySubmissions";
import FacultyIssue from "./FacultyIssue";
import { FileOpenSharp, History } from "@mui/icons-material";

export default function FacultyViewSpecificDeliverables() {
    let { deliverableName, offeredCourseDeliverableId, courseName } = useParams()
    const [deliverable, setDeliverable] = useState([])
    const [submittedFiles, setSubmittedFiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const breadCrumbUrl = [
        {
            url: '../../../',
            name: 'Assigned courses',
        },
        {
            url: '../../',
            name: courseName
        },
        {
            url: '../',
            name: `Deliverables`
        }, {
            name: deliverableName
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

            try {
                const response = await SubmissionApi.getFacultyAllDeliverableByOfferedDeliverable({ "id": offeredCourseDeliverableId })
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
                <Stack className="w-4/6 border-r-2">

                    {loading && <LinearProgress />}
                    {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                    {
                        !loading && !error &&
                        <>
                            <SpecificDeliverableAddSubmission deliverable={deliverable} userRole="Faculty" />

                        </>
                    }
                </Stack>
                <Stack className="w-1/2 px-1 gap-2 pb-4 overflow-hidden">
                    <Button className="!mt-2 flex self-end" size="small" variant="outlined">Submission History<FileOpenSharp/></Button>
                    <Stack className="mt-2">
                        {loading && <LinearProgress color="inherit" />}
                        {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                        {
                            !loading && !error &&
                            <Stack className=" max-h-100px overflow-auto border-2 rounded-lg">
                                {/* Latest Version */}
                                <FacultySubmissions submittedFiles={submittedFiles}/>
                            </Stack>
                        }
                    </Stack>

                    <Stack className="mt-2">
                        <Typography variant="h6" className="!text-lg !font-semibold tracking-wide underline underline-offset-4">Issues</Typography>
                    </Stack>
                    <Stack>
                        <FacultyIssue issueTitle={"Issues"}/>
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    )
}
