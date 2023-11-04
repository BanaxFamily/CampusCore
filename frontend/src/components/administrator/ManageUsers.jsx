import { Link } from "react-router-dom";
import DashBoardHeading from "../reusable/DashBoardHeading";

export default function ManageUsers() {
  return (
    <div>
      <DashBoardHeading title="User management" />
      <Link to={`/manage/user/${1231}`}>Go tooo</Link>
    </div>
  );
}
