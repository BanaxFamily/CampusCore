import { Divider, Stack } from "@mui/material"
import { NavLink, useParams } from "react-router-dom"
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
                    <DashBoardHeading title={`Student Groups`} />
                    <NavLink to={'add'} className="md:hidden border text-[12px] py-1 px-3 hover:bg-blue-400 my-2 tracking-wider rounded-md bg-blue-500 text-white uppercase  flex self-end !mr-4 !mt-2 " size="small">Add group</NavLink>
                    <Stack className="md:!hidden border-l mb-2">
                        <SpecificCourseLinksMobile />
                    </Stack>
                    <Stack className="!flex-row border-t-2 shadow-md rounded-md shadow-gray-500">
                        <Stack className=" w-full overflow-x-auto" >
                            <NavLink to={'add'} className="hidden lg:block border text-[12px] py-1 px-3 hover:bg-blue-400 my-2 tracking-wider rounded-md bg-blue-500 text-white uppercase  md:flex self-end !mr-4 !mt-2 " size="small">Add group</NavLink>
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
