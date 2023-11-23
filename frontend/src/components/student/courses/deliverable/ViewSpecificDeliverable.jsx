/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Deliverable from "../../../../network/deliverable";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import SpecificDeliverableAddSubmission from "./SpecificDeliverableAddSubmission";
// import { useAuth } from "../../../../utils/AuthContext";

export default function ViewSpecificDeliverable() {
    let { deliverableName, deliverableId } = useParams()
    // const {userId} = useAuth()
    const [deliverable, setDeliverable] = useState([])
    // const [submittedFiles, setSubmittedFiles] = useState([])
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

        // async function getSubmittedFiles() {
        //     try {
        //         const response = await Deliverable.getSubmissionList({ 'id': userId })
        //         if (response.isSuccess) {
        //             setDeliverable(response.data)
        //             return
        //         }
        //     } catch (error) {
        //         console.error(error)
        //         setError(true)
        //     } finally {
        //         setLoading(false)
        //     }
        // }
        // getSubmittedFiles()
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

            <Stack className="border-2 " direction={'row'}>
                <Stack className="w-[65%] ">

                    {loading && <LinearProgress />}
                    {error && <Alert severity="error">Something went wrong. Try again later</Alert>}
                    {
                        !loading && !error &&
                        <>
                            <SpecificDeliverableAddSubmission deliverable={deliverable} />
                        </>
                    }
                </Stack>
                <Stack className="border-l-2 px-2 flex-grow">
                    <Stack  className="my-2">
                        <Typography  variant="h6" className="!text-lg !font-medium tracking-wide">Submitted files</Typography>
                    </Stack>
                    <Stack className=" w-[90%] mx-auto pl-2">
                        <Stack className="w-full">
                            <Typography className="!text-md">submissions</Typography>
                        </Stack>
                        <Divider/>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
