import { Divider, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import BackNav from "../../../reusable/BackNav"
import BreadCrumb from "../../../reusable/BreadCrumb"
import DashBoardHeading from "../../../reusable/DashBoardHeading"
import SpecificCourseLinks from "../SpecificCourseLinks"
import FacultyAddGroup from "./FacultyAddGroup"
import FacultyUpdateMembers from "./FacultyUpdateMembers"

export default function FacultyUpdateAndAddGroupWrapper() {
    let { courseName, groupId } = useParams()
    const breadCrumbUrl = [
        { url: '../../', name: 'Assigned Courses', },
        { url: '../../', name: `${courseName}`, },
        { url: '../', name: 'Student groups', },
        { name: groupId ? 'Update group' : 'Create group' }

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
                    <DashBoardHeading title={groupId ? 'Update groups' : 'Create groups'} />
                    <Stack direction={'row'} className="border-t-2 shadow-md rounded-md shadow-gray-500">
                        <Stack className=" w-full gap-2 px-2">
                            <Stack className="w-full" >
                                {groupId ? <FacultyUpdateMembers /> : <FacultyAddGroup />}
                            </Stack>
                        </Stack>
                        <Stack className="border-l my-4 w-[35%]">
                            <SpecificCourseLinks />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
