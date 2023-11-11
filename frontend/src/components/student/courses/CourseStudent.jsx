import { useEffect } from "react";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import * as CourseApi from "../../../network/course_api";
import EnrolledCourse from "../../reusable/EnrolledCourse";
import Semester from "../../reusable/Semester";

const course = [
  "rescom",
  "lit",
  "english",
  "capstone",
  "capstone",
  "capstone",
  "capstone",
  "capstone",
  "capstone",
  "capstone",
  "capstone",
  "capstone",
  "capstone",
  "capstone",
  "practicum",
];

const CourseStudent = () => {
  useEffect(() => {
    async function loadCourse() {
      const response = await CourseApi.getCourse();
      const course = await response.json();
      console.log(course);
    }
    loadCourse();
  }, []);
  return (
    <div className=" border-x">
      <DashBoardHeading title="student courses" />
      <Semester sem="1st SEMESTER" />
      <div className="w-full rounded-sm">
        <div className="h-fit  my-4 mx-4 ">
          <EnrolledCourse subject={course} />
        </div>
      </div>
    </div>
  );
};

export default CourseStudent;
