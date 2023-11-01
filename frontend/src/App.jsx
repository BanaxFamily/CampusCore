// eslint-disable-next-line no-unused-vars
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import NotFound from './components/NotFound';
import CoursesAdmin from './components/administrator/CoursesAdmin';
import AuthContainer from "./pages/AuthContainer";

export default function App() {
  const state = true
  const user = {
    'admin': false,
    'student': true,
    'dean': false,
    'faculty': false,
  }
  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" >
        
        <Route path="login" element={<Login state={state}/>} />

        <Route element={<AuthContainer state={state}/>}>
          <Route index element={<Home />} />
          {/* ADD ROUTES THAT BASED ON USER TYPES */}
          <Route path="courses" element={<CoursesAdmin />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>

    )
  )



  return (
    <RouterProvider router={router} />
  )
}