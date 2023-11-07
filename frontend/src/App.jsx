// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import GenerateReport from "./components/administrator/report/GenerateReport";
import ManageCourse from "./components/administrator//course-layout/ManageCourse";
import ManageRepo from "./components/administrator/ManageRepo";
import Edit from "./components/administrator/user-wrapper/Edit";
import ManageUsers from "./components/administrator/user-wrapper/ManageUsers";
import { Register } from "./components/administrator/user-wrapper/Register";
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

        <Route element={<MainContents user_role={user_role}/>}>
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
            </>
          )}

          {user_role === "admin" && (
            <>
              {/* <Route path="manage/profile" element={<ManageProfile />} /> */}
              <Route path="manage/course" element={<ManageCourse />}>
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="manage/user/*" element={<ManageUsers />}>
                <Route path="edit/:role/:id" element={<Edit />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="manage/repository/*" element={<ManageRepo />}>
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="reports" element={<GenerateReport />} >
                
              </Route>
            </>
          )}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
