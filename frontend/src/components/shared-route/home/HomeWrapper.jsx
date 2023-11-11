/* eslint-disable react/prop-types */

import { Avatar, Divider, List, Stack, Typography } from "@mui/material";

export default function HomeWrapper() {
  return (
    <div className="m-4">
      <div className="shadow-md py-2">
        <Stack
          direction={"row"}
          spacing={2}
          className="items-center justify-start py-2 ml-2"
        >
          <Avatar alt="Remy Sharp" />
          <Typography>John mark abad</Typography>
        </Stack>
        <Divider />
        <Stack direction={"column"} className="text-[12px] sm:ml-14 mt-2">
          <Typography>REMINDER ASSIGNMENT DUE</Typography>
          <span>Posted on : May 9, 2023 | 10:30 AM</span>

          <span className="mt-4 font-bold underline underline-offset-2">
            Final Proposal Manuscript (softcopy)<br/> Softcopy of Consultation
            LogsForm with Adviser's Endorsement (bare forms will not be
            accepted)<br/> List of modules with Adviser's signature.
          </span>
        </Stack>
      </div>
    </div>
  );
}
