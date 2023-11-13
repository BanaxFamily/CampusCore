/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Header } from "../components/reusable/Header";
import Route from "../components/reusable/Route";
import { Status } from "../components/reusable/Status";
import Main from "../components/reusable/Main";
import { Logout } from "@mui/icons-material";

const ProtectedContainer = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openSideNavigation, setOpenSideNavigation] = useState(false);
  return (
    <>
      <div className="mx-auto max-w-full 2xl:max-w-7xl static 2xl:relative">
        <Header />
        <div className="flex sm:flex-col-reverse sm:justify-center md:flex-row ">
          <div className="hidden md:block w-full sm:w-1/2  md:w-[28%] lg:w-[25%]">
            <div
              className={`hidden fixed 2xl:absolute left-0 w-full sm:w-1/2  md:w-[24%] lg:w-1/5
                md:block h-screen bg-mainBlueColor`}
            >
              <div className=" flex flex-col w-full mt-10 opacity-80 hover:opacity-100 ">
                <Route
                  userType={props.userType}
                  onDismiss={() => setOpenSideNavigation(!openSideNavigation)}
                />

                <div
                  className={`  flex items-center shadow-gray-400 mb-2 p-2 rounded-full hover:scale-90 ease-in duration-300 group`}
                >
                  <NavLink to={"/logout"} className={'flex flex-row gap-6 w-full md:gap-6 group-hover:text-paleRed text-white'}>
                    <span className=" flex flex-row gap-6 text-[14px] sm:text-lg md:text-sm lg:text-sm justify-start tracking-wide">
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
            <div className="p-6 sm:p-0 sm:px-6 mt-4">
              <div className="mx-auto w-full ">{props.component}</div>
            </div>
          </div>
          {props.userType !== "Admin" && (
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
    </>
  );
};

export default ProtectedContainer;
