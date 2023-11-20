import { Stack, TextField, Typography } from "@mui/material";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import Settings from "../../reusable/Settings";

export default function DeanSetting() {
  return (
    <>
      <DashBoardHeading title="Profile" desc="" />

      <Settings>
        <div className="w-full pb-4 md:w-[60%] shadow-md">
          <div className="px-4 py-6">
            <Typography variant="subtitle1" component="h1"> User Details </Typography>
          </div>
          <form action="">
            <Stack className="px-4" spacing={1} sx={{ width: '100%' }} >
              <Stack className=" w-full items-center" direction="row" spacing={{ xs: 3.5, md: 4.5, lg: 2.3 }}>
                <Typography variant="subtitle2" component="h1" className="w-32"> User Details </Typography>
                <TextField
                  id="comment"
                  placeholder="static value"
                  margin="dense"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Stack>
              <Stack className=" w-full items-center" direction="row" spacing={{ xs: 3.5, md: 4.5, lg: 2.3 }}>
                <Typography variant="subtitle2" component="h1" className="w-32"> User Details </Typography>
                <TextField
                  id="comment"
                  placeholder="static value"
                  margin="dense"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Stack>
              <Stack className=" w-full items-center" direction="row" spacing={{ xs: 3.5, md: 4.5, lg: 2.3 }}>
                <Typography variant="subtitle2" component="h1" className="w-32"> User Details </Typography>
                <TextField
                  id="comment"
                  placeholder="static value"
                  margin="dense"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Stack>
              <Stack className=" w-full items-center" direction="row" spacing={{ xs: 3.5, md: 4.5, lg: 2.3 }}>
                <Typography variant="subtitle2" component="h1" className="w-32"> User Details </Typography>
                <TextField
                  id="comment"
                  placeholder="static value"
                  margin="dense"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
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
