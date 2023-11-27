import { Stack } from "@mui/system"
import BackNav from "../../../reusable/BackNav"
import BreadCrumb from "../../../reusable/BreadCrumb"
import { Divider } from "@mui/material"
import { useParams } from "react-router"
import DashBoardHeading from "../../../reusable/DashBoardHeading"
import SpecificCourseLinks from "../SpecificCourseLinks"
import FacultyGetDeliverables from "./FacultyGetDeliverables"

export default function FacultyDeliverable() {
    let { courseName } = useParams()
    const breadCrumbUrl = [
        { url: '../', name: `${courseName}`, },
        { name: `Deliverables` }
    ]

    return (
        <Stack>
            <BackNav>
                <BreadCrumb data={breadCrumbUrl} />
            </BackNav>
            <Stack className="my-4">
                <Divider className="!bg-black" />
            </Stack>
            <Stack direction={'row'}>
                <Stack className="w-full">
                    <DashBoardHeading title={`Deliverables`} />
                    <Stack direction={'row'}>
                        <Stack className="w-full " >
                            <FacultyGetDeliverables />
                        </Stack>
                        <Stack className="border-l my-4 w-[30%]">
                            <SpecificCourseLinks />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
