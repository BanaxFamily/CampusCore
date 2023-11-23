/* eslint-disable react/prop-types */
import { DeleteForever } from "@mui/icons-material";
import { Button, TableBody, TableHead } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { NavLink } from "react-router-dom";
import * as OfferedCourse from "../../../network/offeredCourse_api";
import DynamicTable from "../../reusable/DynamicTable";


export default function BasicTable({ courseOffered }) {

  async function deleteCourseOff(id) {
      const response = await OfferedCourse.deleteOfferedCourse({"id": id})
    console.log(response)
    console.log(id)
  }

  function deleteConfirmation(id){
    let text = "Are you sure you want to delete this course?"
    if(confirm(text)){
      deleteCourseOff(id)
    }
  }
  return (
    <DynamicTable>
      <TableHead>
        <TableRow>
          <TableCell>Course</TableCell>
          <TableCell align="center">Schedule</TableCell>
          <TableCell align="center">Assigned</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="right">Semester</TableCell>
          <TableCell align="right">Year</TableCell>
          <TableCell align="center">Action</TableCell>
          <TableCell align="center" > Enrolled Students</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courseOffered.map((course, index) => (
          <TableRow
            className="hover:bg-gray-100"
            key={index}
          >
            <TableCell>{course.course.name} {course.course.description}</TableCell>
            <TableCell align="center">{course.schedule}</TableCell>
            <TableCell align="center">{course.facultyAssigned.fullName}</TableCell>
            <TableCell align="center">{course.facultyAssigned.email}</TableCell>
            <TableCell align="right">{course.sem === 'first' ? "1st" : "2nd"}</TableCell>
            <TableCell align="center">{course.acadYear}</TableCell>
            <TableCell align="right">
              <Button onClick={() => deleteConfirmation(course.id)}><DeleteForever className="text-red-500 hover:text-red-300"/></Button>
            </TableCell>
            <TableCell align="center">
              <NavLink to={`${course.course.name}/${course.course.id}/enrolled-students`} ><Button size="small" className="hover:text-blue-300">View</Button></NavLink>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DynamicTable>
  );
}
