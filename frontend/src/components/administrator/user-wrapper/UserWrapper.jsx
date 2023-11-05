import { AiOutlineUserAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function UserWrapper() {
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
                    <AiOutlineUserAdd/>
                  </NavLink>
                </div>
                
              </div>
              <table className="table-auto min-w-[550px] lg:min-w-0 border">
                <thead className="uppercase text-center border-2 border-slate-500 px-2">
                  <tr className="text-[12px]">
                    <td>firstname</td>
                    <td>lastname</td>
                    <td>middlename</td>
                    <td>id no</td>
                    <td>year</td>
                    <td>course</td>
                    <td>last enrolled</td>
                    <td>role</td>
                    <td>status</td>
                    <td colSpan={2}>action</td>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}