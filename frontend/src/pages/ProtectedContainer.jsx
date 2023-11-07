/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../components/reusable/Header";
import Route from "../components/reusable/Route";
import { Status } from "../components/reusable/Status";
import Main from "../components/reusable/Main";

const ProtectedContainer = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openSideNavigation, setOpenSideNavigation] = useState(false);

  console.log(props.userType);

  // if (!props.userSignedIn) return <Navigate to="/login" replace={true} />;
  return (
    <>
      <div className="mx-auto max-w-7xl ">
        <Header
          // isOpen={() => setOpenSideNavigation(!openSideNavigation)}
          // state={openSideNavigation}
        />
        {/* <div className="flex sm:flex-col-reverse md:flex-row sm:justify-center items-center"> */}
        <div className="flex sm:flex-col-reverse sm:justify-center md:flex-row ">
          <div className="hidden md:block w-full sm:w-1/2  md:w-[28%] lg:w-[25%]">
            {/* {openSideNavigation && (
              <div
                className={` text-center px-8 fixed left-0 w-full sm:w-1/2  md:w-[24%] lg:w-1/5
                md:block h-screen bg-mainBlueColor/90  z-50`}
              >
                <div className="w-full mt-10 opacity-80 hover:opacity-100 ">
                  <Route
                    userType={props.userType}
                    onDismiss={() => setOpenSideNavigation(!openSideNavigation)}
                  />
                </div>
              </div>
            )} */}

            <div
              className={`hidden fixed left-0 w-full sm:w-1/2  md:w-[24%] lg:w-1/5
                md:block h-screen bg-mainBlueColor`}
            >
              <div className="w-full mt-10 opacity-80 hover:opacity-100 ">
                <Route
                  userType={props.userType}
                  onDismiss={() => setOpenSideNavigation(!openSideNavigation)}
                />
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
          {props.userType !== "admin" && (
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
