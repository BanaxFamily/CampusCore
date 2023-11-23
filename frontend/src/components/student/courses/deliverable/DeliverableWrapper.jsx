import { Divider, Stack } from "@mui/material";
import DashBoardHeading from "../../../reusable/DashBoardHeading";
import BreadCrumb from "../../../reusable/BreadCrumb";
import BackNav from "../../../reusable/BackNav";
import { useParams } from "react-router-dom";

export default function DeliverableWrapper() {
    let {courseName} = useParams()
    const breadCrumbUrl = [
        {
          url: '../',
          name: 'List of offered courses',
        },
        {
          name: `Submissions`
        }
      ]
  return (
    <Stack>
        <BackNav>
            <BreadCrumb data={breadCrumbUrl}/>
        </BackNav>
        <Stack className="my-4">
            <Divider className="!bg-black"/>
        </Stack>
        <DashBoardHeading title={`Deliverables for ${courseName}`} />
    </Stack>
  )
}
