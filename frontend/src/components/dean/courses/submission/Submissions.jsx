import { Button, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import * as SubmissionApi from "../../../../network/submission_api";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import DeanForApproval from "./DeanForApproval";
import Approved from "./Approved";

export default function Submissions() {
  const [showForApproval, setShowForApproval] = useState(true)
  const [showApproved, setShowApproved] = useState(false)
  const [approvedFiles, setApprovedFiles] = useState([])
  const [unApprovedFiles, setUnApprovedFiles] = useState([])

  useEffect(() => {
    async function getAllApprovedSubmissions() {
      try {
        const response = await SubmissionApi.getAllSubmissionDean({ "isApproved": true })
        if (response.isSuccess) {
          setApprovedFiles(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    async function getAllForApprovalSubmissions() {
      try {
        const response = await SubmissionApi.getAllSubmissionDean({ "isApproved": false })
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
        <Button variant={`${showForApproval ? 'contained' : 'text'}`} onClick={() => {
          setShowForApproval(!showForApproval)
          setShowApproved(false)
        }} className={`h-12 ${showForApproval ? '!underline' : ''}`}>For Approval</Button>

        <Button variant={`${showApproved ? 'contained' : 'text'}`} onClick={() => {
          setShowForApproval(false)
          setShowApproved(!showApproved)
        }} className={`h-12 ${showApproved ? '!underline' : ''}`}>Approved</Button>
      </Stack>
      <Divider />
      {showForApproval && <div className="mt-8"><DeanForApproval unApprovedFiles={unApprovedFiles} /></div>}
      {showApproved && <div className="mt-8"><Approved approvedFiles={approvedFiles} /></div>}
    </Stack>
  )
}
