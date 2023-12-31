import { Stack } from "@mui/system"
import BackNav from "../../../reusable/BackNav"
import BreadCrumb from "../../../reusable/BreadCrumb"
import { Divider } from "@mui/material"
import { useParams } from "react-router"
import DashBoardHeading from "../../../reusable/DashBoardHeading"
import SpecificCourseLinks from "../SpecificCourseLinks"
import FacultyGetDeliverables from "./FacultyGetDeliverables"
import SpecificCourseLinksMobile from "../SpecificCourseLinksMobile"

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
                    <Stack className="md:!hidden border-l ">
                        <SpecificCourseLinksMobile />
                    </Stack>
                    <Stack direction={'row'}>
                        <Stack className="w-full " >
                            <FacultyGetDeliverables />
                        </Stack>
                        <Stack className="!hidden md:!block border-l my-4 md:w-[40%] lg:w-[35%]">
                            <SpecificCourseLinks />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
