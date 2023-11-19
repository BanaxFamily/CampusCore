import { Button, Divider, Stack } from "@mui/material";
import { useState } from "react";
import Approved from "./Approved";
import BackNav from "./BackNav";
import { Link, NavLink } from "react-router-dom";
import { ArrowLeftSharp } from "@mui/icons-material";

export default function Submissions() {
  const [showApproved, setShowApproved] = useState(false)
  return (
    <>
      <BackNav>
        <Link to="/courses" className="text-gray-400 underline font-semibold underline-offset-4 pr-2">
          <ArrowLeftSharp className="text-gray-400" />
            Courses
        </Link>
        <NavLink activeclassname="active" className="text-gray-400 underline font-semibold underline-offset-4 pr-2">
          <ArrowLeftSharp className="text-gray-400" />
            Submission
        </NavLink>
      </BackNav>

      <Stack className="mt-10 py-4 px-1" spacing={1} direction="row">
        <Button variant={`${showApproved ? 'contained':'outlined'}`} onClick={() => setShowApproved(!showApproved)} className="h-12">For Review</Button>
        {/* <Divider orientation="vertical" variant="middle" flexItem sx={{border: 1, color: "GrayText"}}/> */}
        <Button variant="outlined">Approved</Button>
      </Stack>
      <Divider/>
      {
        showApproved && <div className="mt-8"><Approved /></div>
      }
    </>
  )
}
