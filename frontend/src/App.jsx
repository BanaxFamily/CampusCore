// eslint-disable-next-line no-unused-vars
import { StyledEngineProvider } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ManageCourse from "./components/administrator//course-layout/ManageCourse";
import ManageRepo from "./components/administrator/ManageRepo";
import CourseLoad from "./components/administrator/courseloads/CourseLoad";
import GenerateReport from "./components/administrator/report/GenerateReport";
import ManageUsers from "./components/administrator/user-wrapper/ManageUsers";
import Login from "./components/reusable/Login";
import NotFound from "./components/reusable/NotFound";
import ManageProfile from "./components/shared-route/ManageProfile";
import Home from "./components/shared-route/home/Home";
import CourseStudent from "./components/student/courses/CourseStudent";
import DeliverableStudent from "./components/student/deliverable/DeliverableStudent";
import Issues from "./components/student/issues/Issues";
import ResearchRepo from "./components/student/repo/ResearchRepo";
import UserSetting from "./components/student/settings/UserSetting";
import Timetable from "./components/student/timetable/Timetable";
import * as CourseApi from "./network/course_api";
import * as UserApi from "./network/user_api";
import MainContents from "./pages/MainConents";
import DeanDeliverables from "./components/dean/deliverables/DeanDeliverables";
import DeanCourses from "./components/dean/courses/DeanCourses";


export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userRole, setUserRole] = useState("")
  useEffect(() => {
    if (loggedInUser) {
      // EXTRACT THE USER ROLE FROM THE TOKEN
      
      localStorage.setItem('role', loggedInUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      setUserRole(localStorage.getItem('role'))
    }
  }, [loggedInUser]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="login" element={<Login isLoginSuccessful={(credentials) => { setLoggedInUser(credentials); }} />} />

        <Route element={<MainContents user_role={localStorage.getItem('role')} />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="manage/profile" element={<ManageProfile />} />

          {userRole === "Student" && (
            <>
              <Route path="research" element={<ResearchRepo />} />
              <Route path="course" element={<CourseStudent />} />
              <Route path="deliverable" element={<DeliverableStudent />} />
              <Route path="issues" element={<Issues />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="settings" element={<UserSetting />} />
            </>
          )}

          {userRole === "Admin" && (
            <>
              <Route path="manage/course" loader={async () => { return CourseApi.viewCourse(); }} element={<ManageCourse />} />
              <Route path="manage/user" loader={async () => { return UserApi.viewUser(); }} element={<ManageUsers />} />
              <Route path="faculty/course/loads" loader={async () => { return UserApi.viewUser(); }} element={<CourseLoad />} />
              <Route path="faculty element"></Route>
              <Route path="manage/repository/*" element={<ManageRepo />} />
              <Route path="reports" element={<GenerateReport />}></Route>
            </>
          )}

          {userRole === "Dean" && (
            <>
              <Route path="/deliverable-management" element={<DeanDeliverables/>}/>
              <Route path="/courses" element={<DeanCourses/>}/>
            </>
          )}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <StyledEngineProvider>
      <RouterProvider router={router} />;
    </StyledEngineProvider>
  );
}
