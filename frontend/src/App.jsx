// eslint-disable-next-line no-unused-vars
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageCourse from "./components/administrator//course-layout/ManageCourse";
import ManageRepo from "./components/administrator/ManageRepo";
import CourseLoad from "./components/administrator/courseloads/CourseLoad";
import GenerateReport from "./components/administrator/report/GenerateReport";
import ManageUsers from "./components/administrator/user-wrapper/ManageUsers";
import DeanDeliverables from "./components/dean/deliverables/DeanDeliverables";
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
import { useAuth } from "./utils/AuthContext";
import SampleLogout from "./components/reusable/SampleLogout";
// import React from "react";
// import { LinearProgress } from "@mui/material";
import { NotAccessible } from "@mui/icons-material";
import DeanCourses from "./components/dean/courses/DeanCourses";

// const LazyDeanCourse = React.lazy(() => import("./components/dean/courses/DeanCourses"))

export default function App() {
  // const userRole = localStorage.getItem('role')
  const { userRole } = useAuth()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route path="/login" element={<Login />} />

        <Route element={<MainContents />}>
          <Route path={`/`} element={<Home />} />
          <Route path={`/home`} element={<Home />} />
          <Route path={`/manage/profile`} element={<ManageProfile />} />
          {userRole === "Student" && (
            <>
              <Route path={`/research`} element={<ResearchRepo />} />
              <Route path={`/course`} element={<CourseStudent />} />
              <Route path={`/deliverable`} element={<DeliverableStudent />} />
              <Route path={`/issues`} element={<Issues />} />
              <Route path={`/timetable`} element={<Timetable />} />
              <Route path={`/settings`} element={<UserSetting />} />
            </>
          )}
          {userRole === "Admin" && (
            <>
              <Route path={`manage/course`} loader={async () => { return CourseApi.viewCourse(); }} element={<ManageCourse />} />
              <Route path={`manage/user`} loader={async () => { return UserApi.viewUser(); }} element={<ManageUsers />} />
              <Route path={`faculty/course/loads`} loader={async () => { return UserApi.viewUser(); }} element={<CourseLoad />} />
              <Route path={`manage/repository/*`} element={<ManageRepo />} />
              <Route path={`reports`} element={<GenerateReport />}></Route>
            </>
          )}
          {userRole === "Dean" && (
            <>
              <Route path={`/deliverable-management`} element={<DeanDeliverables />} />
              <Route path={`/courses`} element={
                // <React.Suspense fallback={<LinearProgress />}>
                <DeanCourses />
                // </React.Suspense>
              }
                errorElement={<p>Oops! Something Went Wrong <NotAccessible /></p>}
              />
            </>
          )}
          <Route path="/logout" element={<SampleLogout />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}
