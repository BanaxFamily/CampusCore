import Route from '../components/reusable/Route';
import ResearchRepo from '../components/student/repo/ResearchRepo';
import CourseStudent from '../components/student/courses/CourseStudent';
import DeliverableStudent from '../components/student/deliverable/DeliverableStudent';
import Issues from '../components/student/issues/Issues';
import Timetable from '../components/student/timetable/Timetable';
import UserSetting from '../components/student/settings/UserSetting';
import ManageCourse from '../components/administrator/course-layout/ManageCourse';
import CourseLoad from '../components/administrator/courseloads/CourseLoad';
import ManageRepo from '../components/administrator/ManageRepo';
import GenerateReport from '../components/administrator/report/GenerateReport';
import DeanDeliverables from '../components/dean/deliverables/DeanDeliverables';
import DeanCourses from '../components/dean/courses/DeanCourses';
import * as UserApi from '../network/user_api'
import * as CourseApi from '../network/course_api'
import { useAuth } from '../utils/AuthContext';
import ManageUsers from '../components/administrator/user-wrapper/ManageUsers';

export default function Private() {
  const {userRole} = useAuth()
  return (
    <Route>
      {userRole === "Student" && (
        <>
          <Route path={`/research`} element={<ResearchRepo />} />
          <Route path={`/course`} element={<CourseStudent />} />
          <Route path={`/deliverable`} element={<DeliverableStudent />} />
          <Route path={`/issues`} element={<Issues />} />
          <Route path={`/timetable`} element={<Timetable />} />
          <Route path={`/settings`} element={<UserSetting />} />
        </>
      )}
      {userRole === "Admin" && (
        <>
          <Route path={`manage/course`} loader={async () => { return CourseApi.viewCourse(); }} element={<ManageCourse />} />
          <Route path={`manage/user`} loader={async () => { return UserApi.viewUser(); }} element={<ManageUsers />} />
          <Route path={`faculty/course/loads`} loader={async () => { return UserApi.viewUser(); }} element={<CourseLoad />} />
          <Route path={`manage/repository/*`} element={<ManageRepo />} />
          <Route path={`reports`} element={<GenerateReport />}></Route>
        </>
      )}
      {userRole === "Dean" && (
        <>
          <Route path={`/deliverable-management`} element={<DeanDeliverables />} />
          <Route path={`/courses`} element={<DeanCourses />} />
        </>
      )}
    </Route>
  )
}
