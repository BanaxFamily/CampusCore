import { Divider, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import BackNav from "../../../reusable/BackNav"
import BreadCrumb from "../../../reusable/BreadCrumb"
import DashBoardHeading from "../../../reusable/DashBoardHeading"
import SpecificCourseLinks from "../SpecificCourseLinks"
import FacultyGetStudentGroups from "./FacultyGetStudentGroups"
import SpecificCourseLinksMobile from "../SpecificCourseLinksMobile"

export default function FacultyStudentGroups() {
    let { courseName } = useParams()
    const breadCrumbUrl = [
        { url: '../../', name: 'Assigned Courses', },
        { url: '../', name: `${courseName}`, },
        { name: 'Student groups', }
    ]

    return (
        <Stack>
            <BackNav>
                <BreadCrumb data={breadCrumbUrl} />
            </BackNav>
            <Stack className="mt-4 mb-2">
                <Divider className="!bg-black" />
            </Stack>
            <Stack direction={'row'}>
                <Stack className="w-full">
                    <Stack className="md:!hidden border-l mb-2">
                        <SpecificCourseLinksMobile />
                    </Stack>
                    <DashBoardHeading title={`Student Groups`} />
                    <Stack direction={'row'} className="border-t-2 shadow-md rounded-md shadow-gray-500">
                        <Stack className=" w-full " >
                            <FacultyGetStudentGroups />
                        </Stack>
                        <Stack className="!hidden md:!block border-l my-4 w-[35%]">
                            <SpecificCourseLinks />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
