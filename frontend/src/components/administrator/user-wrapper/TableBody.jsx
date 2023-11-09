/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";

export default function TableBody(props) {
  return (
    <>
      <tbody className="text-[13px] bg-gray-100 hover:bg-gray-200">
        <tr>
          <td className={props.className}>{props.index}</td>
          <td className={props.className}>{props.user.username}</td>
          <td className={props.className}>{props.user.firstName}</td>
          <td className={props.className}>{props.user.lastName}</td>
          <td className={props.className}>{props.user.email}</td>
          <td className={props.className}>{props.user.status}</td>
          <td className={props.className}>{props.user.role}</td>
          <td className={`${props.className} flex justify-evenly gap-1 `}>
            <div className=" w-1/2 group">
              <button
                className="text-sm flex items-center gap-1 text-green-500 uppercase px-
                group-hover:text-blue-800 hover:cursor-pointer"
              >
                <LiaUserEditSolid size={20} onClick={props.showModalUpdate} />
              </button>
            </div>
            <div className=" w-1/2  text-red-600 hover:text-black hover:cursor-pointer">
              <AiOutlineUserDelete
                size={20}
                onClick={(e) => {
                  props.onDeleteUserCliked(props.user);
                  e.stopPropagation();
                }}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}
