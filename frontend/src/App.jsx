// eslint-disable-next-line no-unused-vars
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ManageRepo from "./components/administrator/ManageRepo";
import ManageCourse from "./components/administrator/course-layout/ManageCourse";
import CourseLoad from "./components/administrator/courseloads/CourseLoad";
import CourseLoadLayout from "./components/administrator/courseloads/CourseLoadLayout";
import EnrolledStudents from "./components/administrator/courseloads/EnrolledStudents";
import GenerateReport from "./components/administrator/report/GenerateReport";
import ManageUsers from "./components/administrator/user-wrapper/ManageUsers";
import CourseLayout from "./components/dean/courses/CourseLayout";
import DeanCourses from "./components/dean/courses/DeanCourses";
import Submission from "./components/dean/courses/submission/Submissions";
import View from "./components/dean/courses/submission/View";
import DeanDeliverables from "./components/dean/deliverables/DeanDeliverables";
import Deliverables from "./components/dean/deliverables/Deliverables";
import FinalDeliverables from "./components/faculty/FinalDeliverables";
import Layout from "./components/faculty/Layout";
import CourseAssigned from "./components/faculty/assignedcourse/CourseAssigned";
import ViewSpecificCourse from "./components/faculty/assignedcourse/ViewSpecificCourse";
import FacultyDeliverable from "./components/faculty/assignedcourse/deliverable/FacultyDeliverable";
import FacultyStudentGroups from "./components/faculty/assignedcourse/studentgroups/FacultyStudentGroups";
import FacultyUpdateAndAddGroupWrapper from "./components/faculty/assignedcourse/studentgroups/FacultyUpdateAndAddGroupsWrapper";
import Login from "./components/reusable/Login";
import NotFound from "./components/reusable/NotFound";
import ManageProfile from "./components/shared-route/ManageProfile";
import Home from "./components/shared-route/home/Home";
import CourseStudent from "./components/student/courses/CourseStudent";
import LayoutCourse from "./components/student/courses/LayoutCourse";
import ViewSpecificAnnouncement from "./components/student/courses/announcement/ViewSpecificAnnouncement";
import DeliverableWrapper from "./components/student/courses/deliverable/DeliverableWrapper";
import PdfViewer from "./components/student/courses/deliverable/PdfViewer";
import ViewSpecificDeliverable from "./components/student/courses/deliverable/ViewSpecificDeliverable";
import Issues from "./components/student/issues/Issues";
import ResearchRepo from "./components/student/repo/ResearchRepo";
import SettingWrapper from "./components/student/settings/SettingWrapper";
import Timetable from "./components/student/timetable/Timetable";
import * as CourseApi from "./network/course_api";
import * as UserApi from "./network/user_api";
import MainContents from "./pages/MainConents";
import { useAuth } from "./utils/AuthContext";


export default function App() {
  const { userRole } = useAuth()

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640, // Adjusted value for small screens
        md: 768, // Adjusted value for medium screens
        lg: 1024, // Adjusted value for large screens
        xl: 1200, // Adjusted value for extra-large screens
      },
    },
  });

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
              <Route path={`/course/*`} element={<LayoutCourse />}>
                <Route index element={<CourseStudent />} />
                <Route path={`information/:courseName/:offeredCourseId/*`} element={<LayoutCourse />} >
                  <Route index element={<DeliverableWrapper />} />
                  <Route path="announcements/view/:announcementId" element={< ViewSpecificAnnouncement />} />
                  <Route path="deliverable/:deliverableName/:deliverableId/:offeredCourseDeliverableId/*" element={<LayoutCourse />} >
                    <Route index element={<ViewSpecificDeliverable />} />
                    <Route path=":filePath" element={<PdfViewer />} />
                  </Route>
                </Route>
              </Route>
              <Route path={`/issues`} element={<Issues />} />
              <Route path={`/timetable`} element={<Timetable />} />
            </>
          )}
          {userRole === "Admin" && (
            <>
              <Route path={`manage/course`} loader={async () => { return CourseApi.viewCourse(); }} element={<ManageCourse />} />
              <Route path={`manage/user`} loader={async () => { return UserApi.viewUser(); }} element={<ManageUsers />} />
              <Route path={`faculty/course-loads/subjects/*`} element={<CourseLoadLayout />} >
                <Route index loader={async () => { return UserApi.viewUser(); }} element={<CourseLoad />} />
                <Route path=":courseName/:courseId/enrolled-students" element={<EnrolledStudents />} />
              </Route>
              <Route path={`manage/repository/*`} element={<ManageRepo />} />
              <Route path={`reports`} element={<GenerateReport />}></Route>
            </>
          )}
          {userRole === "Dean" && (
            <>
              <Route path={`/deliverable-management/*`} element={<CourseLayout />}>
                <Route index element={<DeanDeliverables />} />
                <Route path=":courseName/deliverables/:courseId/*" element={<CourseLayout />} >
                  <Route index element={<Deliverables />} />
                </Route>
              </Route>
              <Route path={`faculty/course-loads/subjects/*`} element={<CourseLoadLayout />} >
                <Route index loader={async () => { return UserApi.viewUser(); }} element={<CourseLoad />} />
                <Route path=":courseName/:courseId/enrolled-students" element={<EnrolledStudents />} />
              </Route>
              <Route path={`/courses/*`} element={<CourseLayout />}>
                <Route index element={<DeanCourses />} />
                <Route path={`submission`} element={<Submission />} />
                <Route path={`submission/view/file/:id`} element={<View />} />
              </Route>
            </>
          )}
          {userRole === "Faculty" && (
            <>
              <Route path={`course/assigned/*`} element={<Layout />} >
                <Route index element={<CourseAssigned />} />
                <Route path="offered-course/:courseName/:offeredCourseId/*" element={<Layout />} >
                  <Route index element={<ViewSpecificCourse />} />
                  <Route path="deliverable/management" element={<FacultyDeliverable />} />
                  <Route path="student/groups/*" element={<Layout />}>
                    <Route index element={<FacultyStudentGroups />} />
                    <Route path="add" element={<FacultyUpdateAndAddGroupWrapper />} />
                    <Route path="update/:groupName/:groupId" element={<FacultyUpdateAndAddGroupWrapper />} />
                  </Route>
                </Route>
              </Route>
              <Route path="faculty/course-loads/subjects" element={<FinalDeliverables />} />
            </>
          )}

          <Route path="/settings" element={<SettingWrapper />} />
          <Route path="/logout" element={<Navigate to="/login" />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
