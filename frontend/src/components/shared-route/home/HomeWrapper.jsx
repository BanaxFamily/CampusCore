/* eslint-disable react/prop-types */

import { Stack } from "@mui/material";
import Announcements from "../Announcements";



export default function HomeWrapper() {
  return (
    <>
      <Stack className="my-6 overflow-y-auto" spacing={2} justifyContent={'center'} alignItems={'center'}>
          {/* We will map data here if api is okay */}
          <Announcements/>
          <Announcements/>
          <Announcements/>
          <Announcements/>
          <Announcements/>
      </Stack>
    </>
  );
}
