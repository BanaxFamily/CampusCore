/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@mui/material";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

export default function TableBodyCourse(props) {
  return (
    <TableRow
      key={props.index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.course.name}</TableCell>
      <TableCell>{props.course.description}</TableCell>
      <TableCell>
        {props.course.status === "open" ? (
          <form action="">
            <button>
              <AiOutlineCheckCircle color="green" size={18} />
            </button>
          </form>
        ) : (
          <form>
            <button>
              <AiOutlineCheckCircle color="red" size={18} />
            </button>
          </form>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <button
            className="text-sm flex self-center text-green-500 uppercase px-
          hover:text-green-900 hover:cursor-pointer"
          >
            <FaPencil size={20} onClick={props.openModalUpdate} />
          </button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <button
            className="text-sm flex self-center text-red-500 uppercase px-
          hover:text-red-900 hover:cursor-pointer"
          >
            <MdDeleteForever
              size={20}
              onClick={(e) => {
                props.onDeleteUserCliked(props.course.id);
                e.stopPropagation();
              }}
            />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
