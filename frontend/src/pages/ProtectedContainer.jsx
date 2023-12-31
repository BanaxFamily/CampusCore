/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/reusable/Header";
import Route from "../components/reusable/Route";
import { Status } from "../components/reusable/Status";
import { useAuth } from "../utils/AuthContext";
import { Button, Stack, Typography } from "@mui/material";
const ProtectedContainer = (props) => {
  const { userRole, logOutUser } = useAuth()
  const location = useLocation()
  const [openSideNavigation, setOpenSideNavigation] = useState(false);

  return (
    <>
      {/* max-w-full 2xl:max-w-screen-2xl */}
      <Header />
      <div className="sticky w-full top-0 h-16" />
      <div className="antialiased text-slate-600">

        <div className=" h-screen">
          <div className="mx-auto static 2xl:relative">
            <div className="flex sm:flex-col-reverse sm:justify-center md:flex-row">
              <div className="hidden md:block w-full sm:w-[25rem] md:w-[14rem]  mr-2 ">
                <div className={`hidden fixed 2xl:absolute left-0 w-full bg-mainBlueColor  sm:w-1/2  md:w-[14rem] lg:pr-6 md:block h-screen `}>
                  <Stack className=" !flex-col w-full mt-6 lg:mx-2  ">
                    {/* <Typography className="!text-sm !text-center text-white">You are logged in as <span className="text-md font-bold underline underline-offset-4">{userRole}</span> </Typography> */}
                    <Route onDismiss={() => setOpenSideNavigation(!openSideNavigation)} />
                    <div className={`  flex items-center shadow-gray-400 mb-2 p-2 rounded-full  ease-in duration-300 group`}>
                      <NavLink to={'/logout'} onClick={logOutUser} className={'flex flex-row gap-6 w-full md:gap-6 text-[14px] group-hover:text-paleRed text-white'}>
                        <Logout />
                        Logout
                      </NavLink>
                    </div>
                  </Stack>
                </div>
              </div>
              {/* <div className={`w-full ${location.pathname.startsWith('/courses/submission/view/') ? 'md:w-[75%]' : 'md:flex-grow'} px-2 md:px-4 m-0 `} role="main"> */}
              <div className={`w-full px-2 md:px-4 m-0 `} role="main">
                <div className="sm:p-0 md:px-6 lg:pl mt-4">
                  <div className="mx-auto px-2 sm:px-8 md:px-0 lg:p-0  ">{props.component}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedContainer;
