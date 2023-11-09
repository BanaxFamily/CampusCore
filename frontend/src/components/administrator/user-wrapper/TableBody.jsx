/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineCheckCircle, AiOutlineUserDelete } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

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

          <td>
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
          </td>
          <td>
            <div className=" flex items-center justify-center">
              <button
                className="text-sm flex self-center text-green-500 px-
                hover:text-green-900 hover:cursor-pointer"
              >
                <FaPencil size={20} onClick={props.showModalUpdate} />
              </button>
            </div>
          </td>
          <td>
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
          </td>
        </tr>
      </tbody>
    </>
  );
}
