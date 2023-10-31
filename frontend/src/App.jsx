// eslint-disable-next-line no-unused-vars
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import CoursesAdmin from "./components/administrator/CoursesAdmin";
import CourseStudent from "./components/student/CourseStudent";
import FileStudent from "./components/student/FileStudent";
import AuthContainer from "./pages/AuthContainer";
import { useState } from "react";

export default function App() {
  const [loggdInUser, setLoggedInUser] = useState(null);

  // const state = true;
  const user = {
    type: "admin",
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path="login"
          element={
            <Login
              state={loggdInUser}
              isLoginSuccessful={(credentials) => {
                setLoggedInUser(credentials);
              }}
            />
          }
        />

        <Route element={<AuthContainer state={loggdInUser} userType={user.type} />}>
          <Route index element={<Home />} />
          {user.type === "student" && (
            <>
              <Route path="course" element={<CourseStudent />} />
              <Route path="files" element={<FileStudent />} />
            </>
          )}
          {user.type === "admin" && (
            <Route path="/course" element={<CoursesAdmin />} />
          )}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
