/* eslint-disable react/prop-types */
import { MoreHoriz } from "@mui/icons-material";
import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import * as IssueApi from "../../../network/issue_api";
import { useAuth } from "../../../utils/AuthContext";
import AddIssueModal from "../../dean/courses/AddIssueModal";
import FacultyApprovalDialog from "../../faculty/assignedcourse/submissions/FacultyApprovalDialog";
import AddDeliverableModal from "../courses/deliverable/AddDeliverableModal";
import ViewIssue from "./ViewIssue";

export default function Issues({ submissionId, issues }) {

  const { userRole } = useAuth()
  const [openSubmission, setOpenSubmission] = useState(false);
  // const [openApproval, setOpenApproval] = useState(false);
  const [addNewSubmission, setToAddNewSubmissoion] = useState(false);
  const [toViewIssue, setToViewIssue] = useState([]);
  const [allClosedIssues, setAllClosedIssues] = useState([]);
  const [allClosedIssuefetch, setAllClosedIssuefetch] = useState(false);
  const [openAddIssue, setOpenAddIssue] = useState(false);

  function viewSpecificIssue(data) {
    setToViewIssue(data)
    setOpenSubmission(true)
  }

  async function viewAllClosedIssues() {
    const closeIssue = await IssueApi.getAllIssue({
      "submissionId": submissionId,
      "filter": "closed"
    })
    setAllClosedIssues(closeIssue.data)
    setAllClosedIssuefetch(!allClosedIssuefetch)
    console.log(closeIssue.data)
  }

  return (
    <>
      <Stack className="my-4">
        {userRole === "Student" && <Button variant="outlined" size="small" onClick={() => setToAddNewSubmissoion(true)} className="  !flex self-end">{submissionId ? 'Add new version':'Add submission'}</Button>}
        <Stack className="!flex-row justify-between">
          {userRole !== "Student" && <Button variant="outlined" size="small" onClick={() => setOpenAddIssue(true)} className=" !text-red-500 !border-red-500 !flex self-end">Add Issue</Button>}
          {/* {userRole === "Faculty" && <Button variant="outlined" size="small" onClick={() => setOpenApproval(true)} className="  !flex self-end">Aprrove submission</Button>} */}
          <FacultyApprovalDialog issues={issues}/>
        </Stack>
      </Stack>
      <Stack className="!flex-row justify-between items-center">
        <Typography className="!text-lg">Issues</Typography>
        <Button onClick={viewAllClosedIssues} className="!text-sm !text-slate-500"> {allClosedIssuefetch ? 'Show Open':'Show Closed'}</Button>
      </Stack>
      <Stack className="border shadow-sm max-h-64 overflow-y-auto rounded-md">
        {!allClosedIssuefetch && issues.length > 0 && issues.map((issue, index) => (
          <Stack key={index}>
            <Button onClick={() => viewSpecificIssue(issue)} className="!flex !text-blue-500  ">
              <Stack className=" w-full px-2 !flex-row items-center justify-between">
                <Stack>
                  <Typography className="!text-[14px] text-slate-600">{issue.issueTitle}</Typography>
                </Stack>
                <Stack className="!flex-row items-center">
                  {/* <Typography variant="subtitle2">view</Typography> */}
                  <MoreHoriz />
                </Stack>
              </Stack>
            </Button>
            <Divider />
          </Stack>
        ))
        }
        {allClosedIssuefetch && allClosedIssues.length > 0 && allClosedIssues.map((issue, index) => (
          <Stack key={index}>
            <Typography className="!text-center !text-slate-700 !font-semibold !text-md">Closed Issues</Typography>
            <Button onClick={() => viewSpecificIssue(issue)} className="!flex !text-blue-500  ">
              <Stack className=" w-full px-2 !flex-row items-center justify-between">
                <Stack>
                  <Typography className="!text-[14px] text-slate-600">{issue.issueTitle}</Typography>
                </Stack>
                <Stack className="!flex-row items-center">
                  {/* <Typography variant="subtitle2">view</Typography> */}
                  <MoreHoriz />
                </Stack>
              </Stack>
            </Button>
            <Divider />
          </Stack>
        ))
        }
        {issues.length < 1 && allClosedIssuefetch < 1 && <Alert severity="info">No issues</Alert>}
      </Stack>

      {openAddIssue && <AddIssueModal onDismiss={() => setOpenAddIssue(false)} submissionId={submissionId} />}
      {openSubmission && <ViewIssue toViewIssue={toViewIssue} />}
      {addNewSubmission && <AddDeliverableModal onDismiss={() => setToAddNewSubmissoion(false)} submissionId={submissionId} issues={issues} />}
      {/* {openApproval && userRole === "Faculty" && <FacultyApprovalModal onDismiss={() => setOpenApproval(false)} />} */}
    </>
  )
}
