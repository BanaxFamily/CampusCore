/* eslint-disable react/prop-types */
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DynamicTable from "../../reusable/DynamicTable";
import { TableBody, TableHead, Button } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import * as OfferedCourse from "../../../network/offeredCourse_api"


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
          </TableRow>
        ))}
      </TableBody>
    </DynamicTable>
  );
}
