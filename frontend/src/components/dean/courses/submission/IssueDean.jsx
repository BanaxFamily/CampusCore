import { Button, Stack, TextField } from "@mui/material"
import DashBoardHeading from "../../../reusable/DashBoardHeading"

export default function IssueDean() {
  return (
    <div>
        <DashBoardHeading title="" desc="Issues" classname="py-8" shadow="shadow-gray-300"/>
         <Stack className="mt-2">
            <Button>go to issues</Button>
            <TextField/>
            <TextField/>
        </Stack>
    </div>
  )
}
