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
import Submission from "./components/dean/courses/submission/Submissions";
import DeanDeliverables from "./components/dean/deliverables/DeanDeliverables";
import Deliverables from "./components/dean/deliverables/Deliverables";
import DeanPublishRequest from "./components/dean/publishrequest/DeanPublishRequest";
import FinalDeliverables from "./components/faculty/FinalDeliverables";
import Layout from "./components/faculty/Layout";
import FacultyAdvisory from "./components/faculty/advisory/FacultyAdvisory";
import CourseAssigned from "./components/faculty/assignedcourse/CourseAssigned";
import ViewSpecificCourse from "./components/faculty/assignedcourse/ViewSpecificCourse";
import FacultyDeliverable from "./components/faculty/assignedcourse/deliverable/FacultyDeliverable";
import FacultyStudentGroups from "./components/faculty/assignedcourse/studentgroups/FacultyStudentGroups";
import FacultyUpdateAndAddGroupWrapper from "./components/faculty/assignedcourse/studentgroups/FacultyUpdateAndAddGroupsWrapper";
import FacultyShowAllDeliverables from "./components/faculty/assignedcourse/submissions/FacultyShowAllDeliverables";
import FacultyViewSpecificDeliverables from "./components/faculty/assignedcourse/submissions/FacultyViewSpecificDeliverables";
import FacultyViewSubmission from "./components/faculty/assignedcourse/submissions/FacultyViewSubmission";
import PrcApprovedSubmissions from "./components/prc/PrcApprovedSubmissions";
import Login from "./components/reusable/Login";
import NotFound from "./components/reusable/NotFound";
import ManageProfile from "./components/shared-route/ManageProfile";
import SharedRepository from "./components/shared-route/SharedRepository";
import Home from "./components/shared-route/home/Home";
import CourseStudent from "./components/student/courses/CourseStudent";
import LayoutCourse from "./components/student/courses/LayoutCourse";
import ViewSpecificAnnouncement from "./components/student/courses/announcement/ViewSpecificAnnouncement";
import DeliverableWrapper from "./components/student/courses/deliverable/DeliverableWrapper";
import PdfViewer from "./components/student/courses/deliverable/PdfViewer";
import ViewSpecificDeliverable from "./components/student/courses/deliverable/ViewSpecificDeliverable";
import ResearchRepo from "./components/student/repo/ResearchRepo";
import SettingWrapper from "./components/student/settings/SettingWrapper";
import * as CourseApi from "./network/course_api";
import * as UserApi from "./network/user_api";
import MainContents from "./pages/MainConents";
import { useAuth } from "./utils/AuthContext";
import DeanResearchTeams from "./components/dean/researchteams/DeanResearchTeams";


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
                  <Route path="deliverable/:deliverableName/:deliverableId/:offeredCourseDeliverableId/group/:groupId/*" element={<LayoutCourse />} >
                    <Route index element={<ViewSpecificDeliverable />} />
                    <Route path=":submissionId" element={<PdfViewer />} />
                  </Route>
                </Route>
              </Route>
            </>
          )}
          {userRole === "Admin" && (
            <>
              <Route path={`manage/course`} loader={async () => { return CourseApi.viewCourse(); }} element={<ManageCourse />} />
              <Route path={`manage/user`} loader={async () => { return UserApi.viewUser(); }} element={<ManageUsers />} />
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
              <Route path={`/submissions/*`} element={<CourseLayout />}>
                <Route index element={<Submission />} />
                <Route path=":submissionId" element={<FacultyViewSubmission />} />
              </Route>
              <Route path="/publish-request" element={<DeanPublishRequest />} />
              <Route path="teams" element={<DeanResearchTeams />} />

            </>
          )}
          {userRole === "Faculty" && (
            <>
              <Route path={`course/assigned/*`} element={<Layout />} >
                <Route index element={<CourseAssigned />} />
                <Route path="offered-course/:courseName/:offeredCourseId/:hasRetainableGroup/*" element={<Layout />} >
                  <Route index element={<ViewSpecificCourse />} />
                  <Route path="deliverable/management" element={<FacultyDeliverable />} />
                  <Route path="student/groups/*" element={<Layout />}>
                    <Route index element={<FacultyStudentGroups />} />
                    <Route path="add" element={<FacultyUpdateAndAddGroupWrapper />} />
                    <Route path="update/members/:groupName/:groupId" element={<FacultyUpdateAndAddGroupWrapper />} />
                    <Route path="update/group-details/:groupName/:groupId/:groupAdviserId" element={<FacultyUpdateAndAddGroupWrapper />} />
                  </Route>
                  <Route path="submissions/*" element={<Layout />}>
                    <Route index element={<FacultyShowAllDeliverables />} />
                    <Route path="deliverable/:deliverableName/:deliverableId/:offeredCourseDeliverableId/*" element={<Layout />}>
                      <Route index element={<FacultyViewSpecificDeliverables />} />
                      <Route path=":submissionId" element={<FacultyViewSubmission />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route path="/advisory/*" element={<Layout />} >
                <Route index element={<FacultyAdvisory />} />
                <Route path=":submissionId" element={<FacultyViewSubmission />} />
              </Route>

              <Route path="faculty/course-loads/subjects" element={<FinalDeliverables />} />
            </>
          )}
          {userRole === "PRC" && (
            <>
              <Route path={`/approval/submission/*`} element={<Layout />} >
                <Route index element={<PrcApprovedSubmissions />} />
                <Route path=":submissionId" element={<FacultyViewSubmission />} />
              </Route>
            </>
          )}
          <Route path="/repository/*" element={<Layout />}>
            <Route index element={<SharedRepository />} />
            <Route path=":researchId" element={<PdfViewer />} />
          </Route>
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
