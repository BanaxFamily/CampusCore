// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import CoursesAdmin from './components/administrator/CoursesAdmin';
import ProfilesAdmin from './components/administrator/ProfilesAdmin';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  // 
  // PARTIALLY USED BOOLEAN TO CHECK IF USER EXIST DB
  // eslint-disable-next-line no-unused-vars
  const [isLog, setisLog] = useState(false);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      isLog ?
        // Displayed when user is not authenticated
        <Route path="/login" element={<Login />} />
        :
        // Displayed when user is authenticated
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="course" element={<CoursesAdmin />} />
          <Route path='/profile' element={<ProfilesAdmin />} />
        </Route>
    )
  );


  return (
    <RouterProvider router={routes} />
  )
}

export default App
