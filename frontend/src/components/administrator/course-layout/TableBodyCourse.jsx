/* eslint-disable react/prop-types */
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function TableBodyCourse(props) {
  return (
    <TableRow className="hover:bg-slate-200">
      <TableCell className="!text-[12px] 2xl:text-[14px] border">{props.index}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">{props.course.name}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">{props.course.description}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">
        {props.course.status === "open" ? (
          <form action="">
            <IconButton>
              <AiOutlineCheckCircle color="green" size={20} />
            </IconButton>
          </form>
        ) : (
          <form>
            <IconButton>
              <AiOutlineCloseCircle color="red" size={20} />
            </IconButton>
          </form>
        )}
      </TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">
          <IconButton size="small">
            <Edit size="small" className="text-green-500" onClick={props.openModalUpdate} />
          </IconButton>
      </TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">
          <IconButton size="small">
            <Delete
              className="text-red-500"
              size="small"
              onClick={(e) => {
                props.onDeleteCourseClicked(props.course);
                e.stopPropagation();
              }}
            />
          </IconButton>
      </TableCell>
    </TableRow>
  );
}
