import { Link } from "react-router-dom";
import DashBoardHeading from "../reusable/DashBoardHeading";

export default function ManageCourse() {
  return (
    <div>
      <DashBoardHeading title="Course management" />
      <div>
        <div className="">
          <div>
            <Link to="">All Courses</Link>
            <Link to="">Offered Courses</Link>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
