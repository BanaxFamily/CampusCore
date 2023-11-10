/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineCheckCircle, AiOutlineUserDelete } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { TableCell, TableRow } from "@mui/material";

export default function TableBodyUser(props) {
  return (
    <TableRow>
      <TableCell className={props.className}>{props.index}</TableCell>
      <TableCell className={props.className}>{props.user.idno}</TableCell>
      <TableCell className={props.className}>{props.user.username}</TableCell>
      <TableCell className={props.className}>{props.user.firstName}</TableCell>
      <TableCell className={props.className}>{props.user.lastName}</TableCell>
      <TableCell className={props.className}>{props.user.email}</TableCell>

      <TableCell>
        {props.user.status === "active" ? (
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
      <TableCell className={props.className}>{props.user.role}</TableCell>
      <TableCell>
        <div className=" flex items-center justify-center">
          <button
            className="text-sm flex self-center text-green-500 px-
                hover:text-green-900 hover:cursor-pointer"
          >
            <FaPencil size={20} onClick={props.showModalUpdate} />
          </button>
        </div>
      </TableCell>
      <TableCell>
        <div className=" flex items-center justify-center">
          <button
            className="text-sm flex self-center text-red-500 uppercase px-
              hover:text-red-900 hover:cursor-pointer"
          >
            <MdDeleteForever
              size={25}
              onClick={(e) => {
                props.onDeleteUserCliked(props.user);
                e.stopPropagation();
              }}
            />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
