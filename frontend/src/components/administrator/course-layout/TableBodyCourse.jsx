/* eslint-disable react/prop-types */
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

export default function TableBodyCourse(props) {
  return (
    <tr>
      <td className={props.className}>{props.index}</td>
      <td className={props.className}>{props.course.name}</td>
      <td className={props.className}>{props.course.description}</td>
      <td>
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
      </td>
      <td>
        <div className="flex items-center justify-center">
          <button
            className="text-sm flex self-center text-green-500 uppercase px-
          hover:text-green-900 hover:cursor-pointer"
          >
            <FaPencil size={20} onClick={props.openModalUpdate} />
          </button>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <button
            className="text-sm flex self-center text-red-500 uppercase px-
          hover:text-red-900 hover:cursor-pointer"
          >
            <MdDeleteForever
              size={25}
              onClick={(e) => {
                props.onDeleteUserCliked(props.course.id);
                e.stopPropagation();
              }}
            />
          </button>
        </div>
      </td>
    </tr>
  );
}
