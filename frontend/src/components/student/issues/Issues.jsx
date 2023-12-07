/* eslint-disable react/prop-types */
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ViewIssue from "./ViewIssue";

export default function Issues({ issues }) {
  const [openSubmission, setOpenSubmission] = useState(false);
  const [toViewIssue, setToViewIssue] = useState([]);

  function viewSpecificIssue(data){
    setToViewIssue(data)
    setOpenSubmission(true)
  }

  return (
    <>
      <Stack className="my-4">
        <Button variant="outlined" size="small" onClick={() => setOpenSubmission(true)} className="  !flex self-end">Add submission</Button>
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
                    {/* <MoreHoriz /> */}
                  </Stack>
                </Stack>
              </Button>
              <Divider />
            </Stack>
          ))
        }
      </Stack>

      {openSubmission && <ViewIssue toViewIssue={toViewIssue} />}
    </>
  )
}
