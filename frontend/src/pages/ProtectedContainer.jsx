/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Header } from "../components/reusable/Header";
import Route from "../components/reusable/Route";
import { Status } from "../components/reusable/Status";
import { useAuth } from "../utils/AuthContext";
import { Button } from "@mui/material";

const ProtectedContainer = (props) => {
  const { userRole, logOutUser } = useAuth()
  const [openSideNavigation, setOpenSideNavigation] = useState(false);

  return (
    <>
      {/* max-w-full 2xl:max-w-screen-2xl */}
      <div className="antialiased text-slate-600 bg-gray-50">

        <div className="mx-auto static 2xl:relative ">
          <Header />
          <div className="flex sm:flex-col-reverse sm:justify-center md:flex-row  ">
            <div className="hidden md:block w-full sm:w-1/2  md:w-[28%] lg:w-[25%] border-r">
              <div
                className={`hidden fixed 2xl:absolute left-0 w-full sm:w-1/2  md:w-[24%] lg:w-1/5
                md:block h-screen `}
              >
                <div className=" flex flex-col w-full mt-10 lg:mx-2 xl:m-10 opacity-80 hover:opacity-100 ">
                  <Route
                    onDismiss={() => setOpenSideNavigation(!openSideNavigation)}
                  />

                  <div
                    className={`  flex items-center shadow-gray-400 mb-2 p-2 rounded-full  ease-in duration-300 group`}
                  >
                    <NavLink to={'/logout'} onClick={logOutUser} className={'flex flex-row gap-6 w-full md:gap-6 group-hover:text-paleRed text-black'}>
                      <span className=" flex flex-row gap-6 text-[14px] md:text-md lg:text-lg justify-start tracking-wide">
                        <Logout />
                        Logout
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-full md:w-[85%] m-0 border-r h-screen border-slate-400"
              role="main"
            >
              <div className="sm:p-0 md:px-6 lg:pl-8 mt-4">
                <div className="mx-auto px-2 sm:px-8 md:px-0 w-full ">{props.component}</div>
              </div>
            </div>
            {userRole !== "Admin" && (
              <div className="hidden lg:block w-[23%] mx-2">
                <div className="py-6">
                  <div className="w-full mx-auto sm:shadow-md">
                    <Status />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedContainer;
