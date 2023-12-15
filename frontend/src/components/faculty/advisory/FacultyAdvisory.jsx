import { Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import * as GroupApi from "../../../network/group_api";
import { useAuth } from "../../../utils/AuthContext";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import DynamicTable from "../../reusable/DynamicTable";
import { NavLink } from "react-router-dom";
import { RemoveRedEyeTwoTone } from "@mui/icons-material";
export default function FacultyAdvisory() {
  const { userId } = useAuth()
  const [data, setData] = useState([])

  useEffect(() => {
    async function showAdvisory() {
      const response = await GroupApi.getAdvisory({ "id": userId })
      console.log(response)
      if (response.isSuccess) {
        setData(response.data)
      }
    }
    showAdvisory()
  }, [])
  return (
    <Stack>
      <DashBoardHeading title="Advisory" desc="" />
      <div className="mt-2" />
      <DynamicTable>
        <TableHead>
          <TableRow className="bg-slate-300">
            <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Submission Title</TableCell>
            <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Group name</TableCell>
            <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Status</TableCell>
            <TableCell className=" !w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? data.map((file, index) => (
            <TableRow key={index} className='hover:bg-slate-100'>
              <TableCell className=" !text-[13px] 2xl:text-md !text-black border " >{file.title}</TableCell>
              <TableCell className=" !text-[13px] 2xl:text-md !text-black border " >{file.groupName}</TableCell>
              <TableCell className=" !text-[13px] 2xl:text-md !text-black border " >{file.status}</TableCell>
              <TableCell className=" !text-[13px] 2xl:text-md !text-black border " >
                <NavLink to={`${file.submissionId}`}>
                  <RemoveRedEyeTwoTone className="!text-blue-400 hover:!text-slate-400" />
                </NavLink>
              </TableCell>
            </TableRow>
          )) : (<TableRow><TableCell colSpan={4}>No files needed for approval</TableCell></TableRow>)
          }
        </TableBody>
      </DynamicTable >
    </Stack>
  )
}
