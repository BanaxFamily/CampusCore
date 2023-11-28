import { Divider, Stack } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import BackNav from "../../../reusable/BackNav"
import BreadCrumb from "../../../reusable/BreadCrumb"
import SpecificCourseLinks from "../SpecificCourseLinks"
import FacultyAddGroup from "./FacultyAddGroup"
import FacultyAddGroupModal from "./FacultyAddGroupModal"

export default function FacultyAddGroupWrapper() {
    let { courseName } = useParams()
    const [showAddGroupModal, setShowAddGroupModal] = useState(false)
    const breadCrumbUrl = [
        { url: '../../../', name: `${courseName}`, },
        { url: '../../', name: 'View', },
        { ur: '../', name: 'Student groups', },
        { name: 'Add groups', }
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
                    <Stack direction={'row'} className="border-t-2 shadow-md rounded-md shadow-gray-500">
                        <Stack className=" w-full gap-2 px-2">
                            <Stack className="w-full" >
                                <FacultyAddGroup />
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
