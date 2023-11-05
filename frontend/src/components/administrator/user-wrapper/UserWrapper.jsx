import { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import * as UserApi from "../../../network/user_api";
import TableBody from "../TableBody";

export default function UserWrapper() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await UserApi.viewUser();
      setUsers(response.data);
    }
    loadUsers();
  }, []);

  return (
    <div className="mt-12 mx-2">
      <div className="border-x-2 px-1">
        <div className="text-center border-b-2 shadow-md rounded-sm">
          <div className="bg-mainBlueColor rounded-md text-white w-full">
            <form action="" className="flex px-2 pl-4 rounded-md ">
              <div className=" flex items-center justify-start sm:justify-end sm:px-4 w-full text-white tracking-wider">
                <label htmlFor="">Search</label>
                <input
                  type="text"
                  placeholder="search..."
                  className=" px-4 w-full sm:w-min border-none ml-2 py-2"
                />
                <button className="cursor-pointer">
                  <BsSearch className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-2 py-2 overflow-auto">
            <div className="flex ">
              <div className="bg-blue-600 px-4 py-2 rounded-md">
                <NavLink
                  to="../user/register"
                  relative="path"
                  className="text-sm flex items-center gap-1 text-white uppercase px-2 "
                >
                  {" "}
                  Add
                  <AiOutlineUserAdd />
                </NavLink>
              </div>
              
            </div>
            <table className="table-auto text-center border-collapse min-w-[550px] lg:min-w-0 border">
              <thead className="uppercase border border-slate-400 px-2">
                <tr className="text-[12px]">
                  <td className="border border-slate-300">ID</td>
                  <td className="border border-slate-300">username</td>
                  <td className="border border-slate-300">firstname</td>
                  <td className="border border-slate-300">lastname</td>
                  <td className="border border-slate-300">status</td>
                  <td className="border border-slate-300">role</td>
                </tr>
              </thead>
              {users.map((user, index) => (
                <TableBody
                  className="border border-slate-300"
                  key={index}
                  id={user.id}
                  username={user.username}
                  firstname={user.firstName}
                  lastname={user.lastName}
                  status={user.status}
                  role={user.status}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
