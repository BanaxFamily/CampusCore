import { Button, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as SubmissionApi from "../../../../network/submission_api";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import DeanForApproval from "./DeanForApproval";

export default function Submissions() {
  let { courseName, courseId } = useParams()
  const [showApproved, setShowApproved] = useState(false)
  const [approvedFiles, setApprovedFiles] = useState([])
  const [unApprovedFiles, setUnApprovedFiles] = useState([])

  useEffect(() => {
    async function getAllApprovedSubmissions() {
      try {
        const response = await SubmissionApi.getAllSubmissionDean({ "courseId": courseId, "isApproved": true })
        if (response.isSuccess) {
          setApprovedFiles(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    async function getAllForApprovalSubmissions() {
      try {
        const response = await SubmissionApi.getAllSubmissionDean({ "courseId": courseId, "isApproved": false })
        if (response.isSuccess) {
          setUnApprovedFiles(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getAllApprovedSubmissions()
    getAllForApprovalSubmissions()
  }, [])

  return (
    <Stack>
      <DashBoardHeading title="Submitted" />
      <Stack className="mt-2 py-2 px-1" spacing={1} direction="row">
        <Button variant={`${showApproved ? 'contained' : 'text'}`} onClick={() => setShowApproved(!showApproved)} className="h-12 !underline">For Approval</Button>
        <Button variant="outlined">Approved</Button>
      </Stack>
      <Divider />
      {showApproved && <div className="mt-8"><DeanForApproval unApprovedFiles={unApprovedFiles}/></div>}
    </Stack>
  )
}
