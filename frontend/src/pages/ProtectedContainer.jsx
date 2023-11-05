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

  // if (!props.userSignedIn) return <Navigate to="/login" replace={true} />;
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl ">
        {/* <div className="flex sm:flex-col-reverse md:flex-row sm:justify-center items-center"> */}
        <div className="flex sm:flex-col-reverse sm:justify-center md:flex-row ">
          <div className=" hidden relative md:block w-[350px] lg:w-[20%] min-h-screen bg-mainBlueColor">
            <div className=" ">
              <div className="md:block relative hidden w-full mt-10 opacity-80 hover:opacity-100 ">
                <div className="absolute  left-0 top-0">
                  {/* <Route userType="admin" /> */}
                  <Route userType={props.userType} />
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full md:w-[80%] m-0 border-x border-slate-400"
            role="main"
          >
            <div className="p-6 sm:p-0 sm:px-6 mt-4">
              <div className="mx-auto w-full ">{props.component}</div>
            </div>
          </div>

          <div className="hidden overflow-auto mx-auto w-[80%] md:block md:mx-auto md:w-[30%] ">
            <div className="py-6">
              <div className="w-full mx-auto sm:shadow-md">
                <Status />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedContainer;
