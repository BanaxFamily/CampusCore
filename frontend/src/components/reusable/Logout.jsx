import { NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

export default function Logout() {
  return (
    <div
      className={`flex flex-col  shadow-gray-400 mb-2 py-3 px-1 rounded-full
          hover:scale-110 ease-in duration-300 group
      `}
    >
      <NavLink
        to="/logout"
        className={` flex flex-row items-center group-hover:text-paleRed text-white`}
      >
        <IoLogOutOutline size={25}/>

        <span className="text-[15px] ml-2">Logout</span>
      </NavLink>
    </div>
  );
}
