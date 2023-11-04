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
        <div className="flex sm:flex-col-reverse md:flex-row sm:mx-auto">
          <div className=" hidden sm:block w-[20%] min-h-screen bg-mainBlueColor">
            <div className=" fixed left-0">
              <div className="md:block hidden w-full mt-10 opacity-80 hover:opacity-100 ">
                <div className="fixed left-0">
                  {/* <Route userType="admin" /> */}
                  <Route userType={props.userType} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[90%] m-0" role="main">
            <div className="p-6">
              <div className="mx-auto w-full ">{props.component}</div>
            </div>
          </div>

          <div className="hidden sm:block sm:w-full md:w-[30%] overflow-auto m-0">
            <div className="py-6">
              <div className="w-full mx-auto">
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
