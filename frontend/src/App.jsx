// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from './components/Login';
import CoursesAdmin from './components/administrator/CoursesAdmin';
import ProtectedRoute from './pages/ProtectedRoute';
import NotFound from './components/NotFound';
import { AuthProvider } from './components/utils/Auth';

export default function App() {


  return (
    <AuthProvider>

      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<CoursesAdmin />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    
    </AuthProvider>
  )
}