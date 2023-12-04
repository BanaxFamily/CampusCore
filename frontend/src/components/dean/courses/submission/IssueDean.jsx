/* eslint-disable react/prop-types */
import { MoreHoriz } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"
import DashBoardHeading from "../../../reusable/DashBoardHeading"
import { useState } from "react"
import AddIssueModal from "../AddIssueModal"

export default function IssueDean({issueTitle}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pb-5 bg-white shadow-lg">
      <DashBoardHeading desc="" title={`${issueTitle}`} classname="py-6" shadow="shadow-gray-300" />
      <div className="pl-2">
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" className="!text-md">
          Issues known
        </Typography>
      </div>
      <div className=" px-2 max-h-[200px] overflow-y-auto">
        <Stack direction="column" spacing={1}>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
          <div className="w-full flex justify-between border border-gray-500 rounded-md items-center text-md px-2 hover:text-blue-400 hover:border-blue-400 ">
            <Typography variant="p">Issue 1</Typography>
            <Button variant="standard" className="cursor-pointer" edge="end" aria-label="details"> <MoreHoriz /></Button>
          </div>
        </Stack>
        <div className="w-full flex justify-center items-center mt-4">
        </div>
      </div>
      <Stack className="mt-4 px-2">
        <Button variant="contained" onClick={() => setOpen(true)}>Add new issue</Button>
      </Stack>

      {open && <AddIssueModal onDismiss={() => setOpen(false)} />}
    </div>
  )
}
