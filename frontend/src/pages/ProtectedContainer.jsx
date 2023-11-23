/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/reusable/Header";
import Route from "../components/reusable/Route";
import { Status } from "../components/reusable/Status";
import { useAuth } from "../utils/AuthContext";
import { Button } from "@mui/material";
const ProtectedContainer = (props) => {
  const { userRole, logOutUser } = useAuth()
  const location = useLocation()
  const [openSideNavigation, setOpenSideNavigation] = useState(false);

  return (
    <>
      {/* max-w-full 2xl:max-w-screen-2xl */}
      <Header />
      <div className="sticky w-full top-0 h-16"/>
      <div className="antialiased text-slate-600">

        <div className="bg-gray-100 h-screen">
          <div className="mx-auto static 2xl:relative bg-gray-50">
            <div className="flex sm:flex-col-reverse sm:justify-center md:flex-row">
              <div className="hidden md:block w-full sm:w-1/2  md:w-[28%] lg:w-[25%] ">
                <div
                  className={`hidden fixed 2xl:absolute left-0 w-full bg-mainBlueColor  sm:w-1/2  md:w-[24%] lg:w-1/5 md:block h-screen `}
                >
                  <div className=" flex flex-col w-full mt-10 lg:mx-2 2xl:m-10 opacity-80 hover:opacity-100 ">
                    <Route
                      onDismiss={() => setOpenSideNavigation(!openSideNavigation)}
                    />

                    <div
                      className={`  flex items-center shadow-gray-400 mb-2 p-2 rounded-full  ease-in duration-300 group`}
                    >
                      <NavLink to={'/logout'} onClick={logOutUser} className={'flex flex-row gap-6 w-full md:gap-6 group-hover:text-paleRed text-white'}>
                        <span className=" flex flex-row gap-6 text-sm md:text-md lg:text-[0.9rem] font-semibold justify-start tracking-wide">
                          <Logout />
                          Logout
                        </span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`w-full ${location.pathname.startsWith('/courses/submission/view/') ?'md:w-[75%]':'md:flex-grow'} px-2 md:px-4 lg:px-2 m-0 `}
                role="main"
              >
                <div className="sm:p-0 md:px-6 lg:pl-8 mt-4">
                  <div className="mx-auto px-2 sm:px-8 md:px-0 w-full ">{props.component}</div>
                </div>
              </div>
              {userRole !== "Admin" && (
                location.pathname.startsWith('/courses/submission/view/') && (
                  <div className="hidden lg:block w-[25%] mx-2 h-screen">
                    <div
                      className={`hidden fixed 2xl:absolute right-0 w-full  sm:w-1/2  md:w-[24%] lg:w-1/5 md:block h-screen `}
                    >
                      <div className="py-6">
                        <div className="w-full mx-auto sm:shadow-md rounded-md">
                          <Status />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedContainer;
