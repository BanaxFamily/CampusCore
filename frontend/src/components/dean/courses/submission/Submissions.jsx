import { Button, Divider, Stack } from "@mui/material";
import { useState } from "react";
import BackNav from "../../../reusable/BackNav";
import BreadCrumb from "../../../reusable/BreadCrumb";
import Approved from "./Approved";

export default function Submissions() {
  const [showApproved, setShowApproved] = useState(false)
  const breadCrumbUrl = [
    {
      url: '../',
      name: 'List of offered courses',
    },
    {
      name: `Submissions`
    }
  ]
  return (
    <Stack>
      <Stack>
        <BackNav>
          <BreadCrumb data={breadCrumbUrl} />
        </BackNav>
      </Stack>

      <Stack className="mt-10 py-4 px-1" spacing={1} direction="row">
        <Button variant={`${showApproved ? 'contained' : 'outlined'}`} onClick={() => setShowApproved(!showApproved)} className="h-12">For Review</Button>
        {/* <Divider orientation="vertical" variant="middle" flexItem sx={{border: 1, color: "GrayText"}}/> */}
        <Button variant="outlined">Approved</Button>
      </Stack>
      <Divider />
      {
        showApproved && <div className="mt-8"><Approved /></div>
      }
    </Stack>
  )
}
