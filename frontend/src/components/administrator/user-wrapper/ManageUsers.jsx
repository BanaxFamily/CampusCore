import { useOutlet } from "react-router-dom";
import DashBoardHeading from "../../reusable/DashBoardHeading";
import UserWrapper from "./UserWrapper";
export default function ManageUsers() {
  const checkOutlet = useOutlet();
  
  return (
    <>
      {checkOutlet || (
        <>
          <DashBoardHeading title="User management" desc="First Semester 2022 - 2023"/>
          <UserWrapper />
        </>
      )}
    </>
  );
}
