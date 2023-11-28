import { Divider, Stack } from "@mui/material"
import { useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import BackNav from "../../../reusable/BackNav"
import BreadCrumb from "../../../reusable/BreadCrumb"
import DashBoardHeading from "../../../reusable/DashBoardHeading"
import SpecificCourseLinks from "../SpecificCourseLinks"
import FacultyAddGroupModal from "./FacultyAddGroupModal"
import FacultyGetStudentGroups from "./FacultyGetStudentGroups"

export default function FacultyStudentGroups() {
    let { courseName } = useParams()
    const [showAddGroupModal, setShowAddGroupModal] = useState(false)
    const breadCrumbUrl = [
        { url: '../../', name: `${courseName}`, },
        { url: '../', name: 'View', },
        { name: 'Student groups', }
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
                    <Stack className="my-4">
                        <Divider className="!bg-black" />
                    </Stack>
                    <Stack direction={'row'} className="border-t-2 shadow-md rounded-md shadow-gray-500">
                        <Stack className="gap-2 px-2">
                            <NavLink to={'add'} className="flex self-end !mr-4 !mt-2" size="small">Add group</NavLink>
                            <Stack className="w-full " >
                                <FacultyGetStudentGroups />
                            </Stack>
                        </Stack>
                        <Stack className="border-l my-4 w-[35%]">
                            <SpecificCourseLinks />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            {showAddGroupModal && <FacultyAddGroupModal onDismiss={() => setShowAddGroupModal(false)}/>}
        </Stack>
    )
}
