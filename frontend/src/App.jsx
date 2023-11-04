// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import GenerateReport from "./components/administrator/GenerateReport";
import ManageCourse from "./components/administrator/ManageCourse";
import ManageUsers from "./components/administrator/ManageUsers";
import CourseWrapper from "./components/administrator/course-layout/CourseWrapper";
import Edit from "./components/administrator/user-wrapper/Edit";
import Login from "./components/reusable/Login";
import NotFound from "./components/reusable/NotFound";
import Home from "./components/shared-route/Home";
import ManageProfile from "./components/shared-route/ManageProfile";
import CourseStudent from "./components/student/CourseStudent";
import DeliverableStudent from "./components/student/DeliverableStudent";
import Issues from "./components/student/Issues";
import ResearchRepo from "./components/student/ResearchRepo";
import Timetable from "./components/student/Timetable";
import MainContents from "./pages/MainConents";


export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  let user_role = "admin";

  // if (loggedInUser) {
  //   session_user = loggedInUser;
  //   console.log(typeof(session_user))
  // }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/*">
        <Route
          path="login"
          element={
            <Login
              session_user={loggedInUser}
              isLoginSuccessful={(credentials) => {
                setLoggedInUser(credentials);
              }}
            />
          }
        />

        <Route element={<MainContents/>}>
          <Route index element={<Home />} />
          <Route path="manage/profile" element={<ManageProfile />} />
          {user_role === "student" && (
            <>
              <Route path="research" element={<ResearchRepo />} />
              <Route path="course" element={<CourseStudent />} />
              <Route path="deliverable" element={<DeliverableStudent />} />
              <Route path="issues" element={<Issues />} />
              <Route path="timetable" element={<Timetable />} />
            </>
          )}

          {user_role === "admin" && (
            <>
              {/* <Route path="manage/profile" element={<ManageProfile />} /> */}
              <Route path="manage/course" element={<CourseWrapper />}>
                <Route index element={<ManageCourse />} />
              </Route>
              <Route path="manage/user/*" element={<ManageUsers />}>
                <Route path="admin/:id" element={<Edit />} />
              </Route>
              <Route path="reports" element={<GenerateReport />} />
            </>
          )}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
