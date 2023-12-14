import DashBoardHeading from "../../reusable/DashBoardHeading"
import CourseLoadWrapper from "./CourseLoadWrapper"
export default function CourseLoad() {
  return (
    <div className="2xl:w-3/4 2xl:mx-auto ">
        <DashBoardHeading title="Faculty course loads" desc="Offered course management UI "/>
        <CourseLoadWrapper/>
    </div>
  )
}
