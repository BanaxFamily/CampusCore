import { useLoaderData } from "react-router-dom";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import CourseWrapper from "./CourseWrapper"

export default function ManageCourse() {
  const course = useLoaderData()
  return (
    <div>
      <DashBoardHeading title="Course"  desc="UI for managing course"/>
      <CourseWrapper courses={course}/>
     </div>
  );
}
