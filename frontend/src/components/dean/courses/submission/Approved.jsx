/* eslint-disable react/prop-types */
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DynamicTable from '../../../reusable/DynamicTable'
import { useAuth } from '../../../../utils/AuthContext'

export default function Approved({ approvedFiles }) {
  const {userRole} = useAuth()
  return (
    <DynamicTable>
      <TableHead>
        <TableRow className="bg-slate-300">
          {userRole === "Dean" && <TableCell className=" !w-[15%] !text-[13px] 2xl:text-md !text-black border !font-bold !text-left !pl-4" >For Course</TableCell>}
          <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Submission Title</TableCell>
          <TableCell className=" !text-[13px] 2xl:text-md !text-black border !font-bold">Group name</TableCell>
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Status</TableCell>
          {/* <TableCell className=" !w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">View</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {approvedFiles.length > 0 ? approvedFiles.map((file, index) => (
          <TableRow key={index} className='hover:bg-slate-100'>
            {userRole === "Dean" && <TableCell className=" !text-[13px] 2xl:text-md !text-black border !text-left !pl-4" >{file.forCourse}</TableCell>}
            <TableCell className=" !text-[13px] 2xl:text-md !text-black border " >{file.title}</TableCell>
            <TableCell className=" !text-[13px] 2xl:text-md !text-black border " >{file.groupName}</TableCell>
            <TableCell className=" !text-[13px] 2xl:text-md !text-black border " >{file.status}</TableCell>
          </TableRow>
        )) : (<TableRow><TableCell colSpan={userRole === "Dean" ? 4:3}>No files needed for approval</TableCell></TableRow>)
        }
      </TableBody>
    </DynamicTable >
  )
}
 {/* <TableCell className=" !text-[13px] 2xl:text-md !text-black border " >
              <NavLink to={`${file.submissionId}`}>
                <RemoveRedEyeTwoTone className="!text-blue-400 hover:!text-slate-400" />
              </NavLink>
            </TableCell> */}