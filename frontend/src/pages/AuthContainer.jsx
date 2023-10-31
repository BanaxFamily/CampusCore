import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import Main from "../components/Main";
import { Status } from "../components/Status";
import StudentLinks from "../components/student/StudentLinks";
import AdminLinks from "../components/administrator/AdminLinks";

const AuthContainer = ({ state, userType }) => {
  if (!state) return <Navigate to="/login" replace={true} />;
  return (
    <>
      <Header />
      <div className="sm:block hidden fixed top-[25%] ml-2 opacity-80 hover:opacity-100">
        {userType === "admin" ? <AdminLinks /> : <StudentLinks />}
      </div>

      <div className="max-w-7xl md:px-8 lg:px-16 flex h-screen overflow-hidden">
        <div className="mx-auto w-full md:w-10/12 overflow-auto">
          <div className="h-full pt-2">
            <Main />
          </div>
        </div>

        <div className="hidden md:block w-1/4 pt-2 overflow-auto">
          <Status />
        </div>
      </div>
    </>
  );
};

AuthContainer.propTypes = {
  state: PropTypes.bool,
  userType: PropTypes.string,
};

export default AuthContainer;
