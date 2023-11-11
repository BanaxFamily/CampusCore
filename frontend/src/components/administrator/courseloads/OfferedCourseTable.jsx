/* eslint-disable react/prop-types */
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DynamicTable from "../../reusable/DynamicTable";
import { TableBody, TableHead } from "@mui/material";

export default function BasicTable({courseOffered}) {
  return (
    <DynamicTable>
      <TableHead>
        <TableRow>
          <TableCell>Semester</TableCell>
          <TableCell >Course</TableCell>
          <TableCell>Schedule</TableCell>
          <TableCell>Assigned</TableCell>
          <TableCell align="right">Year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courseOffered.map((course, index) => (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="right">{course.sem}</TableCell>
            <TableCell align="right">{course.course}</TableCell>
            <TableCell align="right">{course.schedule}</TableCell>
            <TableCell align="right">{course.facultyAssigned}</TableCell>
            <TableCell align="right">{course.acadYear}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DynamicTable>
  );
}
