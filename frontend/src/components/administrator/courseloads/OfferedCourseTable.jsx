/* eslint-disable react/prop-types */
import { Button, TableBody, TableHead } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { NavLink } from "react-router-dom";
// import * as OfferedCourse from "../../../network/offeredCourse_api";
import DynamicTable from "../../reusable/DynamicTable";
import ConfirmDialogCourseLoads from "./ConfirmDialogCourseLoads";


export default function BasicTable({ courseOffered }) {

  // async function deleteCourseOff(id) {
  //     const response = await OfferedCourse.deleteOfferedCourse({"id": id})
  //   console.log(response)
  //   console.log(id)
  // }

  // function deleteConfirmation(id){
  //   let text = "Are you sure you want to delete this course?"
  //   if(confirm(text)){
  //     deleteCourseOff(id)
  //   }
  // }
  return (
    <DynamicTable>
      <TableHead>
        <TableRow className="bg-slate-300">
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold" align="right">Course</TableCell>
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Schedule</TableCell>
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Assigned</TableCell>
          <TableCell className=" !text-[13px] 2xl:text-md !text-black !font-bold">Email</TableCell>
          <TableCell className=" w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">Semester</TableCell>
          <TableCell className=" w-[8%] !text-[13px] 2xl:text-md !text-black !font-bold">Year</TableCell>
          <TableCell className=" w-[5%] !text-[13px] 2xl:text-md !text-black !font-bold">Action</TableCell>
          <TableCell className="w-[10%] !text-[13px] 2xl:text-md !text-black !font-bold"> Students</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courseOffered.map((course, index) => (
          <TableRow
            className="hover:bg-gray-100"
            key={index}
          >
            <TableCell className="!text-[12px] 2xl:text-[14px] border">{course.course.name} {course.course.description}</TableCell>
            <TableCell className="!text-[12px] 2xl:text-[14px] border">{course.schedule}</TableCell>
            <TableCell className="!text-[12px] 2xl:text-[14px] border">{course.facultyAssigned.fullName}</TableCell>
            <TableCell className="!text-[12px] 2xl:text-[14px] border">{course.facultyAssigned.email}</TableCell>
            <TableCell className="!text-[12px] 2xl:text-[14px] border">{course.sem === 'first' ? "1st" : "2nd"}</TableCell>
            <TableCell className="!text-[12px] 2xl:text-[14px] border">{course.acadYear}</TableCell>
            <TableCell className="!text-[12px] 2xl:text-[14px] border">
              {/* <IconButton  size="small" onClick={() => deleteConfirmation(course.id)}><DeleteForever className="text-red-500 hover:text-red-300"/></IconButton> */}
              <ConfirmDialogCourseLoads courseId={course.id} />
            </TableCell>
            <TableCell align="center">
              <NavLink to={`${course.course.name}/${course.id}/enrolled-students`} ><Button size="small" className="!text-sm hover:text-blue-300">View</Button></NavLink>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DynamicTable>
  );
}
