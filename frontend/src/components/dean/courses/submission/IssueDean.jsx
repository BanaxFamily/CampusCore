import { Button, Stack, TextField } from "@mui/material"
import DashBoardHeading from "../../../reusable/DashBoardHeading"
import { useState } from "react"

export default function IssueDean() {
  const [issueOpen, setIssueOpen] = useState(false)
  return (
    <div className="pb-5">
      <DashBoardHeading title="" desc="Issues" classname="py-8" shadow="shadow-gray-300" />
      <div className="mt-2 w-full flex justify-start items-center py-2 pl-4">
        <Button variant={`${issueOpen ? 'contained' : 'outlined'}`} onClick={() => setIssueOpen(!issueOpen)}>Open Issues</Button>
      </div>
      <form>
        <Stack className="px-4 py-2">
          <TextField
            label="Title"
            variant="standard"
          />
          <TextField
            label="Comments"
            variant="standard"
          />
        </Stack>
        <div className="w-full flex justify-center items-center mt-4">
          <Button variant="contained">Add issue</Button>
        </div>
      </form>
    </div>
  )
}
