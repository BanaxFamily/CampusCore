import { useOutlet } from "react-router-dom";
import DashBoardHeading from "../reusable/DashBoardHeading";
import UserWrapper from "./user-wrapper/UserWrapper";
export default function ManageUsers() {
  const checkOutlet = useOutlet();
  return (
    <div>
      {checkOutlet || (
        <>
          <DashBoardHeading title="User management" />
          <UserWrapper/>
        </>
      )}
    </div>
  );
}
