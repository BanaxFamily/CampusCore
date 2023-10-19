/* eslint-disable react/jsx-no-comment-textnodes */
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Home"
import CourseStudent from './student/CourseStudent'
import CoursesAdmin from './administrator/CoursesAdmin'
import ProfilesAdmin from './administrator/ProfilesAdmin'

const Main = () => {
  return (
    <div className="w-full flex flex-col justify-start px-4">
      <Routes>
        {/* This line is for the general users */}
        <Route exact path='/' element={<Home />} />

        //#region Courses Routes Add conditional rendering when API is integrated
        {/* <Route path='/course' element={<CourseStudent/>}/> */}
        <Route path='/course' element={<CoursesAdmin />} />
        //#endregion

        //#region Profiles Routes Add conditional rendering when API is integrated          
        <Route path='/profile' element={<ProfilesAdmin />} />
        //#endregion


      </Routes>
    </div>
  )
}

export default Main 