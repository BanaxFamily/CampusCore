/* eslint-disable react/prop-types */
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ViewIssue from "./ViewIssue";
import { useAuth } from "../../../utils/AuthContext";
import FacultyApprovalModal from "../../faculty/assignedcourse/submissions/FacultyApprovalModal";
import AddDeliverableModal from "../courses/deliverable/AddDeliverableModal";
import { MoreHoriz } from "@mui/icons-material";

export default function Issues({ submissionId,issues }) {
  const {userRole} = useAuth()
  const [openSubmission, setOpenSubmission] = useState(false);
  const [openApproval, setOpenApproval] = useState(false);
  const [addNewSubmission, setToAddNewSubmissoion] = useState(false);
  const [toViewIssue, setToViewIssue] = useState([]);

  function viewSpecificIssue(data){
    setToViewIssue(data)
    setOpenSubmission(true)
  }

  return (
    <>
      <Stack className="my-4">
        {userRole === "Student" && <Button variant="outlined" size="small" onClick={() => setToAddNewSubmissoion(true)} className="  !flex self-end">Add submission</Button>}
        {userRole === "Faculty" && <Button variant="outlined" size="small" onClick={() => setOpenApproval(true)} className="  !flex self-end">Aprrove submission</Button>}
      </Stack>
      <Stack className="!flex-row justify-between items-center">
        <Typography className="!text-lg">Issues</Typography>
        <Typography className="!text-sm"> closed</Typography>
      </Stack>
      <Stack className="border shadow-sm h-64 overflow-y-auto rounded-md">
        {
          issues.map((issue, index) => (
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
      </Stack>

      {openSubmission && <ViewIssue toViewIssue={toViewIssue} />}
      {addNewSubmission && <AddDeliverableModal submissionId={submissionId} issues={issues}/>}
      {openApproval && userRole === "Faculty" &&  <FacultyApprovalModal  onDismiss={() => setOpenApproval(false)}/>}
    </>
  )
}
