/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function TableBodyUser(props) {
  return (
    <TableRow className="hover:bg-slate-200">
      <TableCell className="!text-[12px] 2xl:text-[14px] border">{props.index}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">{props.user.idno}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">{props.user.username}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">{props.user.firstName}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">{props.user.lastName}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border overflow-x-autow">{props.user.email}</TableCell>

      <TableCell className="!text-[12px] 2xl:text-[14px] border">
        {props.user.status === "active" ? (
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
      <TableCell className={props.className}>{props.user.role}</TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">
        <IconButton size="small" onClick={props.showModalUpdate}>
          <Edit size="small" className="text-green-500" />
        </IconButton>
      </TableCell>
      <TableCell className="!text-[12px] 2xl:text-[14px] border">
        <div className=" flex items-center justify-center">
          <IconButton size="small" onClick={(e) => {
            props.onDeleteUserCliked(props.user);
            e.stopPropagation();
          }}>
            <Delete
              className="text-red-500"
              size="small"

            />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
}
