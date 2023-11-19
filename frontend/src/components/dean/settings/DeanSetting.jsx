import { Stack, Typography } from "@mui/material";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Settings from "../../reusable/Settings";

export default function DeanSetting() {
  return (
    <>
      <DashBoardHeading title="Profile" desc="" />

      <Settings>
        <div className="w-full md:w-[60%] shadow-md">
          <div className="px-4 py-6">
            <Typography variant="h5" component="h1"> User Details </Typography>
          </div>
          <form action="">
            <Stack direction="row" className="p-2">
              <Stack className=" w-1/4 md:w-1/3" spacing={{ xs: 3.5, md: 4.5, lg: 2.3 }}>
                <label className="text-sm md:text-md lg:text-lg text-gray-600">ID no#</label>
                <label className="text-sm md:text-md lg:text-lg text-gray-600">Firstname</label>
                <label className="text-sm md:text-md lg:text-lg text-gray-600">Lastname</label>
                <label className="text-sm md:text-md lg:text-lg text-gray-600">Email</label>
              </Stack>
              <Stack className=" flex-grow text-sm md:text-md lg:text-lg" spacing={1} >
                <input type="text" className="px-4 py-2 md:py-3 lg:py-1 border-b-2 focus:border-blue-400 focus:outline-none" placeholder="static value here"/>
                <input type="text" className="px-4 py-2 md:py-3 lg:py-1 border-b-2 focus:border-blue-400 focus:outline-none" placeholder="static value here"/>
                <input type="text" className="px-4 py-2 md:py-3 lg:py-1 border-b-2 focus:border-blue-400 focus:outline-none" placeholder="static value here"/>
                <input type="text" className="px-4 py-2 md:py-3 lg:py-1 border-b-2 focus:border-blue-400 focus:outline-none" placeholder="static value here"/>
              </Stack>
            </Stack>
          </form>

        </div>
        <div className="flex flex-grow-0">

        </div>
      </Settings>
    </>
  )
}
