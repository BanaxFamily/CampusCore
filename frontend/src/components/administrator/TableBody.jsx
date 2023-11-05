/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function TableBody(props) {
  return (
    <>
      <tbody className="text-[13px]">
        <tr>
          <td className={props.className }>{props.id !== null ? props.id : "null"}</td>
          <td className={props.className }>{props.username !== null ? props.username : "null"}</td>
          <td className={props.className }>{props.firstname !== null ? props.firstname : "null"}</td>
          <td className={props.className }>{props.lastname !== null ? props.lastname : "null"}</td>
          <td className={props.className }>{props.status !== null ? props.status : "null"}</td>
          <td className={props.className }>{props.role !== null ? props.role : "null"}</td>
        </tr>
      </tbody>  
    </>
  );
}
