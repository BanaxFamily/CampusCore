// eslint-disable-next-line no-unused-vars
import { useState } from "react";
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
import CourseStudent from "./components/student/courses/CourseStudent";
import DeliverableStudent from "./components/student/deliverable/DeliverableStudent";
import Issues from "./components/student/issues/Issues";
import ResearchRepo from "./components/student/repo/ResearchRepo";
import Timetable from "./components/student/timetable/Timetable";
import * as CourseApi from "./network/course_api";
import * as UserApi from "./network/user_api";
import MainContents from "./pages/MainConents";
import Home from "./components/shared-route/home/Home";
import { StyledEngineProvider } from "@mui/material";
import UserSetting from "./components/student/settings/UserSetting";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  let user_role = "admin";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/*">
        <Route path="login" element={<Login session_user={loggedInUser} isLoginSuccessful={(credentials) => { setLoggedInUser(credentials); }} />} />

        <Route element={<MainContents user_role={user_role} />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="manage/profile" element={<ManageProfile />} />

          {user_role === "student" && (
            <>
              <Route path="research" element={<ResearchRepo />} />
              <Route path="course" element={<CourseStudent />} />
              <Route path="deliverable" element={<DeliverableStudent />} />
              <Route path="issues" element={<Issues />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="settings" element={<UserSetting />} />
            </>
          )}

          {user_role === "admin" && (
            <>
              <Route path="manage/course" loader={async () => { return CourseApi.viewCourse(); }} element={<ManageCourse />} />
              <Route path="manage/user" loader={async () => { return UserApi.viewUser(); }} element={<ManageUsers />}/>
              <Route path="faculty/course/loads" loader={async () => { return UserApi.viewUser(); }} element={<CourseLoad />}/>
              <Route path="faculty element"></Route>
              <Route path="manage/repository/*" element={<ManageRepo />} />
              <Route path="reports" element={<GenerateReport />}></Route>
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
