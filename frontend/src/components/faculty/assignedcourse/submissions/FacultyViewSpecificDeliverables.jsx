/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Divider, LinearProgress, Stack, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import * as OfferedCourseDeliverable from "../../../../network/offeredCourseDeliverable_api";
import * as SubmissionApi from "../../../../network/submission_api";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import DynamicTable from "../../../reusable/DynamicTable";
import SpecificDeliverableAddSubmission from "../../../student/courses/deliverable/SpecificDeliverableAddSubmission";

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
                const response = await SubmissionApi.getAllSubmissionFaculty({ "offeredCourseDeliverableId": offeredCourseDeliverableId, "isApproved": false })
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
            <DashBoardHeading title={` ${deliverableName} `} />

            <Stack className="w-full border-2 " direction={'row'}>
                <Stack className="w-4/6 px-10 border-r-2">

                    {loading && <LinearProgress />}
                    {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                    {
                        !loading && !error &&
                        <>
                            <SpecificDeliverableAddSubmission deliverable={deliverable} userRole="Faculty" />

                        </>
                    }
                    <Stack className="w-full h-[500px] gap-2">
                        <Stack className="!flex-row justify-between items-center">
                            <Typography className="!text-lg">List of submissions</Typography>
                            <Typography className="!text-sm text-slate-400">For approval</Typography>
                        </Stack>
                        <Stack className="border">
                            <DynamicTable>
                                <TableHead>
                                    <TableRow className="bg-slate-300">
                                        <TableCell className="!w-[30%] !text-md !text-black !font-bold border "> Student / Group name </TableCell>
                                        <TableCell className=" !text-md !text-black !font-bold border !text-center"> Title </TableCell>
                                        <TableCell className="!w-[15%] !text-md !text-black !font-bold border "> Status</TableCell>
                                        <TableCell className="!w-[15%] !text-md !text-black !font-bold border "> Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        submittedFiles.map((file, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="!text-[12px] 2xl:text-[14px] border">{file.groupName ? file.groupName : file.submitter}</TableCell>
                                                <TableCell className="!text-[12px] 2xl:text-[14px] border">{file.title}</TableCell>
                                                <TableCell className="!text-[12px] 2xl:text-[14px] border ">{file.status}</TableCell>
                                                <TableCell className="!text-[12px] 2xl:text-[14px] border ">
                                                    <NavLink to={`${file.submissionId}`}>
                                                            View
                                                    </NavLink>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </DynamicTable>
                        </Stack>
                    </Stack>
                </Stack>
                {/* Side Informations */}
                <Stack>
                    <div className="grid grid-cols-2 px-2 gap-1 pt-4">
                        <div className="border h-28 px-6 flex justify-center items-center rounded-md shadow-md">
                            <p className="text-center">Submitted 14</p>
                        </div>
                        <div className="border h-28 px-6 flex justify-center items-center rounded-md shadow-md">
                            <p className="text-center">Missing 14</p>
                        </div>
                        <div className="border h-28 px-6 flex justify-center items-center rounded-md shadow-md">
                            <p className="text-center">Approved 14</p>
                        </div>
                    </div>

                </Stack>
            </Stack>
        </Stack >
    )
}
