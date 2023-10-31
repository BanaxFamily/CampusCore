// eslint-disable-next-line no-unused-vars
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import NotFound from './components/NotFound';
import CourseStudent from "./components/student/CourseStudent";
import AuthContainer from "./pages/AuthContainer";
import CoursesAdmin from './components/administrator/CoursesAdmin'
import FileStudent from "./components/student/FileStudent";

export default function App() {
  const state = true
  const user = {
    'type': 'admin'
  }
  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" >

        <Route path="login" element={<Login state={state} userType={user.type} />} />

        <Route element={<AuthContainer state={state} />}>
          <Route index element={<Home />} />
          {
            user.type === 'student' &&
            <>
              <Route path="course" element={<CourseStudent />} />
              <Route path="files" element={<FileStudent />} />
            </>

          }
          {
            user.type === 'admin' && <Route path="/course" element={<CoursesAdmin />} />
          }


        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>

    )
  )



  return (
    <RouterProvider router={router} />
  )
}